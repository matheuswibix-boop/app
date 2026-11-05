// Brazilian landline: (DD) NNNN-NNNN. Mobile: (DD) 9 NNNN-NNNN.
// Accept pasted +55 / 55, keep a clean canonical national 10/11-digit number.
export function phoneDigitsBR(value) {
  let digits = String(value ?? "").replace(/\D/g, "");
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    digits = digits.slice(2);
  }
  return digits.slice(0, 11);
}
export function formatPhoneBR(value) {
  const digits = phoneDigitsBR(value);
  if (!digits) return "";
  if (digits.length < 3) return "(" + digits + (digits.length === 2 ? ")" : "");
  const ddd = digits.slice(0, 2);
  const number = digits.slice(2);
  const prefix = "(" + ddd + ") ";
  if (digits.length === 11) {
    return prefix + number.slice(0, 1) + " " + number.slice(1, 5) + "-" + number.slice(5);
  }
  if (number.length <= 4) return prefix + number;
  return prefix + number.slice(0, 4) + "-" + number.slice(4);
}
export function isValidPhoneBR(value) {
  const d = phoneDigitsBR(value);
  if (d.length !== 10 && d.length !== 11) return false;
  if (d[0] === "0" || d[0] === "1" && d[1] === "0" || d[1] === "0") return false;
  // Nine digits after area code = Brazilian mobile, beginning with 9.
  if (d.length === 11 && d[2] !== "9") return false;
  // Eight digits after area code = landline, not a mobile beginning with 9.
  if (d.length === 10 && d[2] === "9") return false;
  return true;
}
