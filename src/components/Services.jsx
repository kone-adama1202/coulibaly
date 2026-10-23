
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Services.css";

const SERVICE_ICONS = [
  // Développement web
  <path key="web" d="M8 9 3 14l5 5M20 9l5 5-5 5M16 6l-4 16" />,

  // Applications mobiles
  <g key="mobile">
    <rect x="8" y="3" width="12" height="22" rx="2.5" />
    <path d="M13 21h2" />
  </g>,

  // Maintenance informatique
  <path
    key="maint"
    d="M18.5 6.5 21.5 9.5 14 17l-4 1 1-4ZM9 19l-4 4M6 20l-2 2"
  />,

  // Réseaux
  <g key="net">
    <circle cx="14" cy="6" r="2.3" />
    <circle cx="6" cy="20" r="2.3" />
    <circle cx="22" cy="20" r="2.3" />
    <path d="M14 8.3V13L7.4 18.2M14 13l6.6 5.2" />
  </g>,

  // Intelligence artificielle
  <g key="ai">
    <path d="M14 3c0 5.5 4.5 10 10 10-5.5 0-10 4.5-10 10 0-5.5-4.5-10-10-10C9.5 13 14 8.5 14 3Z" />
    <path d="M6 4c0 1.5 1.2 2.7 2.7 2.7C7.2 6.7 6 7.9 6 9.4c0-1.5-1.2-2.7-2.7-2.7C4.8 6.7 6 5.5 6 4Z" />
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
      "Diagnostic et dépannage",
      "Sauvegardes et mises à jour",
      "Suivi et assistance technique",
    ],
    [
      "Installation et câblage réseau",
      "Configuration Wi-Fi sécurisée",
      "Serveurs locaux et cloud",
      "Sécurisation des équipements",
    ],
    [
      "Intégration de solutions IA",
      "Automatisation des tâches",
      "Accompagnement des équipes",
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
      "Diagnostics and troubleshooting",
      "Backups and updates",
      "Technical support",
    ],
    [
      "Network installation and cabling",
      "Secure Wi-Fi configuration",
      "Local servers and cloud services",
      "Equipment security",
    ],
    [
      "AI solution integration",
      "Task automation",
      "Team support and training",
    ],
  ],
};

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

  const selectedIndex =
    activeIndex < services.length ? activeIndex : 0;

  const active = services[selectedIndex];

  const languageFeatures =
    SERVICE_FEATURES[lang] || SERVICE_FEATURES.fr;

  const features = languageFeatures[selectedIndex] || [];

  return (
    <section
      id="services"
      className="services-section bg-[#f5f2eb] text-neutral-900 dark:bg-[#0b0c10] dark:text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">

        {/* En-tête */}
        <div className="mb-12 max-w-2xl">
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.services.titleStart}
            <span className="text-[#c68a3e]">
              {t.services.titleHighlight}
            </span>
            {t.services.titleEnd}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
            {t.services.description}
          </p>
        </div>

        {/* Contenu des services */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* Liste simple */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={
              lang === "fr" ? "Nos services" : "Our services"
            }
            className="services-list self-start"
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
                  onClick={() => setActiveIndex(index)}
                  className={`service-tab ${
                    isActive ? "service-tab-active" : ""
                  }`}
                >
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Description du service sélectionné */}
          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${selectedIndex}`}
            className="service-detail min-w-0"
          >
            <Icon
              index={selectedIndex}
              className="h-8 w-8 text-[#c68a3e]"
            />

            <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-semibold leading-snug sm:text-3xl">
              {active.title}
            </h3>

            <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
              {active.desc}
            </p>

            <div className="my-7 border-t border-neutral-300 dark:border-white/15" />

            <h4 className="mb-5 text-sm font-semibold">
              {lang === "fr"
                ? "Nos prestations"
                : "Our services"}
            </h4>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c68a3e]"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="service-cta"
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