import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    title: "Développement web",
    desc: "Sites vitrines, plateformes sur-mesure et applications web pensées pour vos clients.",
    icon: <path d="M8 9 L3 14 L8 19 M20 9 L25 14 L20 19 M16 6 L12 22" />,
  },
  {
    title: "Applications mobiles",
    desc: "Apps natives ou hybrides, du design au déploiement sur les stores, pensées pour une connexion instable.",
    icon: (
      <>
        <rect x="8" y="3" width="12" height="22" rx="2.5" />
        <path d="M13 21h2" />
      </>
    ),
  },
  {
    title: "Maintenance & support",
    desc: "Dépannage sur site et à distance, entretien préventif, contrats de support mensuels.",
    icon: (
      <path d="M18.5 6.5 L21.5 9.5 L14 17 L10 18 L11 14 Z M9 19 L5 23 M6 20 L4 22" />
    ),
  },
  // {
  //   title: "Cybersécurité",
  //   desc: "Audit, sécurisation de vos systèmes et sensibilisation de vos équipes.",
  //   icon: (
  //     <>
  //       <path d="M14 3 L23 7 V13 C23 19 19 23.5 14 25 C9 23.5 5 19 5 13 V7 Z" />
  //       <path d="M10.5 14 L13 16.5 L18 11" />
  //     </>
  //   ),
  //   partner: "Avec Cigogne du Mande",
  // },
  {
    title: "Réseaux & infrastructure",
    desc: "Installation et configuration de réseaux d'entreprise, serveurs, Wi-Fi et câblage.",
    icon: (
      <>
        <circle cx="14" cy="6" r="2.3" />
        <circle cx="6" cy="20" r="2.3" />
        <circle cx="22" cy="20" r="2.3" />
        <path d="M14 8.3 V13 M14 13 L7.4 18.2 M14 13 L20.6 18.2" />
      </>
    ),
  },
  {
    title: "Conseil & accompagnement",
    desc: "Audit digital, stratégie technologique et formation de vos équipes aux outils numériques.",
    icon: (
      <>
        <circle cx="14" cy="14" r="10.5" />
        <path d="M18 10 L15.2 15.2 L10 18 L12.8 12.8 Z" />
      </>
    ),
  },
];

function ServiceCard({ service, index, visible }) {
  return (
    <a
      href="#contact"
      aria-label={`En savoir plus sur : ${service.title}`}
      className={`
        group relative flex flex-col
        p-6 sm:p-7

        bg-white/70
        dark:bg-white/[0.03]

        border border-gray-300/50
        dark:border-white/10

        rounded-2xl

        backdrop-blur-sm

        transition-all duration-700 ease-out

        hover:-translate-y-1.5
        hover:border-amber-500/50
        hover:bg-white
        dark:hover:bg-white/[0.06]
        hover:shadow-[0_20px_50px_-20px_rgba(217,138,61,0.35)]

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-amber-500/60

        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
      }}
    >
      {/* Halo décoratif au hover */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0
          group-hover:from-amber-500/[0.06]
          group-hover:to-teal-500/[0.05]
          transition-all duration-500
        "
      />

      {/* ICÔNE */}
      <span
        className="
          relative
          flex items-center justify-center
          w-12 h-12

          rounded-xl

          border

          bg-transparent

          border-gray-300/70
          dark:border-white/15

          text-amber-600
          dark:text-amber-500

          transition-all duration-300

          group-hover:bg-amber-600
          group-hover:border-amber-600
          group-hover:text-white
          group-hover:scale-105
        "
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {service.icon}
        </svg>
      </span>

      {/* TITRE + PARTENAIRE */}
      <div className="relative mt-5 flex items-center flex-wrap gap-2.5">
        <h3
          className="
            font-display
            text-lg sm:text-xl
            font-semibold
            text-gray-800 dark:text-white

            transition-colors duration-300
            group-hover:text-amber-700
            dark:group-hover:text-amber-400
          "
        >
          {service.title}
        </h3>

        {service.partner && (
          <span
            className="
              font-mono text-[10px] uppercase tracking-wide
              text-teal-600 dark:text-teal-400
              border border-teal-500/40 dark:border-teal-400/30
              bg-teal-50/40 dark:bg-teal-400/5
              rounded-full px-2.5 py-0.5
              whitespace-nowrap
            "
          >
            {service.partner}
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p
        className="
          relative
          mt-2.5
          text-sm
          leading-relaxed
          text-gray-500 dark:text-gray-400
        "
      >
        {service.desc}
      </p>

      {/* CTA */}
      <span
        className="
          relative
          mt-5 inline-flex items-center gap-1.5
          font-mono text-[11px] uppercase tracking-widest

          text-gray-400 dark:text-gray-500

          transition-all duration-300

          group-hover:text-amber-600
          dark:group-hover:text-amber-400
        "
      >
        En savoir plus
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>

      {/* Petit numéro décoratif en haut à droite */}
      <span
        aria-hidden="true"
        className="
          absolute top-5 right-5
          font-mono text-[10px] tracking-widest
          text-gray-300 dark:text-white/15
          transition-colors duration-300
          group-hover:text-amber-500/60
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </a>
  );
}

export default function Services() {
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
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="
        py-20 px-6 sm:px-8
        bg-[#f3efe6] dark:bg-gray-950
        transition-colors duration-500
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* EN-TÊTE */}
        <div className="max-w-xl mb-12">
          <span
            className="
              inline-flex items-center gap-2
              font-mono text-xs font-medium uppercase tracking-widest

              text-gray-500 dark:text-gray-400

              border border-gray-300/60 dark:border-white/10
              rounded-full px-4 py-1.5
              bg-white/60 dark:bg-white/5
              backdrop-blur-sm
            "
          >
            <span
              className="
                w-1.5 h-1.5 rounded-full bg-teal-500
                shadow-[0_0_10px_rgba(111,183,168,0.5)]
              "
            />
            Nos services
          </span>

          <h2
            className="
              font-display
              text-3xl sm:text-4xl
              font-bold tracking-tight
              text-gray-800 dark:text-white
              mt-4 mb-3
            "
          >
            Ce qu'on peut faire{" "}
            <span className="text-amber-600 dark:text-amber-500">
              pour vous
            </span>
            .
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Cinq domaines, un même objectif : rendre le digital
            accessible et fiable au Mali.
          </p>
        </div>

        {/* GRILLE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}