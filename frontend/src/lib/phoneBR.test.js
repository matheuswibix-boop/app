import {formatPhoneBR, isValidPhoneBR, phoneDigitsBR} from "./phoneBR";

describe("Brazilian phone mask", () => {
  test.each([
    ["4133334444", "(41) 3333-4444"],
    ["(41) 3333-4444", "(41) 3333-4444"],
    ["41999998888", "(41) 9 9999-8888"],
    ["+55 41 99999-8888", "(41) 9 9999-8888"],
    ["554133334444", "(41) 3333-4444"],
    ["4", "(4"],
    ["41", "(41)"]
  ])("formats %s", (raw, expected) => {
    expect(formatPhoneBR(raw)).toBe(expected);
  });
  test.each(["4133334444", "41999998888", "+55 (41) 9 9999-8888"])("validates %s", value => {
    expect(isValidPhoneBR(value)).toBe(true);
  });
  test.each(["", "419999888", "4199999888", "001133334444", "41133334444", "1199999888"])("rejects invalid %s", value => {
    expect(isValidPhoneBR(value)).toBe(false);
  });
  test("accepts pasted Brazilian international numbers", () => {
    expect(phoneDigitsBR("+55 (41) 9 9999-8888")).toBe("41999998888");
  });
});
