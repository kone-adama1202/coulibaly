import { useEffect, useRef, useState } from "react";

// Import des captures d'écran (adapte les chemins selon ton projet)
import img1 from "../assets/projet4.png";
import img2 from "../assets/projet2.png";
import img3 from "../assets/projet3.png";

const PROJECTS = [
  {
    n: "01",
    kind: "browser",
    title: "Recyclage Info",
    description: "Plateforme d'information et de sensibilisation au recyclage.",
    tags: ["React", "Tailwind"],
    url: "https://recyclage-info.com", // ← remplace par ton vrai lien
    image: img1,
  },
  {
    n: "02",
    kind: "phone",
    title: "TransportGo",
    description: "Application mobile de mise en relation pour le transport.",
    tags: ["React Native", "API"],
    url: "https://transportgo.app", // ← remplace par ton vrai lien
    image: img2,
  },
  {
    n: "03",
    kind: "browser",
    title: "Parc Info Care",
    description: "Gestion et suivi du parc informatique d'une structure.",
    tags: ["Next.js", "Prisma"],
    url: "https://parc-info-care.fr", // ← remplace par ton vrai lien
    image: img3,
  },
];

// Sous-composant image avec fallback
function Shot({ image, title }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6 opacity-60"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16l-5.5-5.5a2 2 0 0 0-2.8 0L3 20" />
        </svg>
        <span className="font-mono text-[10px] tracking-wide">Capture à venir</span>
      </div>
    );
  }

  return (
    <img
      className="w-full h-full object-contain block"
      src={image}
      alt={`Capture d'écran du projet ${title}`}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}

// Icône lien externe
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

// Carte projet
function ProjectCard({ project, index, visible }) {
  const isBrowser = project.kind === "browser";

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Voir le projet ${project.title} (nouvel onglet)`}
      className={`
        group flex flex-col
        transition-all duration-700 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d98a3d] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      {/* Aperçu */}
      {isBrowser ? (
        <div className="w-full bg-[#1d222f] border border-[#f3efe6]/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#d98a3d]/50 group-hover:shadow-[#d98a3d]/10">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161a24] border-b border-[#f3efe6]/10">
            <span className="w-2 h-2 rounded-full bg-[#f3efe6]/20" />
            <span className="w-2 h-2 rounded-full bg-[#f3efe6]/20" />
            <span className="w-2 h-2 rounded-full bg-[#f3efe6]/20" />
            <span className="ml-2 font-mono text-[10px] text-[#f3efe6]/30 truncate">
              {project.url.replace(/^https?:\/\//, "")}
            </span>
          </div>
          <div className="aspect-[16/11] bg-[#1d222f] overflow-hidden">
            <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
              <Shot image={project.image} title={project.title} />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-2/3 mx-auto bg-[#1d222f] border-4 border-[#161a24] rounded-[26px] overflow-hidden shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#d98a3d]/40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-11 h-3 bg-[#161a24] rounded-b-lg z-10" />
          <div className="aspect-[9/17.5] bg-[#1d222f] overflow-hidden">
            <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.03]">
              <Shot image={project.image} title={project.title} />
            </div>
          </div>
        </div>
      )}

      {/* Infos */}
      <div className="mt-4 flex flex-col items-center text-center px-1">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-[#d98a3d]">{project.n}</span>
          <h3 className="font-display text-base font-semibold text-[#d98a3d] group-hover:text-[#e8a45c] transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="mt-1 text-sm text-[#f3efe6]/60 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-2">
          {/* {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wide text-[#f3efe6]/50 border border-[#f3efe6]/10 rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))} */}
        </div>

        {/* CTA */}
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#6fb7a8] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Voir le site
          <ExternalIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </a>
  );
}

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
      className="py-16 px-6 sm:px-8 bg-white/5 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-md mb-10">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-[#f3efe6]/60 border border-[#f3efe6]/10 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6fb7a8]" />
            Portfolio
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black mt-4">
            Trois projets <span className="text-[#d98a3d]">récents</span>.
          </h2>
          <p className="mt-3 text-sm text-black/60 leading-relaxed">
            Une sélection de réalisations web et mobile. Cliquez sur une carte pour
            ouvrir le site en direct.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.n} project={p} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}