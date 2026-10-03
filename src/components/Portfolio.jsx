import { useLanguage } from "../context/LanguageContext";

const PROJECTS_DATA = {
  fr: [
    {
      id: "01",
      title: "Cosméthique",
      category: "E-Commerce & Beauté",
      description:
        "Plateforme web moderne dédiée à la vente de produits cosmétiques naturels avec expérience d'achat fluide.",
      url: "https://cosmethique.vercel.app/",
    },
    {
      id: "02",
      title: "Africa Transit Express",
      category: "Transport & Réservation",
      description:
        "Application web de réservation et de suivi de voyages interurbains optimisée pour le contexte africain.",
      url: "https://mamadou6455.github.io/Africa-transit-express/",
    },
    {
      id: "03",
      title: "Gestion de Parc Informatique",
      category: "SaaS & Infrastructure",
      description:
        "Système complet de suivi du matériel IT avec tableaux de bord analytiques et authentification sécurisée.",
      url: "https://mamadou6455.github.io/quiz_reseau-v3/",
    },
  ],
  en: [
    {
      id: "01",
      title: "Cosméthique",
      category: "E-Commerce & Beauty",
      description:
        "Modern digital storefront for organic cosmetic products with a seamless, responsive checkout experience.",
      url: "https://cosmethique.vercel.app/",
    },
    {
      id: "02",
      title: "Africa Transit Express",
      category: "Travel & Ticketing",
      description:
        "Intercity booking and journey scheduling web application optimized for fast loading and mobile users.",
      url: "https://mamadou6455.github.io/Africa-transit-express/",
    },
    {
      id: "03",
      title: "IT Asset Management",
      category: "SaaS & Enterprise",
      description:
        "Centralized hardware tracking platform featuring role-based authentication and real-time maintenance logs.",
      url: "https://mamadou6455.github.io/quiz_reseau-v3/",
    },
  ],
};

function ProjectCard({ project, visitText }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex flex-col p-7 rounded-2xl
        bg-white dark:bg-white/[0.04]
        border border-black/[0.06] dark:border-white/[0.08]
        hover:border-[#c68a3e] transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c68a3e]
      "
    >
      <span className="text-sm font-medium text-[#c68a3e]">
        {project.category}
      </span>

      <h3 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-neutral-900 dark:text-white">
        {project.title}
      </h3>

      <p className="mt-3 flex-grow text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#c68a3e] transition-colors">
        {visitText}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </span>
    </a>
  );
}

export default function Portfolio() {
  const { lang, t } = useLanguage();
  const projects = PROJECTS_DATA[lang] || PROJECTS_DATA.fr;

  return (
    <section
      id="portfolio"
      className="py-20 px-6 sm:px-8 bg-[#f8f6f0] dark:bg-[#0c0d12] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.portfolio.titleStart}
            <span className="text-[#c68a3e]">{t.portfolio.titleHighlight}</span>
            {t.portfolio.titleEnd}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t.portfolio.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              visitText={t.portfolio.visitCTA || "Visiter"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}