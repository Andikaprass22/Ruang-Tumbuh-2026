import { describe, it, expect, vi } from "vitest";
import {
  buildWhatsAppLink,
  registrationFormMessage,
  registrationMessage,
  ticketMessage,
} from "./whatsapp";

describe("registrationMessage", () => {
  it("names the event and the ticket category", () => {
    const message = registrationMessage("Seminar + Workshop");
    expect(message).toContain("Ruang Tumbuh 2026");
    expect(message).toContain("Seminar + Workshop");
  });

  it("still names the event when no ticket is chosen (Review Focus #5)", () => {
    const message = registrationMessage();
    expect(message).toContain("Ruang Tumbuh 2026");
    expect(message).toMatch(/belum menentukan|ingin mendaftar/i);
  });
});

describe("ticketMessage", () => {
  it("names the event and the exact ticket", () => {
    expect(ticketMessage("Tiket Pelajar")).toContain("Tiket Pelajar");
    expect(ticketMessage("Tiket Pelajar")).toContain("Ruang Tumbuh 2026");
  });
});

describe("registrationFormMessage", () => {
  it("names the event and lists the ticket category exactly once", () => {
    const message = registrationFormMessage({
      name: "Ayu",
      whatsapp: "081234567890",
      ticketName: "Tiket Pelajar",
    });
    expect(message).toContain("Ruang Tumbuh 2026");
    expect(message).toContain("Tiket Pelajar");
    expect(message.match(/Kategori tiket/g)?.length).toBe(1);
  });

  it("uses a generic category line when no ticket is chosen", () => {
    const message = registrationFormMessage({ name: "Ayu", whatsapp: "0812" });
    expect(message).toContain("Ruang Tumbuh 2026");
    expect(message).toContain("belum menentukan");
  });
});

describe("buildWhatsAppLink", () => {
  it("encodes the message into a wa.me url", () => {
    const url = buildWhatsAppLink("Halo Ruang Tumbuh");
    expect(url.startsWith("https://wa.me/")).toBe(true);
    expect(url).toContain(encodeURIComponent("Halo Ruang Tumbuh"));
  });
});

describe("isWhatsAppConfigured", () => {
  it("reports unconfigured when the number is blank (Review Focus #1)", async () => {
    vi.resetModules();
    vi.doMock("./site", () => ({ eventConfig: { whatsapp: "" } }));
    const { isWhatsAppConfigured } = await import("./whatsapp");
    expect(isWhatsAppConfigured()).toBe(false);
    vi.doUnmock("./site");
  });

  it("treats a number with too few digits as unconfigured (Review Focus #1)", async () => {
    vi.resetModules();
    vi.doMock("./site", () => ({ eventConfig: { whatsapp: "12345" } }));
    const { isWhatsAppConfigured } = await import("./whatsapp");
    expect(isWhatsAppConfigured()).toBe(false);
    vi.doUnmock("./site");
  });

  it("sanitizes a formatted number into a digits-only link (Review Focus #1)", async () => {
    vi.resetModules();
    vi.doMock("./site", () => ({
      eventConfig: { whatsapp: "+62 812-3456-7890" },
    }));
    const { buildWhatsAppLink, isWhatsAppConfigured } = await import(
      "./whatsapp"
    );
    expect(isWhatsAppConfigured()).toBe(true);
    expect(buildWhatsAppLink("Halo").startsWith("https://wa.me/6281234567890?")).toBe(
      true,
    );
    vi.doUnmock("./site");
  });
});
