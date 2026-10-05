import { useEffect, useState } from "react";
import { eventConfig } from "../../lib/site";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At the top the bar melts into the hero; once the page moves it earns a
  // surface so links stay legible over any section behind it.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "safe-top safe-x sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300",
        solid
          ? "border-b border-line bg-paper/85 shadow-[0_1px_2px_rgba(26,26,23,0.05)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#beranda"
          className="-my-2 flex min-w-0 items-center gap-2.5 py-2"
          onClick={() => setOpen(false)}
        >
          <img src="/img/logo.svg" alt="" className="h-8 w-8 shrink-0" />
          <span className="truncate font-display text-lg font-semibold tracking-[-0.01em] text-ink-900">
            <span className="hidden sm:inline">{eventConfig.name}</span>
            <span className="sm:hidden">{eventConfig.shortName}</span>
          </span>
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 lg:flex"
        >
          {eventConfig.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="-my-3 rounded-full px-3 py-3 text-sm font-medium text-ink-700 transition-colors hover:text-brand-800"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#daftar">Daftar Sekarang</Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-800 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </Container>

      {/* Always in the DOM so aria-controls always resolves; the CSS collapses
          it by grid row and keeps the links out of the tab order when closed. */}
      <div className="lg:hidden">
        <div id="mobile-nav" data-drawer data-open={open} className="bg-paper">
          <Container>
            <div className="flex flex-col border-t border-line py-2">
              {eventConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="border-b border-line py-3 text-sm font-medium text-ink-700 transition-colors hover:text-brand-800"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                href="#daftar"
                className="mt-4 mb-2 w-full"
                onClick={() => setOpen(false)}
              >
                Daftar Sekarang
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
