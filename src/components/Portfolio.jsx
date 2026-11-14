import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Les images dans src/assets doivent être IMPORTÉES (un chemin texte
// comme "../assets/..." ne fonctionne pas : le bundler ne le résout pas).
// Adaptez les noms de fichiers si besoin.
import siteVitrine1 from "../assets/portfolio/sitevitrine1.jpg";
import siteVitrine2 from "../assets/portfolio/sitevitrine2.jpg";
import siteVitrine3 from "../assets/portfolio/sitevitrine3.jpg";

// Image de chaque projet (partagée entre le français et l'anglais)
const PROJECT_IMAGES = {
  cosmethique: siteVitrine1,
  "africa-transit": siteVitrine2,
  bambarashop: siteVitrine3,
};

const PROJECTS_DATA = {
  fr: [
    {
      id: "cosmethique",
      title: "Site vitrine",
      category: "Site vitrine",
    },
    {
      id: "africa-transit",
      title: "Africa Transit Express",
      category: "site vitrine",
    },
    {
      id: "bambarashop",
      title: "BambaraShop",
      category: "E-commerce",
    },
  ],

  en: [
    {
      id: "cosmethique",
      title: "Showcase website",
      category: "E-commerce, beauty",
    },
    {
      id: "africa-transit",
      title: "Africa Transit Express",
      category: "Transport, booking",
    },
    {
      id: "bambarashop",
      title: "BambaraShop",
      category: "E-commerce, online store",
    },
  ],
};

// Couleur d'accent (bleu du logo), cohérente avec la section Services
const ACCENT = "text-[#0b3d91] dark:text-[#5b9bff]";

/*
 * Réglages de l'effet d'inclinaison 3D (souris uniquement).
 * Mettre TILT_MAX_DEG à 0 pour le désactiver.
 */
const TILT_MAX_DEG = 7;

function ProjectCard({ project, index, visible }) {
  const tiltRef = useRef(null);

  // Inclinaison 3D qui suit la souris (ignorée au tactile et si l'utilisateur
  // a demandé moins d'animations)
  const handlePointerMove = (event) => {
    if (TILT_MAX_DEG === 0 || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const element = tiltRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty("--ry", `${x * TILT_MAX_DEG * 2}deg`);
    element.style.setProperty("--rx", `${-y * TILT_MAX_DEG * 2}deg`);
  };

  const resetTilt = () => {
    const element = tiltRef.current;
    if (!element) return;
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  };

  return (
    // Entrée au défilement : fondu + montée, décalée d'une carte à l'autre
    <div
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <figure className="group m-0">
        <div
          ref={tiltRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          style={{
            transform:
              "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b3d91] to-[#5b9bff] shadow-lg shadow-black/15 ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 ease-out will-change-transform group-hover:shadow-2xl group-hover:shadow-[#0b3d91]/30 motion-reduce:transform-none motion-reduce:transition-none dark:ring-white/10"
        >
          <img
            src={PROJECT_IMAGES[project.id]}
            alt={project.title}
            loading="lazy"
            onError={(event) => {
              // image introuvable : on garde le fond dégradé
              event.currentTarget.style.display = "none";
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />

          {/* Voile dégradé : donne de la profondeur, s'intensifie au survol */}
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b3d91]/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />

          {/* Reflet lumineux qui traverse l'image au survol */}
          <span
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[130%] group-hover:opacity-100 motion-reduce:hidden"
            aria-hidden="true"
          />

          {/* Petit carré orange : clin d'œil au logo */}
          <span
            className="absolute right-3 top-3 h-3 w-3 bg-[#F7931E] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </div>

        <figcaption className="mt-5 flex flex-col items-center gap-2.5 text-center">
          <span
            className="h-0.5 w-6 bg-[#F7931E] transition-all duration-300 group-hover:w-14 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span className="text-base font-semibold text-neutral-800 transition-colors duration-300 group-hover:text-[#0b3d91] dark:text-neutral-100 dark:group-hover:text-[#5b9bff]">
            {project.category}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Portfolio() {
  const { lang, t } = useLanguage();
  const projects = PROJECTS_DATA[lang] || PROJECTS_DATA.fr;

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Les cartes apparaissent quand la section entre à l'écran
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="bg-[#f8f6f0] px-6 py-20 text-neutral-900 dark:bg-[#0c0d12] dark:text-white sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* En-tête centré, avec un filet de chaque côté du titre */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span
              className="hidden h-px w-16 bg-neutral-300 dark:bg-white/20 sm:block md:w-24"
              aria-hidden="true"
            />

            <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.portfolio.titleStart}
              <span className={ACCENT}>{t.portfolio.titleHighlight}</span>
              {t.portfolio.titleEnd}
            </h2>

            <span
              className="hidden h-px w-16 bg-neutral-300 dark:bg-white/20 sm:block md:w-24"
              aria-hidden="true"
            />
          </div>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
            {t.portfolio.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}