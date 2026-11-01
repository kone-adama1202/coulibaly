import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Ordre aligné sur translations.js :
// web, mobile, Odoo, IA, maintenance & réseaux, formations & conseil
const SERVICE_ICONS = [
  // Développement web
  <path key="web" d="M8 9 3 14l5 5M20 9l5 5-5 5M16 6l-4 16" />,

  // Applications mobiles
  <g key="mobile">
    <rect x="8" y="3" width="12" height="22" rx="2.5" />
    <path d="M13 21h2" />
  </g>,

  // Odoo (ERP) : modules
  <g key="odoo">
    <rect x="4" y="4" width="8.5" height="8.5" rx="1.8" />
    <rect x="15.5" y="4" width="8.5" height="8.5" rx="1.8" />
    <rect x="4" y="15.5" width="8.5" height="8.5" rx="1.8" />
    <rect x="15.5" y="15.5" width="8.5" height="8.5" rx="1.8" />
  </g>,

  // Intelligence artificielle
  <g key="ai">
    <path d="M14 3c0 5.5 4.5 10 10 10-5.5 0-10 4.5-10 10 0-5.5-4.5-10-10-10C9.5 13 14 8.5 14 3Z" />
    <path d="M6 4c0 1.5 1.2 2.7 2.7 2.7C7.2 6.7 6 7.9 6 9.4c0-1.5-1.2-2.7-2.7-2.7C4.8 6.7 6 5.5 6 4Z" />
  </g>,

  // Maintenance & réseaux
  <path
    key="maint"
    d="M18.5 6.5 21.5 9.5 14 17l-4 1 1-4ZM9 19l-4 4M6 20l-2 2"
  />,

  // Formations & conseil
  <g key="training">
    <path d="M14 5 2.5 11 14 17l11.5-6L14 5Z" />
    <path d="M7 14v5c0 1.5 3 3 7 3s7-1.5 7-3v-5M25.5 11v6" />
  </g>,
];

const SERVICE_FEATURES = {
  fr: [
    [
      "Sites vitrines et e-commerce",
      "Performance et référencement SEO",
      "Design adapté à chaque écran",
    ],
    [
      "Applications iOS et Android",
      "Fonctionnement hors connexion",
      "Interfaces simples à utiliser",
      "Publication sur les stores",
    ],
    [
      "Déploiement et paramétrage",
      "Ventes, stocks, comptabilité et RH",
      "Personnalisation et modules sur mesure",
      "Reprise de vos données existantes",
    ],
    [
      "Audit et identification des cas d'usage",
      "Intégration de solutions IA",
      "Automatisation des tâches",
    ],
    [
      "Diagnostic, dépannage et contrats de support",
      "Sauvegardes et mises à jour",
      "Réseaux, câblage et Wi-Fi sécurisé",
      "Serveurs locaux et cloud",
    ],
    [
      "Audit digital",
      "Stratégie technologique",
      "Formation de vos équipes aux outils numériques",
    ],
  ],

  en: [
    [
      "Showcase and e-commerce websites",
      "Performance and SEO",
      "Responsive design",
    ],
    [
      "iOS and Android applications",
      "Offline functionality",
      "Simple user interfaces",
      "App store publishing",
    ],
    [
      "Deployment and setup",
      "Sales, inventory, accounting and HR",
      "Customization and tailored modules",
      "Migration of your existing data",
    ],
    [
      "Audit and use-case discovery",
      "AI solution integration",
      "Task automation",
    ],
    [
      "Diagnostics, troubleshooting and support contracts",
      "Backups and updates",
      "Networks, cabling and secure Wi-Fi",
      "Local servers and cloud services",
    ],
    [
      "Digital audit",
      "Technology strategy",
      "Team training on digital tools",
    ],
  ],
};

// Couleur d'accent (bleu du logo), clair / sombre
const ACCENT = "text-[#0b3d91] dark:text-[#5b9bff]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b3d91] dark:focus-visible:outline-[#5b9bff]";

function Icon({ index, className = "" }) {
  const icon = SERVICE_ICONS[index];
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}

export default function Services() {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = t.services.items || [];
  if (services.length === 0) return null;

  const selectedIndex = activeIndex < services.length ? activeIndex : 0;
  const active = services[selectedIndex];

  const languageFeatures = SERVICE_FEATURES[lang] || SERVICE_FEATURES.fr;
  const features = languageFeatures[selectedIndex] || [];

  // Navigation clavier : flèches haut/bas, Début, Fin
  const handleKeyDown = (event) => {
    const last = services.length - 1;
    let next = null;

    if (event.key === "ArrowDown") next = selectedIndex === last ? 0 : selectedIndex + 1;
    if (event.key === "ArrowUp") next = selectedIndex === 0 ? last : selectedIndex - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      setActiveIndex(next);
      document.getElementById(`service-tab-${next}`)?.focus();
    }
  };

  return (
    <section
      id="services"
      className="relative bg-[#f5f2eb] text-neutral-900 dark:bg-[#0b0c10] dark:text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">
        {/* En-tête */}
        <div className="mb-12 max-w-2xl">
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.services.titleStart}
            <span className={ACCENT}>{t.services.titleHighlight}</span>
            {t.services.titleEnd}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
            {t.services.description}
          </p>
        </div>

        {/* Contenu */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Liste des services */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={lang === "fr" ? "Nos services" : "Our services"}
            onKeyDown={handleKeyDown}
            className="self-start border-t border-stone-500/30 dark:border-white/15"
          >
            {services.map((item, index) => {
              const isActive = index === selectedIndex;

              return (
                <button
                  key={item.title}
                  id={`service-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="service-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "flex w-full items-center gap-3 border-b border-l-[3px] border-b-stone-500/30 py-4 pl-3 pr-1 text-left transition-colors duration-150 sm:py-5 sm:pl-3.5",
                    "dark:border-b-white/15",
                    FOCUS,
                    isActive
                      ? "border-l-[#0b3d91] bg-[#0b3d91]/[0.07] font-semibold text-[#0b3d91] dark:border-l-[#5b9bff] dark:bg-[#5b9bff]/10 dark:text-[#5b9bff]"
                      : "border-l-transparent text-stone-600 hover:bg-[#0b3d91]/5 hover:text-[#0b3d91] dark:text-neutral-400 dark:hover:bg-[#5b9bff]/10 dark:hover:text-[#5b9bff]",
                  ].join(" ")}
                >
                  <Icon index={index} className="h-5 w-5 shrink-0" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Détail du service sélectionné */}
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${selectedIndex}`}
            className="min-w-0 pt-1 sm:pt-0 lg:pt-1"
          >
            <Icon index={selectedIndex} className={`h-9 w-9 ${ACCENT}`} />

            <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-semibold leading-snug sm:text-3xl">
              {active.title}
            </h3>

            <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
              {active.desc}
            </p>

            <div className="my-7 border-t border-neutral-300 dark:border-white/15" />

            <h4 className="mb-5 text-sm font-semibold">
              {lang === "fr" ? "Nos prestations" : "What's included"}
            </h4>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b3d91] dark:bg-[#5b9bff]"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={[
                "mt-8 inline-block border-b-2 border-current pb-1 text-sm font-semibold transition-colors",
                ACCENT,
                "hover:text-[#082d6e] dark:hover:text-[#7db1ff]",
                FOCUS,
              ].join(" ")}
            >
              {lang === "fr"
                ? "Parlons de votre projet"
                : "Let's discuss your project"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}