import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../../lib/site", () => ({
  eventConfig: {
    name: "Ruang Tumbuh 2026",
    startISO: "2020-01-01T09:00:00+07:00",
    endISO: "2020-01-01T16:00:00+07:00",
    socials: [
      {
        label: "Instagram",
        url: "https://www.instagram.com/ruangtumbuh",
        icon: "instagram",
      },
    ],
  },
}));

import { Countdown } from "./Countdown";

describe("Countdown (ended)", () => {
  it("shows an ended status that links back to the organizer", () => {
    render(<Countdown />);
    expect(screen.getByText(/acara telah selesai/i)).toBeTruthy();
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(
      "https://www.instagram.com/ruangtumbuh",
    );
  });
});
