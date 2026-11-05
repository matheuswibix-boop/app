import {formatBrazilPhone, isValidBrazilPhone, phoneDigits} from "./phoneFormat";

describe("INSALES Brazil phone mask", () => {
  test("formats an 11-digit mobile with separated ninth digit", () => {
    expect(formatBrazilPhone("41999232132")).toBe("(41) 9 9923-2132");
    expect(isValidBrazilPhone("(41) 9 9923-2132")).toBe(true);
  });
  test("formats 10-digit landlines", () => {
    expect(formatBrazilPhone("4133334444")).toBe("(41) 3333-4444");
    expect(isValidBrazilPhone("(41) 3333-4444")).toBe(true);
  });
  test("accepts country prefix and removes non-digits", () => {
    expect(phoneDigits("+55 (41) 9 9923-2132")).toBe("41999232132");
    expect(formatBrazilPhone("+55 (41) 9 9923-2132")).toBe("(41) 9 9923-2132");
  });
  test("rejects incomplete or invalid phone numbers", () => {
    expect(isValidBrazilPhone("41999")).toBe(false);
    expect(isValidBrazilPhone("(41) 1234-5678")).toBe(false);
    expect(isValidBrazilPhone("(00) 99999-9999")).toBe(false);
  });
});
