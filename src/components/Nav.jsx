import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

// Import de votre logo Nieta Digital
import logo from "../assets/logo.png";

export default function Nav({ darkMode, setDarkMode }) {
  const { lang, setLang, t } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const menuRef = useRef(null);

  // Détection du scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquer le scroll d'arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fermeture Escape et resize
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = t.nav.links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [t.nav.links]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <>
      <style>{`
        :root {
          --wd-amber: #c68a3e;
          --wd-teal: #6fb7a8;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        .animate-status {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* NAVBAR PRINCIPALE */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          flex justify-center
          px-4 sm:px-6
          ${scrolled ? "py-4" : "py-6 sm:py-8"}
        `}
      >
        <div
          className={`
            w-full max-w-7xl
            flex items-center justify-between
            transition-all duration-500
            ${
              scrolled
                ? `
                  bg-white/90 dark:bg-[#121316]/90
                  backdrop-blur-xl
                  border border-black/[0.06] dark:border-white/[0.08]
                  shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.35)]
                  rounded-full
                  px-6 py-3
                `
                : "bg-transparent px-2 py-2"
            }
          `}
        >
          {/* LOGO NIETA DIGITAL */}
          <a href="#hero" className="flex items-center gap-2.5 no-underline group">
            <img
              src={logo}
              alt="Nieta Digital Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-md"
            />
          </a>

          {/* LIENS DESKTOP */}
          <nav className="hidden lg:flex items-center p-1.5 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.05] rounded-full">
            <ul className="flex items-center gap-1.5 list-none m-0 p-0">
              {t.nav.links.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`
                        relative block px-5 py-2.5 text-sm font-medium rounded-full
                        transition-all duration-300
                        ${
                          isActive
                            ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm font-semibold"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                        }
                      `}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ACTIONS À DROITE */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* BOUTONS LANGUE (DESKTOP) */}
            <div
              className="flex items-center p-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800/80 border border-neutral-300/60 dark:border-neutral-700/60 text-xs font-bold"
              aria-label={t.nav.switchLang}
            >
              <button
                type="button"
                onClick={() => setLang("fr")}
                className={`
                  px-3.5 py-1.5 rounded-full transition-all duration-200
                  ${
                    lang === "fr"
                      ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs"
                      : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                  }
                `}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`
                  px-3.5 py-1.5 rounded-full transition-all duration-200
                  ${
                    lang === "en"
                      ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs"
                      : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                  }
                `}
              >
                EN
              </button>
            </div>

            {/* THEME TOGGLE */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={darkMode ? t.nav.themeToLight : t.nav.themeToDark}
              className="
                w-11 h-11 rounded-full
                flex items-center justify-center
                border border-neutral-300/60 dark:border-neutral-700/70
                bg-white/80 dark:bg-neutral-800/80
                text-neutral-700 dark:text-neutral-200
                hover:border-amber-500/50 hover:scale-105
                transition-all duration-200
              "
            >
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-400">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-neutral-700">
                  <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
                </svg>
              )}
            </button>

            {/* CTA DESKTOP */}
            <a
              href="#contact"
              className="
                hidden lg:inline-flex items-center gap-2
                px-6 py-3 rounded-full
                text-sm font-semibold text-white
                bg-gradient-to-r from-[#c68a3e] via-[#b87c3a] to-[#a66d2a]
                shadow-[0_4px_16px_rgba(198,138,62,0.35)]
                hover:shadow-[0_6px_22px_rgba(198,138,62,0.5)]
                hover:-translate-y-0.5 transition-all duration-300
              "
            >
              <span>{t.nav.cta}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* BURGER MOBILE */}
            <button
              className={`
                lg:hidden w-11 h-11 rounded-full
                flex flex-col items-center justify-center gap-1.5
                border border-neutral-300/60 dark:border-neutral-700/70
                bg-white/80 dark:bg-neutral-800/80
                cursor-pointer transition-colors duration-200
                ${open ? "bg-neutral-200 dark:bg-neutral-700" : ""}
              `}
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className={`block w-5 h-[2px] bg-neutral-900 dark:bg-white transition-all duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block w-5 h-[2px] bg-neutral-900 dark:bg-white transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE PLEIN ÉCRAN */}
      <div
        ref={menuRef}
        aria-hidden={!open}
        className={`
          fixed inset-0 z-40 lg:hidden
          bg-gradient-to-b from-[#f8f6f0] to-[#efe6d6]
          dark:from-[#0e0f12] dark:to-[#17130e]
          flex flex-col
          px-6 pt-32 pb-8
          overflow-y-auto
          transition-all duration-300 ease-out
          ${open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-3"}
        `}
      >
        {/* LIENS MOBILES */}
        <nav className="flex-1">
          <ul className="list-none m-0 p-0">
            {t.nav.links.map((link, i) => {
              const isActive = active === link.href;
              return (
                <li
                  key={link.href}
                  className={`
                    border-b border-black/[0.08] dark:border-white/[0.08]
                    transition-all duration-500 ease-out
                    ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
                  `}
                  style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className="flex items-center justify-between py-5 group"
                  >
                    <span
                      className={`
                        font-['Space_Grotesk'] text-2xl font-semibold transition-colors
                        ${isActive ? "text-[#c68a3e]" : "text-neutral-900 dark:text-white group-hover:text-[#c68a3e]"}
                      `}
                    >
                      {link.label}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-5 h-5 transition-all ${
                        isActive
                          ? "text-[#c68a3e] translate-x-0"
                          : "text-neutral-400 -translate-x-1 group-hover:translate-x-0 group-hover:text-[#c68a3e]"
                      }`}
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ACTIONS MOBILE */}
        <div
          className={`
            mt-8 flex flex-col gap-4
            transition-all duration-500 ease-out delay-300
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-[#c68a3e] to-[#a66d2a] shadow-[0_8px_24px_-8px_rgba(198,138,62,0.6)]"
          >
            <span>{t.nav.cta}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {lang === "fr" ? "Langue" : "Language"}
            </span>

            <div className="flex p-1 rounded-full bg-black/[0.06] dark:bg-white/[0.08] text-sm font-semibold">
              {[
                { code: "fr", label: "Français" },
                { code: "en", label: "English" },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`px-4 py-1.5 rounded-full transition-colors ${
                    lang === l.code
                      ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}