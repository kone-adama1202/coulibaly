import { useEffect, useRef, useState } from "react";

// Import des photos des fondateurs (adaptez les chemins)
import founder1 from "../assets/adama.jpg";
import founder2 from "../assets/adama.jpg";

const TEAM = [
  {
    name: "Fondateur 1",
    role: "Cofondateur — Développement",
    photo: founder1,
  },
  {
    name: "Fondateur 2",
    role: "Cofondateur — Design & Mobile",
    photo: founder2,
  },
];

// Fonction pour les initiales (fallback)
function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Composant Photo avec gestion d'erreur
function Photo({ member }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
        <span className="font-display text-4xl font-bold text-slate-300 tracking-wide">
          {initials(member.name)}
        </span>
      </div>
    );
  }

  return (
    <img
      className="w-full h-full object-cover"
      src={member.photo}
      alt={member.name}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}

export default function Team() {
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
      id="equipe"
      className="py-20 px-6 sm:px-8 bg-[#0d0f16]" // fond très sombre
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-slate-400 border border-slate-700 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            L'équipe
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
            Deux jeunes, <span className="text-amber-400">un même objectif</span>.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            Ce projet est né de deux jeunes maliens convaincus que le numérique
            peut changer le quotidien des entreprises et des particuliers au
            Mali. Passionnés de technologie depuis toujours, on a choisi de
            mettre nos compétences au service de projets concrets — avec la
            volonté de livrer un travail sérieux, accessible et durable.
          </p>
        </div>

        {/* Grille des membres — agrandie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className={`
                flex flex-col items-center
                transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              {/* Photo frame agrandie */}
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 shadow-xl border border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-amber-400/50">
                <Photo member={m} />
              </div>

              {/* Légende — couleurs claires */}
              <div className="mt-5 text-center">
                <h3 className="font-display text-xl font-semibold text-white">
                  {m.name}
                </h3>
                <p className="font-mono text-xs tracking-wide text-amber-400">
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}