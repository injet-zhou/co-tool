import { describe, expect, it } from "vitest";
import { en2zh, zh2en } from "../src/utils/translate";

describe("translate", async () => {
  it("zh2en", async () => {
    let res = await zh2en("你好");
    expect(res.join("")).toBe("Hello");
  });
});
