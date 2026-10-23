import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

import founder1 from "../assets/adama.jpg";
import founder2 from "../assets/adama.jpg";

// Logos transparents : un pour le mode clair, un pour le mode sombre
import partnerLogoLight from "../assets/cigogne-light.png";
import partnerLogoDark from "../assets/cigogne-dark.png";

const PHOTOS = [founder1, founder2];

const LINKEDIN_URLS = [
  "https://www.linkedin.com/in/adama-kone",
  "https://www.linkedin.com/in/fondateur-2",
];

function initials(name) {
  if (!name) return "ND";

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Photo({ src, name }) {
  const [broken, setBroken] = useState(false);

  if (broken || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-3xl font-bold text-neutral-500 dark:bg-neutral-800">
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setBroken(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}

export default function Team() {
  const { lang, t } = useLanguage();

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const members = t.team.members || [
    {
      name: "Adama KONE",
      role: "Développeur logiciel",
    },
    {
      name: "Mamadou Bakary Coulibaly",
      role: "Ingénieur réseaux et systèmes, designer",
    },
  ];

  // Informations du partenaire depuis translations.js
  const partner = t.partner || {};

  const partnerLabel =
    partner.partnerTag || (lang === "fr" ? "Partenaire" : "Partner");

  const partnerName = partner.name || "Cigogne du Mandé";
  const partnerRole = partner.role || "";
  const partnerUrl = partner.url || ""; // optionnel : lien vers le site du partenaire

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

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

  // Contenu du logo (clair / sombre)
  const logo = (
    <>
      <img
        src={partnerLogoLight}
        alt={`Logo ${partnerName}`}
        loading="lazy"
        className="block h-auto max-h-28 w-auto max-w-[220px] object-contain transition-transform duration-500 group-hover/partner:scale-105 dark:hidden sm:max-h-32 sm:max-w-[260px]"
      />
      <img
        src={partnerLogoDark}
        alt={`Logo ${partnerName}`}
        loading="lazy"
        className="hidden h-auto max-h-28 w-auto max-w-[220px] object-contain transition-transform duration-500 group-hover/partner:scale-105 dark:block sm:max-h-32 sm:max-w-[260px]"
      />
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="bg-[#f5f2eb] px-6 py-20 transition-colors duration-300 dark:bg-[#0c0d12] sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* En-tête de la section */}
        <div className="mx-auto mb-14 max-w-xl text-center">
          <span className="inline-flex items-center gap-2 border border-neutral-300 bg-white/50 px-4 py-1 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:border-neutral-800 dark:bg-white/5 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 bg-[#0B3D91] dark:bg-[#5B9BFF]" />
            {t.team.badge}
          </span>

          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {t.team.titleStart}
            <span className="text-[#0B3D91] dark:text-[#5B9BFF]">{t.team.titleHighlight}</span>
            {t.team.titleEnd}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t.team.description}
          </p>
        </div>

        {/* Membres de l'équipe */}
        <div
          className={`mx-auto grid max-w-2xl grid-cols-1 gap-10 transition-all duration-700 ease-out sm:grid-cols-2 sm:gap-12 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {members.map((member, index) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center"
            >
              <div className="aspect-[4/5] w-full max-w-[260px] overflow-hidden border border-neutral-300/60 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800">
                <Photo src={PHOTOS[index]} name={member.name} />
              </div>

              <h3 className="mt-4 font-['Space_Grotesk'] text-xl font-bold text-neutral-900 dark:text-white">
                {member.name}
              </h3>

              <p className="mt-1 text-xs uppercase tracking-wider text-[#0B3D91] dark:text-[#5B9BFF]">
                {member.role}
              </p>

              <a
                href={LINKEDIN_URLS[index] || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Profil LinkedIn de ${member.name}`}
                className="mt-4 inline-flex items-center gap-2 border border-neutral-300 px-3 py-2 text-xs text-neutral-600 transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2] dark:border-neutral-700 dark:text-neutral-400"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          ))}
        </div>

        {/* Partenaire */}
        <div
          className={`mt-20 transition-all delay-200 duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Titre avec filets */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-neutral-300 dark:bg-neutral-800 sm:w-20" />
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
              <span className="h-1.5 w-1.5 bg-[#0B3D91] dark:bg-[#5B9BFF]" />
              {partnerLabel}
            </span>
            <span className="h-px w-12 bg-neutral-300 dark:bg-neutral-800 sm:w-20" />
          </div>

          {/* Carte partenaire */}
          <div className="group/partner relative mx-auto max-w-2xl overflow-hidden border border-neutral-300/70 bg-white/60 transition-colors duration-300 hover:border-[#0B3D91]/60 dark:border-neutral-800 dark:bg-white/[0.03] dark:hover:border-[#5B9BFF]/50">
            {/* Coins décoratifs */}
            <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#0B3D91] dark:border-[#5B9BFF]" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#0B3D91] dark:border-[#5B9BFF]" />

            {/* Halo discret derrière le logo */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,110,200,0.12),transparent_70%)]" />

            <div className="relative flex flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:gap-10 sm:px-10 sm:text-left">
              {/* Logo */}
              <div className="flex shrink-0 items-center justify-center sm:w-[260px]">
                {partnerUrl ? (
                  <a
                    href={partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={partnerName}
                  >
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </div>

              {/* Séparateur */}
              <span className="h-px w-16 bg-[#0B3D91]/50 dark:bg-[#5B9BFF]/50 sm:h-24 sm:w-px" />

              {/* Texte */}
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <h3 className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {partnerName}
                </h3>

                {partnerRole && (
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {partnerRole}
                  </p>
                )}

                {partnerUrl && (
                  <a
                    href={partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#0B3D91] transition-colors hover:text-[#082d6e] dark:text-[#5B9BFF] dark:hover:text-[#7DB1FF]"
                  >
                    {lang === "fr" ? "Découvrir" : "Discover"}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          <span className="h-px w-8 bg-neutral-300 dark:bg-neutral-800" />
          <span>{t.team.signature || "Nieta Digital"}</span>
          <span className="h-px w-8 bg-neutral-300 dark:bg-neutral-800" />
        </div>
      </div>
    </section>
  );
}