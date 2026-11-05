/** Format a Brazilian telephone number as (DD) XXXX-XXXX or (DD) 9 XXXX-XXXX.
 * The output is presentation-only; API validation still checks 10/11 digits.
 */
export function phoneDigits(raw) {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length > 11) digits = digits.slice(2);
  return digits.slice(0, 11);
}

export function formatBrazilPhone(raw) {
  const digits = phoneDigits(raw);
  if (!digits) return "";
  if (digits.length <= 2) return "(" + digits;
  const ddd = digits.slice(0, 2);
  const local = digits.slice(2);
  if (!local) return "(" + ddd + ")";
  if (local.startsWith("9")) {
    const rest = local.slice(1);
    return "(" + ddd + ") 9" +
      (rest.length ? " " + rest.slice(0, 4) : "") +
      (rest.length > 4 ? "-" + rest.slice(4, 8) : "");
  }
  return "(" + ddd + ") " + local.slice(0, 4) +
    (local.length > 4 ? "-" + local.slice(4, 8) : "");
}

export function isValidBrazilPhone(raw) {
  const digits = phoneDigits(raw);
  // Requires a two-digit area code and eight (landline) or nine (mobile) local digits.
  if (!(digits.length === 10 || digits.length === 11)) return false;
  const area = Number(digits.slice(0, 2));
  if (area < 11 || area > 99) return false;
  const local = digits.slice(2);
  return digits.length === 10
    ? /^[2-5]\d{7}$/.test(local)
    : /^9\d{8}$/.test(local);
}
