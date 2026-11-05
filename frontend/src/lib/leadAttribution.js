// Marketing attribution for the first landing page. Stored per tab/session, not as a cookie.
const KEY="insales-first-touch";
const PARAMS=["utm_source","utm_medium","utm_campaign","utm_term","utm_content"];

export function captureLeadAttribution() {
  if (typeof window === "undefined") return {};
  try {
    const url=new URL(window.location.href);
    const previous=JSON.parse(sessionStorage.getItem(KEY)||"{}");
    const next={...previous};
    let updated=false;
    for(const key of PARAMS){
      const value=url.searchParams.get(key);
      if(value && !next[key]){
        next[key]=value.slice(0,255);
        updated=true;
      }
    }
    if(!next.landing_page){
      next.landing_page=url.pathname;
      updated=true;
    }
    if(updated)sessionStorage.setItem(KEY,JSON.stringify(next));
    return next;
  } catch {
    return {};
  }
}
export function getLeadAttribution() {
  return captureLeadAttribution();
}
export function newSubmissionId() {
  if(typeof crypto!=="undefined" && crypto.randomUUID)return crypto.randomUUID();
  // Older browsers: random bytes remain cryptographically generated.
  if(typeof crypto!=="undefined" && crypto.getRandomValues){
    const bytes=new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("");
  }
  return null;
}
