<?php
/**
 * INSALES/Pipedrive: same-origin lead intake.
 * No API key is shipped in the theme, JavaScript or logs.
 * Define PIPEDRIVE_API_TOKEN in the web server environment or
 * INSALES_PIPEDRIVE_API_TOKEN in wp-config.php.
 */
if (!defined('ABSPATH')) { exit; }

function insales_pd_token() {
    // Accept both server-only wp-config constant names used by the developer.
    // The token must never be embedded in the theme, GitHub or frontend bundle.
    if (defined('INSALES_PIPEDRIVE_API_TOKEN') && is_string(INSALES_PIPEDRIVE_API_TOKEN)) {
        return trim(INSALES_PIPEDRIVE_API_TOKEN);
    }
    if (defined('INSALES_PIPEDRIVE_TOKEN') && is_string(INSALES_PIPEDRIVE_TOKEN)) {
        return trim(INSALES_PIPEDRIVE_TOKEN);
    }
    $token = getenv('PIPEDRIVE_API_TOKEN');
    if (!is_string($token) || trim($token) === '') $token = getenv('INSALES_PIPEDRIVE_TOKEN');
    return is_string($token) ? trim($token) : '';
}
function insales_pd_error($code, $status = 502) {
    return new WP_Error($code, 'Não foi possível concluir a solicitação. Tente novamente ou fale conosco.', array('status' => $status));
}
function insales_pd_request($method, $uri, $data = null) {
    $token = insales_pd_token();
    if ($token === '') return insales_pd_error('integration_not_configured', 503);
    if (!preg_match('~^/api/v2/[a-zA-Z0-9/_-]+(?:\\?[^#]*)?$~', $uri)) return insales_pd_error('invalid_endpoint', 500);
    $args = array(
        'method' => $method, 'timeout' => 14, 'redirection' => 0,
        'headers' => array(
            'x-api-token' => $token, 'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        )
    );
    if ($data !== null) $args['body'] = wp_json_encode($data);
    $res = wp_remote_request('https://api.pipedrive.com' . $uri, $args);
    if (is_wp_error($res)) return insales_pd_error('crm_unavailable', 503);
    $status = (int)wp_remote_retrieve_response_code($res);
    $parsed = json_decode(wp_remote_retrieve_body($res), true);
    if ($status < 200 || $status >= 300 || !is_array($parsed) || empty($parsed['success'])) {
        // Do not log authorization headers, request bodies or personal data.
        if ($status === 401 || $status === 403) return insales_pd_error('crm_authorization_failed', 503);
        if ($status === 429) return insales_pd_error('crm_rate_limit', 503);
        return insales_pd_error('crm_request_failed', 502);
    }
    return isset($parsed['data']) ? $parsed['data'] : array();
}
function insales_pd_search_id($kind, $term, $fields) {
    $allowed = array('persons' => 'persons', 'organizations' => 'organizations');
    if (!isset($allowed[$kind]) || $term === '') return 0;
    $uri = '/api/v2/' . $allowed[$kind] . '/search?' . http_build_query(array(
        'term' => $term, 'fields' => $fields, 'exact_match' => 'true', 'limit' => 10
    ), '', '&', PHP_QUERY_RFC3986);
    $res = insales_pd_request('GET', $uri);
    if (is_wp_error($res)) return $res;
    $items = isset($res['items']) && is_array($res['items']) ? $res['items'] : array();
    foreach ($items as $row) {
        $item = isset($row['item']) && is_array($row['item']) ? $row['item'] : $row;
        if (!empty($item['id'])) return (int)$item['id'];
    }
    return 0;
}
function insales_pd_normalize($value) {
    $value = remove_accents((string)$value);
    $value = function_exists('mb_strtolower') ? mb_strtolower(trim($value), 'UTF-8') : strtolower(trim($value));
    $value = preg_replace('/\\s+/u', ' ', $value);
    return $value;
}
function insales_pd_field($code) {
    $cache = 'insales_pd_field_' . substr($code, 0, 32);
    $data = get_transient($cache);
    if (is_array($data)) return $data;
    $res = insales_pd_request('GET', '/api/v2/dealFields/' . $code);
    if (is_wp_error($res)) return $res;
    if (empty($res['field_type'])) return insales_pd_error('field_metadata_missing', 502);
    set_transient($cache, $res, 12 * HOUR_IN_SECONDS);
    return $res;
}
function insales_pd_encode_field($code, $raw) {
    $field = insales_pd_field($code);
    if (is_wp_error($field)) return $field;
    $kind = (string)$field['field_type'];
    $raw = trim((string)$raw);
    if ($kind === 'enum' || $kind === 'set') {
        // Optional server-side overrides for labels that differ from Pipedrive labels.
        $mapping = defined('INSALES_PIPEDRIVE_OPTION_MAP') && is_array(INSALES_PIPEDRIVE_OPTION_MAP)
            ? INSALES_PIPEDRIVE_OPTION_MAP : array();
        $mapped = isset($mapping[$code][$raw]) ? (int)$mapping[$code][$raw] : 0;
        $options = isset($field['options']) && is_array($field['options']) ? $field['options'] : array();
        foreach ($options as $option) {
            $id = isset($option['id']) ? (int)$option['id'] : 0;
            if (!$id) continue;
            if ($mapped && $mapped === $id) return $kind === 'set' ? array($id) : $id;
            if (isset($option['label']) && insales_pd_normalize($option['label']) === insales_pd_normalize($raw)) {
                return $kind === 'set' ? array($id) : $id;
            }
        }
        return insales_pd_error('custom_field_option_not_mapped', 422);
    }
    if (in_array($kind, array('varchar', 'varchar_auto', 'phone'), true)) return function_exists('mb_substr') ? mb_substr($raw, 0, 255, 'UTF-8') : substr($raw, 0, 255);
    if ($kind === 'text') return function_exists('mb_substr') ? mb_substr($raw, 0, 4000, 'UTF-8') : substr($raw, 0, 4000);
    if ($kind === 'double') {
        if (!is_numeric($raw)) return insales_pd_error('custom_field_wrong_type', 422);
        return (float)$raw;
    }
    return insales_pd_error('unsupported_custom_field_type', 422);
}
function insales_pd_custom_fields($data) {
    $mapping = array(
        'utm_source' => '922afdd28a4dd1dd392b7124704ae06c60852c2a',
        'utm_medium' => 'e9313761b4437915eedc3dfed2f3f783ff394859',
        'utm_campaign' => 'a24c06e2e665e3377c4b26ac41bd3e6273790ba5',
        'utm_term' => 'c64e891fb7b4a1a1c06c2834c1b830fc663dbd75',
        'utm_content' => '8190f7914c853815ff97850eaf91f4329a8ed38c',
        'desafio' => '0880a965044c79a758dc2ae4ecad3642bcf7de32',
        'empresa' => '1a8d2a3510c33c9a208574a51da63ac4729d6dbe',
        'faturamento' => 'f6c067dd82e2dd2664f36b568954bb1b46b3bb51',
        'interesse' => '7cc1f7e360e46906f2b85cd698a2bd2651a4978a'
    );
    $values = array(
        'utm_source' => $data['utm']['utm_source'] ?? '',
        'utm_medium' => $data['utm']['utm_medium'] ?? '',
        'utm_campaign' => $data['utm']['utm_campaign'] ?? '',
        'utm_term' => $data['utm']['utm_term'] ?? '',
        'utm_content' => $data['utm']['utm_content'] ?? '',
        'desafio' => $data['message'] ?? '',
        'empresa' => $data['company'] ?? '',
        'faturamento' => $data['revenue'] ?? '',
        'interesse' => $data['service'] ?? ''
    );
    $result = array();
    foreach ($mapping as $name => $code) {
        $value = trim((string)$values[$name]);
        if ($value === '') continue;
        $converted = insales_pd_encode_field($code, $value);
        if (is_wp_error($converted)) return $converted;
        $result[$code] = $converted;
    }
    return $result;
}
function insales_pd_validate_stage() {
    $cached = get_transient('insales_pd_stage_44_pipeline_8');
    if ($cached === 'yes') return true;
    $stage = insales_pd_request('GET', '/api/v2/stages/44');
    if (is_wp_error($stage)) return $stage;
    if ((int)($stage['pipeline_id'] ?? 0) !== 8) return insales_pd_error('wrong_pipeline_stage', 422);
    set_transient('insales_pd_stage_44_pipeline_8', 'yes', DAY_IN_SECONDS);
    return true;
}
function insales_pd_request_ip() {
    return isset($_SERVER['REMOTE_ADDR']) ? (string)$_SERVER['REMOTE_ADDR'] : 'unknown';
}
function insales_pd_validate_origin() {
    if (empty($_SERVER['HTTP_ORIGIN'])) return true;
    $origin = wp_parse_url((string)$_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $host = wp_parse_url(home_url('/'), PHP_URL_HOST);
    return is_string($origin) && is_string($host) && strtolower($origin) === strtolower($host);
}
function insales_pd_rest(WP_REST_Request $request) {
    if (!insales_pd_validate_origin()) return insales_pd_error('invalid_origin', 403);
    $iphash = hash_hmac('sha256', insales_pd_request_ip(), wp_salt('auth'));
    $limit_key = 'insales_pd_rl_' . substr($iphash, 0, 32);
    $hits = (int)get_transient($limit_key);
    if ($hits >= 12) return insales_pd_error('too_many_requests', 429);
    set_transient($limit_key, $hits + 1, 10 * MINUTE_IN_SECONDS);
    $data = $request->get_json_params();
    if (!is_array($data)) return insales_pd_error('invalid_json', 400);
    if (!empty($data['website'])) return insales_pd_error('bot_detected', 400);
    $name = isset($data['name']) ? sanitize_text_field($data['name']) : '';
    $email = isset($data['email']) ? sanitize_email($data['email']) : '';
    $phone = isset($data['phone']) ? preg_replace('/[^+0-9() .-]/', '', (string)$data['phone']) : '';
    $company = isset($data['company']) ? sanitize_text_field($data['company']) : '';
    $revenue = isset($data['revenue']) ? sanitize_text_field($data['revenue']) : '';
    $service = isset($data['service']) ? sanitize_text_field($data['service']) : '';
    $message = isset($data['message']) ? sanitize_textarea_field($data['message']) : '';
    $submission = isset($data['submission_id']) ? (string)$data['submission_id'] : '';
    $consent = !empty($data['privacy_consent']) && $data['privacy_consent'] === true;
    if (!$consent || strlen($name) < 2 || strlen($name) > 120 || !is_email($email)
        || strlen($phone) < 8 || strlen($phone) > 30 || $revenue === '' || $service === ''
        || strlen($company) > 150 || strlen($message) > 2000
        || !preg_match('/^[a-f0-9-]{32,36}$/i', $submission)) {
        return insales_pd_error('validation_failed', 422);
    }
    if (insales_pd_token() === '') return insales_pd_error('integration_not_configured', 503);
    $utm = isset($data['utm']) && is_array($data['utm']) ? $data['utm'] : array();
    $clean_utm = array();
    foreach (array('utm_source','utm_medium','utm_campaign','utm_term','utm_content') as $param) {
        $clean_utm[$param] = isset($utm[$param]) ? substr(sanitize_text_field($utm[$param]), 0, 255) : '';
    }
    $entry = array('company'=>$company, 'revenue'=>$revenue, 'service'=>$service,
                   'message'=>$message, 'utm'=>$clean_utm);
    // Validate field types and select options before creating any remote entities.
    $fields = insales_pd_custom_fields($entry);
    if (is_wp_error($fields)) return $fields;
    $stage_ok = insales_pd_validate_stage();
    if (is_wp_error($stage_ok)) return $stage_ok;
    $idempotency = 'insales_pd_sub_' . substr(hash('sha256',$submission), 0, 40);
    $previous = get_option($idempotency, false);
    if (is_array($previous)) {
        if (($previous['state'] ?? '') === 'done' && !empty($previous['deal_id'])) {
            return rest_ensure_response(array('success'=>true,'deal_id'=>(int)$previous['deal_id'],
                                            'person_id'=>(int)$previous['person_id'],'duplicate'=>true));
        }
        return insales_pd_error('submission_in_progress_or_review', 409);
    }
    if (!add_option($idempotency, array('state'=>'processing','at'=>time()), '', 'no')) {
        return insales_pd_error('submission_in_progress_or_review', 409);
    }
    // Organization deduplication is an exact-name lookup. Never infer business identity.
    $org_id = 0;
    if ($company !== '') {
        $org_id = insales_pd_search_id('organizations', $company, 'name');
        if (is_wp_error($org_id)) {delete_option($idempotency);return $org_id;}
        if (!$org_id) {
            $org = insales_pd_request('POST','/api/v2/organizations',array('name'=>$company,'owner_id'=>15076190));
            if (is_wp_error($org)) {delete_option($idempotency);return $org;}
            $org_id = (int)($org['id'] ?? 0);
            if (!$org_id) {delete_option($idempotency);return insales_pd_error('organization_not_confirmed');}
        }
    }
    $person_id = insales_pd_search_id('persons', $email, 'email');
    if (is_wp_error($person_id)) {delete_option($idempotency);return $person_id;}
    if (!$person_id) {
        $person_id = insales_pd_search_id('persons', $phone, 'phone');
        if (is_wp_error($person_id)) {delete_option($idempotency);return $person_id;}
    }
    if (!$person_id) {
        $payload = array('name'=>$name,'owner_id'=>15076190,
            'emails'=>array(array('value'=>$email,'primary'=>true)),
            'phones'=>array(array('value'=>$phone,'primary'=>true)));
        if ($org_id) $payload['org_id'] = $org_id;
        $person = insales_pd_request('POST','/api/v2/persons',$payload);
        if (is_wp_error($person)) {delete_option($idempotency);return $person;}
        $person_id = (int)($person['id'] ?? 0);
        if (!$person_id) {delete_option($idempotency);return insales_pd_error('person_not_confirmed');}
    }
    $payload = array(
        'title' => 'Consultoria Estratégica - ' . ($company ?: $name),
        'owner_id' => 15076190, 'pipeline_id' => 8, 'stage_id' => 44,
        'status' => 'open', 'person_id' => $person_id,
        'custom_fields' => $fields
    );
    if ($org_id) $payload['org_id'] = $org_id;
    // Keep the lock if the remote request fails ambiguously. A human must
    // review the CRM before clearing it, to avoid duplicate opportunities.
    update_option($idempotency,array('state'=>'creating_deal','at'=>time(),'person_id'=>$person_id),'no');
    $deal = insales_pd_request('POST', '/api/v2/deals', $payload);
    if (is_wp_error($deal)) return $deal;
    $deal_id = (int)($deal['id'] ?? 0);
    if (!$deal_id) return insales_pd_error('deal_not_confirmed');
    update_option($idempotency,array('state'=>'done','at'=>time(),'deal_id'=>$deal_id,'person_id'=>$person_id),'no');
    return rest_ensure_response(array('success'=>true,'person_id'=>$person_id,'deal_id'=>$deal_id));
}
add_action('rest_api_init', function() {
    register_rest_route('insales/v1','/lead',array(
        'methods'=>'POST', 'callback'=>'insales_pd_rest',
        'permission_callback'=>'__return_true'
    ));
});
