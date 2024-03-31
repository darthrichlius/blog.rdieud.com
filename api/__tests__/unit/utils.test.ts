import { describe, expect, it } from "@jest/globals";
import { safeRegExpToString } from "../../src/utils/string";

describe("UTILS", () => {
  it("should safely transform a regex expression to string", () => {
    const rgx1: RegExp =
      /^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[A-Z])(?=.*\d).{8,20}$/;
    const rgx2: RegExp = /^(?=.*[\d])[\w\d]{3,20}$/;
    let safeRegexString: string = safeRegExpToString(rgx1);

    expect(safeRegexString).toBe(
      "^(?=.*[!@#$%^&*()-_=+{};:,<.>])(?=.*[A-Z])(?=.*\\d).{8,20}$"
    );

    safeRegexString = safeRegExpToString(rgx2);

    expect(safeRegexString).toBe("^(?=.*[\\d])[\\w\\d]{3,20}$");
  });
});
