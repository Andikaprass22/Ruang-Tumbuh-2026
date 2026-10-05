import { eventConfig } from "./site";

export interface RegistrationFormInput {
  name: string;
  whatsapp: string;
  email?: string;
  ticketName?: string;
  message?: string;
}

/** Digits only — strips the `+`, spaces, and dashes a human might type. */
export function whatsappDigits(): string {
  return eventConfig.whatsapp.replace(/\D/g, "");
}

/**
 * A number is usable only when its digits form a plausible international
 * number. This is what stops a formatted value like "+62 812-3456-7890" from
 * producing a broken `wa.me` link.
 */
export function isWhatsAppConfigured(): boolean {
  const digits = whatsappDigits();
  return digits.length >= 8 && digits.length <= 15;
}

/**
 * Registration message. Always names the event; names the ticket category when
 * one is chosen, otherwise a generic "belum menentukan" line.
 */
export function registrationMessage(ticketName?: string): string {
  const ticket = ticketName?.trim() ? ticketName.trim() : "belum menentukan";
  return `Halo ${eventConfig.name}, saya ingin mendaftar. Kategori tiket: ${ticket}. Mohon informasi selengkapnya.`;
}

/** Ticket booking message used by the "Pesan Tiket" buttons. */
export function ticketMessage(ticketName: string): string {
  return `Halo ${eventConfig.name}, saya ingin memesan tiket ${ticketName}. Mohon informasi ketersediaan dan cara pembayarannya.`;
}

/**
 * Full registration message from the form. The ticket category is carried by
 * `registrationMessage`, so it is listed exactly once.
 */
export function registrationFormMessage(input: RegistrationFormInput): string {
  return [
    registrationMessage(input.ticketName),
    `Nama: ${input.name.trim()}`,
    `WhatsApp: ${input.whatsapp.trim()}`,
    input.email?.trim() ? `Email: ${input.email.trim()}` : null,
    input.message?.trim() ? `Pesan: ${input.message.trim()}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${whatsappDigits()}?text=${encodeURIComponent(message)}`;
}
