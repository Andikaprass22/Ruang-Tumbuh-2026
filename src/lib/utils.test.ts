import { describe, it, expect } from "vitest";
import { formatRupiah } from "./utils";

describe("formatRupiah", () => {
  it("formats an integer as IDR with dot separators", () => {
    expect(formatRupiah(150000)).toBe("Rp150.000");
  });
  it("formats zero", () => {
    expect(formatRupiah(0)).toBe("Rp0");
  });
});
