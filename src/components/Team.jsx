import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Photos des fondateurs
import founder1 from "../assets/adama.jpg";
import founder2 from "../assets/adama.jpg";

const PHOTOS = [founder1, founder2];

// Liens LinkedIn de chaque fondateur (à personnaliser avec vos vrais liens)
const LINKEDIN_URLS = [
  "https://www.linkedin.com/in/adama-kone", // Lien Adama KONE
  "https://www.linkedin.com/in/fondateur-2", // Lien Fondateur 2
];

// Initiales de secours si la photo ne charge pas
function initials(name) {
  if (!name) return "WD";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Photo({ src, name }) {
  const [broken, setBroken] = useState(false);

  if (broken || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-bold text-3xl">
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
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function Team() {
  const { t } = useLanguage();
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

  const members = t.team.members || [
    { name: "Adama KONE", role: "Développeur logiciel" },
    { name: "Fondateur 2", role: "Cofondateur — Design & Mobile" },
  ];

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="py-20 px-6 sm:px-8 bg-[#f5f2eb] dark:bg-[#0c0d12] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        {/* EN-TÊTE SOBRE */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800 rounded-full px-4 py-1 bg-white/50 dark:bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6fb7a8]" />
            {t.team.badge}
          </span>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mt-4">
            {t.team.titleStart}
            <span className="text-[#c68a3e]">{t.team.titleHighlight}</span>
            {t.team.titleEnd}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t.team.description}
          </p>
        </div>

        {/* GRILLE SIMPLE ET ÉPURÉE (2 COLONNES) */}
        <div
          className={`
            grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-2xl mx-auto
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {members.map((member, index) => (
            <div
              key={member.name}
              className="group flex flex-col items-center text-center"
            >
              {/* Photo sobre avec coins arrondis */}
              <div className="w-full max-w-[260px] aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-sm border border-neutral-300/40 dark:border-neutral-800">
                <Photo src={PHOTOS[index]} name={member.name} />
              </div>

              {/* Nom & Rôle */}
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-neutral-900 dark:text-white mt-4">
                {member.name}
              </h3>

              <p className="text-xs font-mono uppercase tracking-wider text-[#c68a3e] mt-1">
                {member.role}
              </p>

              {/* BOUTON LIEN LINKEDIN DISCRET & ÉLÉGANT */}
              <a
                href={LINKEDIN_URLS[index] || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Profil LinkedIn de ${member.name}`}
                className="
                  mt-3
                  inline-flex items-center gap-1.5
                  px-3.5 py-1.5
                  rounded-full
                  text-xs font-medium
                  text-neutral-600 dark:text-neutral-400
                  bg-white/80 dark:bg-neutral-800/80
                  border border-neutral-300/70 dark:border-neutral-700/60
                  hover:text-[#0a66c2] hover:border-[#0a66c2]/50
                  dark:hover:text-[#0a66c2] dark:hover:border-[#0a66c2]/50
                  hover:scale-105
                  transition-all duration-200
                  shadow-xs
                "
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
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

        {/* PETITE LIGNE DE SIGNATURE DISCRÈTE */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
            <span className="w-8 h-px bg-neutral-300 dark:bg-neutral-800" />
            <span>{t.team.signature || "SiraSolf"}</span>
            <span className="w-8 h-px bg-neutral-300 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    </section>
  );
}