import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ICONS = [
  // Web
  <path key="web" d="M8 9 L3 14 L8 19 M20 9 L25 14 L20 19 M16 6 L12 22" />,
  // Mobile
  <g key="mobile">
    <rect x="8" y="3" width="12" height="22" rx="2.5" />
    <path d="M13 21h2" />
  </g>,
  // Maintenance
  <path
    key="maint"
    d="M18.5 6.5 L21.5 9.5 L14 17 L10 18 L11 14 Z M9 19 L5 23 M6 20 L4 22"
  />,
  // Réseaux
  <g key="net">
    <circle cx="14" cy="6" r="2.3" />
    <circle cx="6" cy="20" r="2.3" />
    <circle cx="22" cy="20" r="2.3" />
    <path d="M14 8.3 V13 M14 13 L7.4 18.2 M14 13 L20.6 18.2" />
  </g>,
  // IA
  <g key="ai">
    <path d="M14 3 C14 8.5 18.5 13 24 13 C18.5 13 14 17.5 14 23 C14 17.5 9.5 13 4 13 C9.5 13 14 8.5 14 3 Z" />
    <path d="M6 4 C6 5.5 7.2 6.7 8.7 6.7 C7.2 6.7 6 7.9 6 9.4 C6 7.9 4.8 6.7 3.3 6.7 C4.8 6.7 6 5.5 6 4 Z" />
  </g>,
];

const SERVICE_FEATURES = {
  fr: [
    ["Sites vitrines & E-commerce", "Performance & SEO optimisés", "Design responsive sur-mesure", "Technologies React / Next.js"],
    ["Applications iOS & Android", "Mode hors-ligne (Offline-first)", "Interface UI/UX intuitive", "Déploiement App Store & Play Store"],
    ["Dépannage rapide & sécurisé", "Sauvegardes automatisées", "Contrats de maintenance mensuels", "Support technique disponible 7j/7"],
    ["Câblage & baie de brassage", "Configuration Wi-Fi sécurisé", "Serveurs locaux & Cloud", "Pare-feu & protection du réseau"],
    ["Intégration d'IA & Chatbots intelligents", "Automatisation des processus métier", "Stratégie de transformation digitale", "Formation de vos équipes aux outils d'IA"],
  ],
  en: [
    ["Showcase & E-commerce websites", "Optimized SEO & Performance", "Custom responsive design", "Modern Next.js / React stack"],
    ["iOS & Android mobile apps", "Offline-first capabilities", "Intuitive UX/UI design", "Play Store & App Store release"],
    ["Fast & secure troubleshooting", "Automated regular backups", "Monthly support contracts", "Dedicated 7/7 technical assistance"],
    ["Structured cabling & racks", "Enterprise Wi-Fi security", "Local servers & Cloud storage", "Firewall & network perimeter protection"],
    ["AI Integration & Smart Chatbots", "Business process automation", "Digital & AI strategic audit", "Staff training on modern AI tools"],
  ],
};

function Icon({ index, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {SERVICE_ICONS[index]}
    </svg>
  );
}

export default function Services() {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = t.services.items;
  const active = services[activeIndex] || services[0];
  const features =
    (SERVICE_FEATURES[lang] || SERVICE_FEATURES.fr)[activeIndex] || [];

  return (
    <section
      id="services"
      className="py-20 px-6 sm:px-8 bg-[#f5f2eb] dark:bg-[#0b0c10] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="max-w-2xl mb-12">
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.services.titleStart}
            <span className="text-[#c68a3e]">{t.services.titleHighlight}</span>
            {t.services.titleEnd}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Liste des services */}
          <div
            role="tablist"
            aria-orientation="vertical"
            className="lg:col-span-5 flex flex-col gap-2"
          >
            {services.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-xl
                    border transition-colors duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c68a3e]
                    ${
                      isActive
                        ? "bg-white dark:bg-white/[0.06] border-[#c68a3e]"
                        : "border-transparent hover:bg-white/60 dark:hover:bg-white/[0.03]"
                    }
                  `}
                >
                  <Icon
                    index={index}
                    className={`w-6 h-6 flex-shrink-0 ${
                      isActive ? "text-[#c68a3e]" : "text-neutral-400 dark:text-neutral-500"
                    }`}
                  />
                  <span
                    className={`font-['Space_Grotesk'] text-base font-semibold ${
                      isActive
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Détail du service */}
          <div
            role="tabpanel"
            className="lg:col-span-7 rounded-2xl p-8 sm:p-10 bg-white dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]"
          >
            <Icon index={activeIndex} className="w-9 h-9 text-[#c68a3e]" />

            <h3 className="mt-5 font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              {active.title}
            </h3>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
              {active.desc}
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="text-[#6fb7a8] font-bold leading-5">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="
                inline-block mt-10 px-6 py-3 rounded-full
                text-sm font-semibold text-white bg-[#c68a3e]
                hover:bg-[#a66d2a] transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c68a3e]
              "
            >
              {lang === "fr" ? "Démarrer ce projet" : "Start this project"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}