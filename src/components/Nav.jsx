import { useState, useEffect } from "react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#partenaire", label: "Partenaire" },
  { href: "#equipe", label: "Équipe" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(LINKS[0].href); // lien actif par défaut

  // Effet pour le fond de la navbar (scroll)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Effet pour détecter la section visible (Intersection Observer)
  useEffect(() => {
    // On récupère les éléments correspondant aux ancres (sans le '#')
    const sections = LINKS.map((link) => document.querySelector(link.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Quand une section entre dans la zone visible, on met à jour le lien actif
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.4, // Seuil de 40% de visibilité
        rootMargin: "-20% 0px -20% 0px", // Ajuste pour éviter les déclenchements trop tôt
      }
    );

    // On observe chaque section existante
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Nettoyage
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-out
        ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-xl border-b border-indigo-500/20 shadow-2xl shadow-cyan-500/5"
            : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 md:py-5">
        {/* Logo avec dégradé coloré */}
        <a
          href="#top"
          className="font-display text-2xl font-light tracking-wide text-slate-100 hover:text-cyan-300 transition-colors"
        >
          World
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-amber-400 hover:to-cyan-400 transition-all duration-500">
            Digital
          </span>
        </a>

        {/* Liens desktop avec soulignement actif */}
        <ul className="hidden md:flex items-center gap-10 font-body text-sm font-light tracking-wider">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`
                  relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full hover:text-slate-100 transition-colors
                  ${
                    activeLink === l.href
                      ? "after:w-full text-slate-100"
                      : "after:w-0 text-slate-400"
                  }
                `}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop avec DÉGRADÉ et GLOW */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-300 hover:to-indigo-400 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
        >
          Demander un devis
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Bouton mobile coloré */}
        <button
          className="md:hidden text-slate-200 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile avec lien actif en cyan */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-indigo-500/20 px-6 py-6 shadow-inner shadow-cyan-500/5">
          <ul className="flex flex-col gap-5 font-body text-base">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`
                    block transition-colors font-light tracking-wide hover:pl-2 duration-200
                    ${
                      activeLink === l.href
                        ? "text-cyan-400"
                        : "text-slate-400 hover:text-cyan-400"
                    }
                  `}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-indigo-500/20">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-amber-400 transition-colors group"
              >
                Demander un devis
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}