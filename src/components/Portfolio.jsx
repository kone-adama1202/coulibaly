
import { useLanguage } from "../context/LanguageContext";

const PROJECTS_DATA = {
  fr: [
    {
      id: "cosmethique",
      title: "Cosméthique",
      category: "E-commerce · Beauté",
      description:
        "Boutique en ligne spécialisée dans la vente de produits cosmétiques naturels, avec un parcours d'achat simple.",
      url: "https://cosmethique.vercel.app/",
    },
    {
      id: "africa-transit",
      title: "Africa Transit Express",
      category: "Transport · Réservation",
      description:
        "Application web dédiée à la réservation et à l'organisation des voyages interurbains.",
      url: "https://mamadou6455.github.io/Africa-transit-express/",
    },
    {
      id: "bambarashop",
      title: "BambaraShop",
      category: "E-commerce · Boutique en ligne",
      description:
        "Site de vente en ligne avec des fonctionnalités de gestion des produits, des stocks et des commandes.",
      url: "https://bambarashop.netlify.app/",
    },
  ],

  en: [
    {
      id: "cosmethique",
      title: "Cosméthique",
      category: "E-commerce · Beauty",
      description:
        "Online store specializing in natural cosmetics, with a straightforward shopping experience.",
      url: "https://cosmethique.vercel.app/",
    },
    {
      id: "africa-transit",
      title: "Africa Transit Express",
      category: "Transport · Booking",
      description:
        "Web application for booking and organizing intercity journeys.",
      url: "https://mamadou6455.github.io/Africa-transit-express/",
    },
    {
      id: "bambarashop",
      title: "BambaraShop",
      category: "E-commerce · Online store",
      description:
        "Online shop with product, stock and order management features.",
      url: "https://bambarashop.netlify.app/",
    },
  ],
};

function ProjectCard({ project, visitText }) {
  return (
    <article className="flex flex-col border-t border-neutral-300 py-6 dark:border-neutral-700">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {project.category}
      </p>

      <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#a66d2a] underline decoration-transparent underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c68a3e] dark:text-[#d9a15e]"
      >
        {visitText}
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export default function Portfolio() {
  const { lang, t } = useLanguage();
  const projects = PROJECTS_DATA[lang] || PROJECTS_DATA.fr;

  return (
    <section
      id="portfolio"
      className="bg-[#f8f6f0] px-6 py-20 text-neutral-900 dark:bg-[#0c0d12] dark:text-white sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.portfolio.titleStart}
            <span className="text-[#c68a3e]">
              {t.portfolio.titleHighlight}
            </span>
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
              visitText={
                t.portfolio.visitCTA ||
                (lang === "fr" ? "Visiter le site" : "Visit website")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
