const PROJECTS = [
  {
    title: "À venir : votre projet ici",
    desc: "Nous démarrons tout juste WorldDigital — vos futurs projets prendront place ici, avec captures d'écran et résultats concrets.",
    tag: "Bientôt",
    placeholder: true,
  },
  {
    title: "Site vitrine — exemple",
    desc: "Un exemple de rendu que nous pouvons livrer : présentation d'activité, formulaire de contact, hébergement gratuit inclus.",
    tag: "Démo",
    placeholder: false,
  },
  {
    title: "Application mobile — exemple",
    desc: "Un aperçu du type d'application mobile que nous développons pour la gestion d'activité ou la relation client.",
    tag: "Démo",
    placeholder: false,
  },
];

// Icône par défaut pour les projets (modifiable)
const ProjectIcon = () => (
  <svg className="w-8 h-8 text-amber-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export default function Portfolio() {
  return (
    <section id="realisations" className="relative py-28 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="font-mono text-xs text-amber-400/70 mb-3 tracking-widest">Nos réalisations</p>
         
          <p className="mt-4 text-slate-300 text-lg">
            Jeune structure, ambition claire. Voici le type de projets que nous livrons —
            cette section s'enrichira au fil de nos collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className={`
                group relative rounded-xl border p-7 flex flex-col justify-between min-h-[240px] transition-all duration-200
                ${p.placeholder
                  ? 'border-dashed border-slate-700/40 bg-slate-900/30 hover:border-amber-400/30'
                  : 'border border-slate-700/60 bg-slate-900/50 hover:border-amber-400/50 hover:bg-slate-900/70'
                }
              `}
            >
              {/* Icône ou placeholder visuel */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-amber-400/10 transition-colors">
                  <ProjectIcon />
                </div>
                <span className={`
                  font-mono text-[11px] tracking-wider px-3 py-0.5 rounded-full
                  ${p.placeholder
                    ? 'text-amber-400/60 border border-amber-400/20 bg-amber-400/5'
                    : 'text-slate-400 border border-slate-600/40 bg-slate-800/30'
                  }
                `}>
                  {p.tag}
                </span>
              </div>

              <div>
                <h3 className={`
                  font-display text-xl mb-2 transition-colors
                  ${p.placeholder
                    ? 'text-slate-400 group-hover:text-amber-400/70'
                    : 'text-slate-100 group-hover:text-amber-400'
                  }
                `}>
                  {p.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {p.desc}
                </p>
              </div>

              {/* Lien "Voir le projet" (pour les démos, on peut le rendre actif plus tard) */}
              <div className="mt-5 pt-4 border-t border-slate-700/30">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-400/60 hover:text-amber-400 transition-colors group-hover:gap-3 duration-200"
                >
                  {p.placeholder ? 'Prochainement' : 'En savoir plus'}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </div>

              {/* Effet de lueur subtil au survol */}
              <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}