import { useState } from "react";
import type { FormEvent } from "react";
import { tickets } from "../../lib/data";
import { eventConfig } from "../../lib/site";
import {
  buildWhatsAppLink,
  isWhatsAppConfigured,
  registrationFormMessage,
} from "../../lib/whatsapp";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Input, Select, Textarea } from "../ui/Input";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface FormState {
  name: string;
  whatsapp: string;
  email: string;
  ticketId: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: "",
  whatsapp: "",
  email: "",
  ticketId: "",
  message: "",
};

export function RegistrationForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmation, setConfirmation] = useState<{ ticketName: string } | null>(
    null,
  );
  const whatsappReady = isWhatsAppConfigured();

  const update = (key: keyof FormState) => (value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmation(null);

    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "Mohon isi nama Anda.";
    }
    if (!form.whatsapp.trim()) {
      nextErrors.whatsapp = "Mohon isi nomor WhatsApp Anda.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const ticket = tickets.find((item) => item.id === form.ticketId);
    const ticketName = ticket?.name;

    const message = registrationFormMessage({
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      ticketName,
      message: form.message,
    });

    setConfirmation({ ticketName: ticketName ?? "belum menentukan" });

    if (whatsappReady) {
      window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${eventConfig.email}?subject=${encodeURIComponent(
        `Pendaftaran ${eventConfig.name}`,
      )}&body=${encodeURIComponent(message)}`;
    }
  };

  const ticketOptions = [
    { value: "", label: "Belum menentukan / ingin bertanya" },
    ...tickets.map((ticket) => ({ value: ticket.id, label: ticket.name })),
  ];

  return (
    <section
      id="daftar"
      aria-labelledby="daftar-heading"
      className="scroll-mt-24 border-t border-line"
    >
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="daftar-heading"
              eyebrow="Pendaftaran"
              title="Daftar atau tanyakan dulu"
              description="Isi data singkat berikut. Kami akan menghubungi Anda lewat WhatsApp untuk melengkapi pendaftaran dan pembayaran."
            />
            <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-ink-500">
              <li className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                Pilih kategori tiket, atau biarkan kosong bila masih ingin bertanya.
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                Pesan otomatis akan menyebutkan nama acara dan kategori tiket Anda.
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                Data hanya dipakai untuk keperluan pendaftaran acara ini.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-panel border border-line bg-white p-6 shadow-card sm:p-10"
            >
              <div className="grid gap-5">
                <Input
                  label="Nama lengkap"
                  name="name"
                  value={form.name}
                  onChange={update("name")}
                  required
                  error={errors.name}
                  placeholder="Contoh: Ayu Lestari"
                />
                <Input
                  label="Nomor WhatsApp"
                  name="whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={update("whatsapp")}
                  required
                  error={errors.whatsapp}
                  placeholder="Contoh: 081234567890"
                />
                <Input
                  label="Email (opsional)"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="nama@email.com"
                />
                <Select
                  label="Kategori tiket"
                  name="ticket"
                  value={form.ticketId}
                  onChange={update("ticketId")}
                  options={ticketOptions}
                />
                <Textarea
                  label="Pesan (opsional)"
                  name="message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Ceritakan pertanyaan atau kebutuhan Anda."
                />
              </div>

              <Button type="submit" size="lg" className="mt-6 w-full">
                {whatsappReady ? "Kirim lewat WhatsApp" : "Kirim lewat Email"}
              </Button>

              {confirmation ? (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-3 rounded-panel border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800"
                >
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Terima kasih, data Anda sudah disiapkan untuk{" "}
                    <strong>{eventConfig.name}</strong> dengan kategori tiket{" "}
                    <strong>{confirmation.ticketName}</strong>.{" "}
                    {whatsappReady
                      ? "Jendela WhatsApp akan terbuka — tekan kirim di sana untuk melanjutkan pendaftaran."
                      : `Nomor WhatsApp belum diatur, jadi pendaftaran dialihkan ke email ${eventConfig.email}.`}
                  </span>
                </div>
              ) : null}

              <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-ink-500">
                Dengan mengirim formulir ini, Anda setuju dihubungi kembali untuk
                keperluan pendaftaran.
              </p>
            </form>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
