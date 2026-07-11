import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    n: "01",
    title: "Développement web",
    desc: "Sites vitrines, plateformes sur‑mesure et apps web.",
    icon: (
      <path d="M8 9 L3 14 L8 19 M20 9 L25 14 L20 19 M16 6 L12 22" />
    ),
  },
  {
    n: "02",
    title: "Applications mobiles",
    desc: "Apps natives ou hybrides, du design au déploiement sur les stores.",
    icon: (
      <>
        <rect x="8" y="3" width="12" height="22" rx="2.5" />
        <path d="M13 21h2" />
      </>
    ),
  },
  {
    n: "03",
    title: "Maintenance & support",
    desc: "Dépannage, entretien préventif, support technique.",
    icon: (
      <path d="M18.5 6.5 L21.5 9.5 L14 17 L10 18 L11 14 Z M9 19 L5 23 M6 20 L4 22" />
    ),
  },
];

function ServiceCard({ service, index, visible }) {
  return (
    <div
      className={`
        bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60
        flex flex-col
        transition-all duration-700 ease-out
        hover:shadow-md hover:-translate-y-1
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-sm text-gray-400">{service.n}</span>
        <svg
          className="w-6 h-6 text-amber-600"
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
      </div>
      <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-gray-500 flex-1">{service.desc}</p>
      <a
        href="#contact"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-amber-600 transition-colors group"
      >
        En discuter
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 px-6 sm:px-8 bg-[#f3efe6]"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-xl mb-10">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-gray-500 border border-gray-300/60 rounded-full px-4 py-1.5 bg-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Nos services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mt-4 mb-2">
            Ce qu'on peut faire <span className="text-amber-600">pour vous</span>.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Deux profils, un même objectif : rendre le digital accessible et
            fiable au Mali.
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.n}
              service={s}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}