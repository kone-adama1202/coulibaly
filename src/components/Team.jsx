import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

import founder1 from "../assets/adama.png";
import founder2 from "../assets/bakary.png";

// Image de la section Mission (à adapter au nom de votre fichier)
import missionImage from "../assets/mission.jpg";

// Illustration de l'en-tête (équipe autour d'une table)
import teamIllustration from "../assets/team-illustration.png";

// Logos transparents : un pour le mode clair, un pour le mode sombre
import partnerLogoLight from "../assets/cigogne-light.png";
import partnerLogoDark from "../assets/cigogne-dark.png";

const PHOTOS = [founder1, founder2];

const LINKEDIN_URLS = [
  "https://www.linkedin.com/in/adama-kone-7a0240208/",
  "https://www.linkedin.com/in/mamadou-bakary-coulibaly/",
];

/*
  En-tête de la section Équipe.
  Si t.team contient eyebrow / titleStart / titleHighlight / titleEnd,
  ces valeurs remplacent automatiquement les textes ci-dessous.
*/
const HEADER_FALLBACK = {
  fr: {
    eyebrow: "L'équipe",
    titleStart: "Une équipe unie pour ",
    titleHighlight: "votre réussite",
    titleEnd: "",
  },
  en: {
    eyebrow: "The team",
    titleStart: "One united team for ",
    titleHighlight: "your success",
    titleEnd: "",
  },
};



/*
  Textes de la section Mission.
  Si vous ajoutez `mission` dans translations.js (t.team.mission) avec les
  mêmes champs, ils remplaceront ces textes automatiquement.
*/
const MISSION_FALLBACK = {
  fr: {
    title: "Notre mission",
    taglineStart: "Accompagner votre succès ",
    taglineHighlight: "vers demain",
    taglineEnd: ".",
    textStart:
      "Nous créons des solutions innovantes pour faire passer votre entreprise à la ",
    textHighlight: "vitesse supérieure",
    textEnd: ".",
    imageAlt: "Notre équipe accompagne des clients autour d'un ordinateur",
  },
  en: {
    title: "Our mission",
    taglineStart: "Supporting your success ",
    taglineHighlight: "towards tomorrow",
    taglineEnd: ".",
    textStart:
      "We create innovative solutions to take your business to the ",
    textHighlight: "next level",
    textEnd: ".",
    imageAlt: "Our team supporting clients around a laptop",
  },
};

/*
  Palette tirée du logo Nieta Digital
  - Bleu marine  #0B3D91  (clair)  /  #5B9BFF (sombre)
  - Orange       #F7931E  (accent unique : les petits carrés du logo)
*/
const BLUE = "text-[#0B3D91] dark:text-[#5B9BFF]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B3D91] dark:focus-visible:outline-[#5B9BFF]";

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
      <div className="flex h-full w-full items-center justify-center bg-[#dfe7f5] text-3xl font-bold text-[#0B3D91] dark:bg-[#14264d] dark:text-[#5B9BFF]">
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
      className="h-full w-full object-cover"
    />
  );
}

/* Filet horizontal de part et d'autre d'un titre */
function SideRule() {
  return (
    <span
      className="hidden h-px w-10 bg-neutral-300 dark:bg-white/20 sm:block sm:w-14"
      aria-hidden="true"
    />
  );
}

/* Petit séparateur : filet + losange orange (clin d'œil au logo) */
function DiamondDivider({ centered = false }) {
  return (
    <div
      className={`my-6 flex items-center justify-center gap-3 ${
        centered ? "" : "lg:justify-start"
      }`}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-neutral-300 dark:bg-white/20" />
      <span className="h-2 w-2 rotate-45 bg-[#F7931E]" />
      <span className="h-px w-10 bg-neutral-300 dark:bg-white/20" />
    </div>
  );
}

function Mission({ content }) {
  return (
    <div className="mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 dark:bg-white/[0.04] dark:ring-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
        {/* Texte */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 text-center sm:px-10 lg:py-14 lg:text-left">
          <div className="flex items-center justify-center gap-4 lg:justify-start">
            <SideRule />
            <h3 className="font-['Space_Grotesk'] text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className={BLUE}>{content.title}</span>
            </h3>
            <SideRule />
          </div>

          <p className="mt-5 text-lg leading-8 text-neutral-700 dark:text-neutral-200">
            {content.taglineStart}
            <span className={`font-semibold ${BLUE}`}>
              {content.taglineHighlight}
            </span>
            {content.taglineEnd}
          </p>

          <DiamondDivider />

          <p className="mx-auto max-w-sm text-sm leading-7 text-neutral-600 dark:text-neutral-400 lg:mx-0">
            {content.textStart}
            <span className={`font-semibold ${BLUE}`}>
              {content.textHighlight}
            </span>
            {content.textEnd}
          </p>
        </div>

        {/* Image : fondue vers le texte (vers le haut sur mobile, vers la gauche sur grand écran) */}
        <div className="relative min-h-[240px] lg:min-h-[360px]">
          <img
            src={missionImage}
            alt={content.imageAlt}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            className="absolute inset-0 h-full w-full object-cover [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_30%)] [mask-image:linear-gradient(to_bottom,transparent,black_30%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent,black_35%)] lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
          />
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const { lang, t } = useLanguage();

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const members = t.team.members || [];

  // En-tête : translations.js en priorité, sinon textes par défaut
  const header = {
    ...(HEADER_FALLBACK[lang] || HEADER_FALLBACK.fr),
    ...(t.team.eyebrow && { eyebrow: t.team.eyebrow }),
    ...(t.team.titleStart && { titleStart: t.team.titleStart }),
    ...(t.team.titleHighlight && { titleHighlight: t.team.titleHighlight }),
    ...(t.team.titleEnd !== undefined && { titleEnd: t.team.titleEnd }),
  };

  // Section Mission : translations.js en priorité, sinon textes par défaut
  const mission = t.team.mission || MISSION_FALLBACK[lang] || MISSION_FALLBACK.fr;

  // Informations du partenaire depuis translations.js
  const partner = t.partner || {};
  const partnerName = partner.name || "Cigogne du Mandé";
  const partnerRole = partner.role || "";
  const partnerUrl = partner.url || ""; // optionnel : site du partenaire

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

  const logoClasses =
    "h-auto max-h-24 w-auto max-w-[200px] object-contain sm:max-h-28 sm:max-w-[240px]";

  const logo = (
    <>
      <img
        src={partnerLogoLight}
        alt={`Logo ${partnerName}`}
        loading="lazy"
        className={`block dark:hidden ${logoClasses}`}
      />
      <img
        src={partnerLogoDark}
        alt={`Logo ${partnerName}`}
        loading="lazy"
        className={`hidden dark:block ${logoClasses}`}
      />
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="bg-[#f5f2eb] px-6 py-20 text-neutral-900 dark:bg-[#0c0d12] dark:text-white sm:px-8 lg:py-24"
    >
      <div
        className={`mx-auto max-w-6xl transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {/* En-tête */}
        <div className="relative mb-16 flex min-h-[360px] items-center justify-center overflow-hidden py-10 sm:min-h-[440px] sm:py-14">
          {/* Filigrane : illustration d'équipe. Le blanc du PNG disparaît grâce au mode de fusion. */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)]"
            aria-hidden="true"
          >
            <img
              src={teamIllustration}
              alt=""
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className="h-full w-auto max-w-none object-contain opacity-[0.16] mix-blend-multiply dark:opacity-[0.14] dark:mix-blend-screen dark:[filter:invert(1)_hue-rotate(180deg)]"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* Étiquette avec petits carrés orange (clin d'œil au logo) */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-2 w-2 bg-[#F7931E]" aria-hidden="true" />
            <span className={`text-sm font-semibold tracking-wide ${BLUE}`}>
              {header.eyebrow}
            </span>
            <span className="h-2 w-2 bg-[#F7931E]" aria-hidden="true" />
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight sm:text-4xl">
            {header.titleStart}
            <span className={BLUE}>{header.titleHighlight}</span>
            {header.titleEnd}
          </h2>

          <DiamondDivider centered />

          {t.team.description && (
            <p className="mx-auto max-w-xl text-base font-medium leading-8 text-neutral-800 dark:text-neutral-200 sm:text-lg">
              {t.team.description}
            </p>
          )}
          </div>
        </div>

        {/* Membres */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-14">
          {members.map((member, index) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              {/* Photo : décalage bleu + petit carré orange (clin d'œil au logo) */}
              <div className="relative w-full max-w-[260px]">
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#dfe7f5] shadow-[8px_8px_0_0_#0B3D91] dark:bg-[#14264d] dark:shadow-[8px_8px_0_0_#1f4fa3]">
                  <Photo src={PHOTOS[index]} name={member.name} />
                </div>
                <span
                  className="absolute -right-2.5 -top-2.5 h-4 w-4 bg-[#F7931E]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-8 font-['Space_Grotesk'] text-xl font-semibold">
                {member.name.trim()}
              </h3>

              <p className={`mt-1 text-sm font-medium ${BLUE}`}>
                {member.role.trim()}
              </p>

              <a
                href={LINKEDIN_URLS[index] || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  lang === "fr"
                    ? `Profil LinkedIn de ${member.name.trim()}`
                    : `${member.name.trim()} on LinkedIn`
                }
                className={`mt-4 inline-flex items-center gap-2 border-b border-neutral-400 pb-1 text-sm text-neutral-600 transition-colors hover:border-[#0B3D91] hover:text-[#0B3D91] dark:border-neutral-600 dark:text-neutral-400 dark:hover:border-[#5B9BFF] dark:hover:text-[#5B9BFF] ${FOCUS}`}
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        {/* Mission */}
        <Mission content={mission} />

        {/* Partenaire */}
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h3 className="font-['Space_Grotesk'] text-xl font-semibold sm:text-2xl">
            {partner.titleStart}
            <span className={BLUE}>{partner.titleHighlight}</span>
            {partner.titleEnd}
          </h3>

          <div className="mt-6 flex flex-col items-center gap-6 border-l-4 border-[#0B3D91] bg-white p-6 dark:border-[#5B9BFF] dark:bg-white/[0.04] sm:flex-row sm:items-center sm:gap-10 sm:p-8">
            <div className="flex shrink-0 items-center justify-center sm:w-[240px]">
              {partnerUrl ? (
                <a
                  href={partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={partnerName}
                  className={FOCUS}
                >
                  {logo}
                </a>
              ) : (
                logo
              )}
            </div>

            <div className="flex flex-col items-center gap-1.5 sm:items-start sm:text-left">
              <h4 className="font-['Space_Grotesk'] text-lg font-semibold">
                {partnerName}
              </h4>

              {partnerRole && (
                <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {partnerRole}
                </p>
              )}

              {partnerUrl && (
                <a
                  href={partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 w-fit border-b-2 border-current pb-0.5 text-sm font-semibold transition-colors hover:text-[#082d6e] dark:hover:text-[#7DB1FF] ${BLUE} ${FOCUS}`}
                >
                  {lang === "fr" ? "Découvrir le site" : "Visit website"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}