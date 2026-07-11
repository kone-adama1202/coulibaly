import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    // { label: "Partenaires", href: "#partenaires" },
    { label: "Équipe", href: "#equipe" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Seule animation CSS conservée (ping) */}
      <style>{`
        @keyframes ping-slow {
          0%   { transform: scale(1); opacity: 0.6; }
          80%  { transform: scale(3.2); opacity: 0; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2.4s cubic-bezier(0.2, 0.7, 0.4, 1) infinite;
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
        <div className="w-full max-w-6xl flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 text-[#1e1b17] no-underline">
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
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="
                      relative inline-block px-3.5 py-2 text-sm font-medium
                      text-[#3d3a35]/70 hover:text-[#1e1b17]
                      rounded-full transition-colors duration-200
                      after:content-[''] after:absolute after:left-3.5 after:right-3.5 after:bottom-1.5
                      after:h-[2px] after:bg-[#b87c3a] after:scale-x-0 after:origin-left
                      after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0,0.35,1)]
                      hover:after:scale-x-100
                    "
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
                lg:hidden w-9 h-9 rounded-xl border border-[#1e1b17]/20
                flex flex-col items-center justify-center gap-1.5
                bg-transparent cursor-pointer transition-colors
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

      {/* Menu mobile overlay (fond clair) */}
      <div
        className={`
          fixed inset-0 z-40 bg-white/95 backdrop-blur-sm
          flex flex-col justify-center px-10
          transition-opacity duration-350 ease-in
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {links.map((l, i) => (
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
      </div>
    </>
  );
}