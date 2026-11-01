import { useLanguage } from "../context/LanguageContext";

const PROJECTS_DATA = {
  fr: [
    {
      id: "cosmethique",
      title: "Cosméthique",
      category: "E-commerce, beauté",
      description:
        "Boutique en ligne de produits cosmétiques naturels, avec un parcours d'achat simple.",
      url: "https://cosmethique.vercel.app/",
    },
    {
      id: "africa-transit",
      title: "Africa Transit Express",
      category: "Transport, réservation",
      description:
        "Application web pour réserver et organiser des voyages interurbains.",
      url: "https://mamadou6455.github.io/Africa-transit-express/",
    },
    {
      id: "bambarashop",
      title: "BambaraShop",
      category: "E-commerce, boutique en ligne",
      description:
        "Site de vente en ligne avec gestion des produits, des stocks et des commandes.",
      url: "https://bambarashop.netlify.app/",
    },
  ],

  en: [
    {
      id: "cosmethique",
      title: "Cosméthique",
      category: "E-commerce, beauty",
      description:
        "Online store for natural cosmetics, with a simple shopping experience.",
      url: "https://cosmethique.vercel.app/",
    },
    {
      id: "africa-transit",
      title: "Africa Transit Express",
      category: "Transport, booking",
      description:
        "Web application to book and organize intercity journeys.",
      url: "https://mamadou6455.github.io/Africa-transit-express/",
    },
    {
      id: "bambarashop",
      title: "BambaraShop",
      category: "E-commerce, online store",
      description:
        "Online shop with product, stock and order management.",
      url: "https://bambarashop.netlify.app/",
    },
  ],
};

// Couleur d'accent (bleu du logo), cohérente avec la section Services
const ACCENT = "text-[#0b3d91] dark:text-[#5b9bff]";

function getHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function ProjectCard({ project, visitText, ariaLabel }) {
  return (
    <article className="group relative flex flex-col border-t border-neutral-300 py-7 transition-colors duration-200 hover:border-[#0b3d91] dark:border-neutral-700 dark:hover:border-[#5b9bff]">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {project.category}
      </p>

      <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-semibold text-neutral-900 dark:text-white">
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>

      <p className="mt-5 text-xs text-neutral-500 dark:text-neutral-500">
        {getHost(project.url)}
      </p>

      {/* Lien étendu : toute la carte est cliquable */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold underline decoration-transparent underline-offset-4 transition-colors after:absolute after:inset-0 after:content-[''] hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b3d91] dark:focus-visible:outline-[#5b9bff] ${ACCENT}`}
      >
        {visitText}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </a>
    </article>
  );
}

export default function Portfolio() {
  const { lang, t } = useLanguage();
  const projects = PROJECTS_DATA[lang] || PROJECTS_DATA.fr;

  const visitText =
    t.portfolio.visitCTA ||
    (lang === "fr" ? "Visiter le site" : "Visit website");

  const buildAriaLabel = (title) =>
    t.portfolio.viewProjectAria
      ? t.portfolio.viewProjectAria.replace("{title}", title)
      : `${visitText} ${title}`;

  return (
    <section
      id="portfolio"
      className="bg-[#f8f6f0] px-6 py-20 text-neutral-900 dark:bg-[#0c0d12] dark:text-white sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.portfolio.titleStart}
            <span className={ACCENT}>{t.portfolio.titleHighlight}</span>
            {t.portfolio.titleEnd}
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">
            {t.portfolio.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              visitText={visitText}
              ariaLabel={buildAriaLabel(project.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}