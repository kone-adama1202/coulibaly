import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Logo Nieta Digital
import logo from "../assets/logo1.png";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[#0B3D91] dark:focus-visible:outline-[#5B9BFF]";

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 " +
  "bg-white/70 text-neutral-700 hover:border-[#0B3D91] hover:text-[#0B3D91] " +
  "dark:border-neutral-700 dark:bg-white/5 dark:text-neutral-200 " +
  "dark:hover:border-[#5B9BFF] dark:hover:text-[#5B9BFF] " +
  focusRing;

const ctaBtn =
  "inline-flex items-center justify-center gap-2 rounded-md border border-[#0B3D91] " +
  "bg-[#0B3D91] px-6 py-2.5 text-sm font-semibold text-white hover:border-[#082d6e] hover:bg-[#082d6e] " +
  "dark:border-[#5B9BFF] dark:bg-[#5B9BFF] dark:text-[#001a4d] " +
  "dark:hover:border-[#7DB1FF] dark:hover:bg-[#7DB1FF] " +
  focusRing;

const WHATSAPP_URL = "https://wa.me/22392397518";
const EMAIL = "contact@nietadigital.com";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function LangSwitch({ lang, setLang, label, full = false }) {
  const options = full
    ? [
        { code: "fr", text: "Français" },
        { code: "en", text: "English" },
      ]
    : [
        { code: "fr", text: "FR" },
        { code: "en", text: "EN" },
      ];

  return (
    <div
      role="group"
      aria-label={label}
      className="flex overflow-hidden rounded-md border border-neutral-300 text-xs font-semibold dark:border-neutral-700"
    >
      {options.map((o) => {
        const on = lang === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLang(o.code)}
            aria-pressed={on}
            className={`px-3 py-2.5 ${full ? "flex-1 text-sm" : ""} ${focusRing} ${
              on
                ? "bg-[#0B3D91] text-white dark:bg-[#5B9BFF] dark:text-[#001a4d]"
                : "bg-white/70 text-neutral-600 hover:text-neutral-900 dark:bg-transparent dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            {o.text}
          </button>
        );
      })}
    </div>
  );
}

export default function Nav({ darkMode, setDarkMode }) {
  const { lang, setLang, t } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const wasOpen = useRef(false);

  // Scroll : la barre prend un fond et un trait en dessous
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le défilement du fond quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Accessibilité : le focus entre dans le menu à l'ouverture, revient au bouton à la fermeture
  useEffect(() => {
    if (open) {
      menuRef.current?.focus();
    } else if (wasOpen.current) {
      burgerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  // Échap ferme le menu ; passer en grand écran aussi
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Section visible (surlignage du lien actif)
  useEffect(() => {
    const sections = t.nav.links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [t.nav.links]);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b ${
          solid
            ? "border-neutral-300 bg-[#f5f2eb] dark:border-neutral-800 dark:bg-[#0c0d12]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo */}
          <a href="#hero" onClick={() => setOpen(false)} className={`flex shrink-0 items-center ${focusRing}`}>
            <img
              src={logo}
              alt="Nieta Digital"
              className="h-10 w-auto rounded-md object-contain sm:h-11"
            />
          </a>

          {/* Liens (ordinateur) */}
          <nav aria-label="Navigation principale" className="hidden h-full lg:block">
            <ul className="m-0 flex h-full list-none items-stretch gap-8 p-0">
              {t.nav.links.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href} className="flex">
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center border-b-[3px] pt-[3px] text-sm font-medium ${focusRing} ${
                        isActive
                          ? "border-[#0B3D91] font-semibold text-neutral-950 dark:border-[#5B9BFF] dark:text-white"
                          : "border-transparent text-neutral-600 hover:border-neutral-400 hover:text-neutral-950 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <LangSwitch lang={lang} setLang={setLang} label={t.nav.switchLang} />
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={darkMode ? t.nav.themeToLight : t.nav.themeToDark}
              className={iconBtn}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <a href="#contact" className={`hidden lg:inline-flex ${ctaBtn}`}>
              {t.nav.cta}
              <span aria-hidden="true">→</span>
            </a>

            {/* Burger (mobile) */}
            <button
              ref={burgerRef}
              type="button"
              className={`${iconBtn} lg:hidden`}
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile : écran simple, liens en haut, actions toujours visibles en bas */}
      {open && (
        <div
          id="menu-mobile"
          ref={menuRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuOpen}
          className="fixed inset-x-0 top-0 z-40 flex h-[100dvh] flex-col bg-[#f5f2eb] pt-[68px] outline-none dark:bg-[#0c0d12] lg:hidden"
        >
          {/* Liens : zone qui défile si l'écran est petit */}
          <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-4 sm:px-6">
            <ul className="m-0 list-none border-t border-neutral-300 p-0 dark:border-neutral-800">
              {t.nav.links.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href} className="border-b border-neutral-300 dark:border-neutral-800">
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-[60px] items-center gap-4 border-l-4 pl-4 pr-3 ${focusRing} ${
                        isActive
                          ? "border-[#0B3D91] bg-[#0B3D91]/5 dark:border-[#5B9BFF] dark:bg-[#5B9BFF]/10"
                          : "border-transparent hover:bg-black/[0.03] dark:hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`flex-1 text-lg ${
                          isActive
                            ? "font-semibold text-[#0B3D91] dark:text-[#5B9BFF]"
                            : "font-medium text-neutral-900 dark:text-white"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span aria-hidden="true" className="text-neutral-400">
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Zone d'actions fixe en bas : toujours à portée du pouce */}
          <div className="border-t border-neutral-300 bg-[#f5f2eb] px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] dark:border-neutral-800 dark:bg-[#0c0d12] sm:px-6">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={`${ctaBtn} w-full py-3.5 text-base`}
            >
              {t.nav.cta}
              <span aria-hidden="true">→</span>
            </a>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center rounded-md border border-neutral-300 py-3 text-sm font-medium text-neutral-800 hover:border-[#0B3D91] hover:text-[#0B3D91] dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-[#5B9BFF] dark:hover:text-[#5B9BFF] ${focusRing}`}
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className={`flex items-center justify-center rounded-md border border-neutral-300 py-3 text-sm font-medium text-neutral-800 hover:border-[#0B3D91] hover:text-[#0B3D91] dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-[#5B9BFF] dark:hover:text-[#5B9BFF] ${focusRing}`}
              >
                {lang === "fr" ? "E-mail" : "Email"}
              </a>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {lang === "fr" ? "Langue" : "Language"}
              </span>
              <div className="w-48">
                <LangSwitch lang={lang} setLang={setLang} label={t.nav.switchLang} full />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}