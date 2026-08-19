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
    icon: <path d="M18.5 6.5 L21.5 9.5 L14 17 L10 18 L11 14 Z M9 19 L5 23 M6 20 L4 22" />,
  },
  {
    title: "Cybersécurité",
    desc: "Audit, sécurisation de vos systèmes et sensibilisation de vos équipes.",
    icon: (
      <>
        <path d="M14 3 L23 7 V13 C23 19 19 23.5 14 25 C9 23.5 5 19 5 13 V7 Z" />
        <path d="M10.5 14 L13 16.5 L18 11" />
      </>
    ),
    partner: "Avec Cigogne du Mande",
  },
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

function ServiceRow({ service, index, visible }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`
        group relative border-b border-gray-300/50 last:border-0
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: visible ? `${index * 70}ms` : "0ms" }}
    >
      {/* Fond qui se déploie depuis la gauche au survol */}
      <span
        className={`
          absolute inset-0 bg-white origin-left
          transition-transform duration-500 ease-out
          ${hover ? "scale-x-100" : "scale-x-0"}
        `}
        aria-hidden="true"
      />

      <a
        href="#contact"
        className="relative flex items-center gap-5 sm:gap-6 py-6 sm:py-7 px-3 sm:px-5"
      >
        <span
          className={`
            hidden sm:flex w-11 h-11 rounded-full items-center justify-center flex-shrink-0
            border transition-all duration-300
            ${hover ? "bg-amber-600 border-amber-600 scale-105" : "bg-transparent border-gray-300/70"}
          `}
        >
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${hover ? "text-white" : "text-amber-600"}`}
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

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2.5">
            <h3 className="font-display text-lg sm:text-2xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors duration-300">
              {service.title}
            </h3>
            {service.partner && (
              <span className="font-mono text-[10px] uppercase tracking-wide text-teal-600 border border-teal-500/40 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                {service.partner}
              </span>
            )}
          </div>

          {/* Description : hauteur animée, repliée par défaut sur desktop */}
          <div
            className={`
              grid transition-all duration-400 ease-out
              sm:grid-rows-[0fr] sm:opacity-0
              ${hover ? "sm:grid-rows-[1fr] sm:opacity-100" : ""}
              grid-rows-[1fr] opacity-100
            `}
          >
            <p className="overflow-hidden text-sm text-gray-500 sm:pt-1.5 pt-1 max-w-lg leading-relaxed">
              {service.desc}
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`
            w-5 h-5 flex-shrink-0 text-gray-400
            transition-all duration-300
            ${hover ? "translate-x-1 text-amber-600" : ""}
          `}
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
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
    <section ref={sectionRef} id="services" className="py-20 px-6 sm:px-8 bg-[#f3efe6]">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="max-w-xl mb-6">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-gray-500 border border-gray-300/60 rounded-full px-4 py-1.5 bg-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Nos services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mt-4 mb-2">
            Ce qu'on peut faire <span className="text-amber-600">pour vous</span>.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Six domaines, un même objectif : rendre le digital accessible et fiable au Mali.
          </p>
        </div>

        {/* Liste */}
        <div className="mt-8">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}