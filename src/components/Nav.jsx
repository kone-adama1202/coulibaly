import { useEffect, useState, useRef } from "react";

const LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Équipe", href: "#equipe" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef(null);

  // Fond de la nav au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Verrouille le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Ferme le menu avec Échap, et au redimensionnement vers desktop
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

  // Scroll-spy : met en surbrillance le lien de la section visible
  useEffect(() => {
    const sections = LINKS
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        :root {
          --wd-ink: #1e1b17;
          --wd-amber: #b87c3a;
          --wd-amber-2: #c68a3e;
          --wd-amber-3: #a66d2a;
          --wd-teal: #6fb7a8;
          --wd-cream: #f5f2eb;
        }

        @keyframes ping-slow {
          0%   { transform: scale(1); opacity: 0.6; }
          80%  { transform: scale(3.2); opacity: 0; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2.4s cubic-bezier(0.2, 0.7, 0.4, 1) infinite;
        }

        /* Fine ligne de dégradé sous la nav, visible seulement au scroll */
        .wd-nav-edge {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--wd-amber) 50%, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .wd-nav-edge.is-visible { opacity: 0.5; }

        .wd-link {
          position: relative;
        }
        .wd-link::after {
          content: "";
          position: absolute;
          left: 14px; right: 14px; bottom: 6px;
          height: 2px;
          background: var(--wd-amber);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.65,0,0.35,1);
        }
        .wd-link:hover::after,
        .wd-link.is-active::after {
          transform: scaleX(1);
        }
        .wd-link.is-active {
          color: var(--wd-ink);
        }

        .wd-burger {
          transition: box-shadow 0.25s ease, background-color 0.2s ease, border-color 0.2s ease;
        }
        .wd-burger:hover {
          border-color: rgba(30,27,23,0.35);
          box-shadow: 0 4px 14px -8px rgba(30,27,23,0.35);
        }

        a:focus-visible,
        button:focus-visible {
          outline: 2px solid var(--wd-teal);
          outline-offset: 3px;
          border-radius: 6px;
        }
      `}</style>

      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          flex justify-center
          px-6 sm:px-8 py-5
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06),0_18px_40px_-24px_rgba(0,0,0,0.15)] py-3"
              : "bg-transparent"
          }
        `}
      >
        <span className={`wd-nav-edge ${scrolled ? "is-visible" : ""}`} />

        <div className="w-full max-w-6xl flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 text-[#1e1b17] no-underline">
            <span className="relative w-2 h-2 flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-[#6fb7a8]" />
              <span className="absolute inset-0 rounded-full bg-[#6fb7a8] animate-ping-slow" />
            </span>
            <span className="font-['Space_Grotesk'] text-lg font-semibold tracking-tight">
              World<span className="text-[#b87c3a]">Digital</span>
            </span>
          </a>

          {/* Droite : liens + CTA + burger */}
          <div className="flex items-center gap-7">
            {/* Liens desktop */}
            <ul className="hidden lg:flex items-center gap-1.5 list-none m-0 p-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href ? "true" : undefined}
                    className={`
                      wd-link inline-block px-3.5 py-2 text-sm font-medium
                      rounded-full transition-colors duration-200
                      ${active === l.href ? "is-active text-[#1e1b17]" : "text-[#3d3a35]/70 hover:text-[#1e1b17]"}
                    `}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA desktop */}
            <a
              href="#contact"
              className="
                hidden lg:inline-flex items-center gap-2
                px-5 py-2.5 rounded-full
                text-sm font-semibold text-white
                bg-gradient-to-br from-[#c68a3e] to-[#a66d2a]
                shadow-[0_8px_22px_-10px_rgba(166,109,42,0.4)]
                hover:shadow-[0_12px_26px_-10px_rgba(166,109,42,0.6)]
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              Nous contacter
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* Burger (mobile) */}
            <button
              className={`
                wd-burger lg:hidden w-9 h-9 rounded-xl border border-[#1e1b17]/20
                flex flex-col items-center justify-center gap-1.5
                bg-transparent cursor-pointer
                ${open ? "bg-[#1e1b17]/5" : ""}
              `}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`block w-4 h-[1.5px] bg-[#1e1b17] transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block w-4 h-[1.5px] bg-[#1e1b17] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-[1.5px] bg-[#1e1b17] transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      <div
        ref={menuRef}
        className={`
          fixed inset-0 z-40 bg-white/95 backdrop-blur-sm
          flex flex-col justify-center px-10
          transition-opacity duration-350 ease-in
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className="
              font-['Space_Grotesk'] text-3xl sm:text-4xl font-semibold
              text-[#1e1b17] no-underline py-4 border-b border-[#1e1b17]/10
              hover:text-[#b87c3a] transition-colors duration-200
              opacity-0 translate-y-2.5
            "
            style={{
              transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
              ...(open && { opacity: 1, transform: "translateY(0)" })
            }}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}

        {/* CTA visible aussi dans le menu mobile */}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="
            mt-8 inline-flex items-center justify-center gap-2 w-fit
            px-6 py-3 rounded-full
            text-sm font-semibold text-white
            bg-gradient-to-br from-[#c68a3e] to-[#a66d2a]
            shadow-[0_8px_22px_-10px_rgba(166,109,42,0.5)]
            opacity-0 translate-y-2.5
          "
          style={{
            transition: `opacity 0.4s ease ${LINKS.length * 60}ms, transform 0.4s ease ${LINKS.length * 60}ms`,
            ...(open && { opacity: 1, transform: "translateY(0)" })
          }}
        >
          Nous contacter
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </>
  );
}