import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Données projets                                                    */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    n: "01",
    title: "Recyclage Info",
    description:
      "Plateforme d'information et de sensibilisation au recyclage.",
    url: "https://finalrecycl-production.up.railway.app/",
  },
  {
    n: "02",
    title: "Africa Transit Express",
    description:
      "Application de voyage en ligne pour l'Africa Transit Express.",
    url: "https://mamadou6455.github.io/Africa-transit-express/",
  },
  {
    n: "03",
    title: "Gestion de parc informatique",
    description:
      "Application web pour la gestion de parc informatique avec authentification et base de données.",
    url: "https://mamadou6455.github.io/quiz_reseau-v3/",
  },
];

/* ------------------------------------------------------------------ */
/*  Icônes                                                             */
/* ------------------------------------------------------------------ */

function ExternalIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ArrowIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Carte projet                                                       */
/* ------------------------------------------------------------------ */

function ProjectCard({ project, index, visible }) {
  const displayUrl = project.url.replace(/^https?:\/\//, "");

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Voir le projet ${project.title} (nouvel onglet)`}
      className={`
        group relative flex flex-col justify-between
        rounded-2xl p-6 sm:p-7
        min-h-[220px]
        overflow-hidden
        bg-white dark:bg-slate-900/60
        border border-slate-200 dark:border-white/10
        shadow-sm hover:shadow-xl
        hover:border-[#d98a3d]/50 dark:hover:border-[#e8a45c]/50
        hover:-translate-y-1
        backdrop-blur-sm
        transition-all duration-500 ease-out
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[#d98a3d] dark:focus-visible:ring-[#e8a45c]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      {/* Halo décoratif au hover */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full
                   bg-gradient-to-br from-[#d98a3d]/20 to-[#6fb7a8]/10
                   blur-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500"
      />

      {/* En-tête : numéro + flèche */}
      <div className="relative flex items-start justify-between">
        <span
          className="font-mono text-xs font-medium tracking-widest
                     text-slate-400 dark:text-slate-500"
        >
          {/* {project.n} */}
        </span>

        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-full
                     bg-slate-100 dark:bg-white/5
                     text-slate-500 dark:text-slate-400
                     group-hover:bg-[#d98a3d] dark:group-hover:bg-[#e8a45c]
                     group-hover:text-white
                     group-hover:rotate-[-45deg]
                     transition-all duration-500"
        >
          <ExternalIcon className="w-4 h-4" />
        </span>
      </div>

      {/* Contenu */}
      <div className="relative mt-6 flex flex-col">
        <h3
          className="font-display text-lg sm:text-xl font-semibold
                     text-slate-900 dark:text-white
                     group-hover:text-[#d98a3d] dark:group-hover:text-[#e8a45c]
                     transition-colors duration-300"
        >
          {project.title}
        </h3>

        <p
          className="mt-2 text-sm leading-relaxed line-clamp-2
                     text-slate-600 dark:text-slate-400"
        >
          {project.description}
        </p>
      </div>

      {/* Pied : URL + CTA */}
      <div className="relative mt-6 flex items-center justify-between gap-3">
        <span
          className="font-mono text-[11px] truncate
                     text-slate-500 dark:text-slate-500
                     group-hover:text-slate-700 dark:group-hover:text-slate-300
                     transition-colors"
        >
          {/* {displayUrl} */}
        </span>

        <span
          className="inline-flex items-center gap-1.5 shrink-0
                     font-mono text-[10px] uppercase tracking-widest
                     text-[#6fb7a8] dark:text-[#8fd4c5]
                     opacity-0 group-hover:opacity-100
                     translate-x-2 group-hover:translate-x-0
                     transition-all duration-300"
        >
          Visiter
          <ArrowIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Portfolio                                                  */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-16 sm:py-20 px-6 sm:px-8
                 bg-slate-50 dark:bg-slate-950
                 border-t border-slate-200 dark:border-white/10
                 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* -------- En-tête -------- */}
        <div className="max-w-md mb-10">
          <span
            className="inline-flex items-center gap-2 font-mono text-xs font-medium
                       uppercase tracking-widest rounded-full px-4 py-1.5
                       text-slate-600 dark:text-slate-400
                       border border-slate-300 dark:border-white/10
                       bg-white dark:bg-white/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6fb7a8] animate-pulse" />
            Portfolio
          </span>

          <h2
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-4
                       text-slate-900 dark:text-white"
          >
            Trois projets{" "}
            <span className="text-[#d98a3d] dark:text-[#e8a45c]">récents</span>.
          </h2>

          <p
            className="mt-3 text-sm leading-relaxed
                       text-slate-600 dark:text-slate-400"
          >
            Une sélection de réalisations web et mobile. Cliquez sur une carte
            pour ouvrir le site en direct.
          </p>
        </div>

        {/* -------- Grille -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.n} project={p} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}