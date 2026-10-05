import { describe, it, expect } from "vitest";
import {
  speakers,
  agenda,
  tickets,
  faqs,
  getTicketById,
  getAgendaSpeaker,
} from "./data";

describe("content integrity", () => {
  it("has unique ticket and faq ids", () => {
    expect(new Set(tickets.map((t) => t.id)).size).toBe(tickets.length);
    expect(new Set(faqs.map((f) => f.id)).size).toBe(faqs.length);
  });

  it("finds a ticket by id", () => {
    expect(getTicketById(tickets[0].id)?.name).toBe(tickets[0].name);
  });

  it("returns undefined for an unknown ticket id", () => {
    expect(getTicketById("tidak-ada")).toBeUndefined();
  });

  it("every agenda speakerId points at a real speaker", () => {
    const ids = new Set(speakers.map((s) => s.id));
    for (const item of agenda) {
      if (item.speakerId) {
        expect(ids.has(item.speakerId)).toBe(true);
      }
    }
  });
});

describe("agenda speaker relations", () => {
  it("resolves an existing speaker id", () => {
    const item = agenda.find((a) => a.speakerId);
    expect(item).toBeDefined();
    expect(getAgendaSpeaker(item!)?.id).toBe(item!.speakerId);
  });

  it("returns undefined instead of throwing for a missing speaker id (Review Focus #4)", () => {
    const orphan = { ...agenda[0], speakerId: "missing" };
    expect(() => getAgendaSpeaker(orphan)).not.toThrow();
    expect(getAgendaSpeaker(orphan)).toBeUndefined();
  });
});
