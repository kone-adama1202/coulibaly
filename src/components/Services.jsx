import { ReactNode } from "react";

// Icônes minimalistes (SVG) aux accents dorés
const Icons = {
  web: (
    <svg className="w-5 h-5 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.75v12m-5.25-12h10.5a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V9a2.25 2.25 0 012.25-2.25z" />
    </svg>
  ),
  mobile: (
    <svg className="w-5 h-5 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5h3m-6.75-18h9a1.5 1.5 0 011.5 1.5v16.5a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5V3a1.5 1.5 0 011.5-1.5z" />
    </svg>
  ),
  support: (
    <svg className="w-5 h-5 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  securite: (
    <svg className="w-5 h-5 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
};

const SERVICES = [
  {
    tag: "WEB",
    title: "Développement web",
    desc: "Sites vitrines, plateformes sur mesure et applications web pensées pour vos clients, rapides et faciles à faire évoluer.",
    items: ["Sites vitrines & e-commerce", "Applications web sur mesure", "Refonte de sites existants"],
    icon: Icons.web,
  },
  {
    tag: "MOBILE",
    title: "Développement mobile",
    desc: "Des applications Android et iOS conçues pour fonctionner même avec une connexion instable, un vrai enjeu au Mali.",
    items: ["Applications Android & iOS", "Applications hybrides multiplateformes", "Suivi et mises à jour"],
    icon: Icons.mobile,
  },
  {
    tag: "SUPPORT",
    title: "Maintenance informatique",
    desc: "Un support réactif pour garder vos postes, réseaux et outils en état de marche, sur place ou à distance.",
    items: ["Dépannage sur site & à distance", "Installation et configuration réseau", "Contrats de maintenance mensuels"],
    icon: Icons.support,
  },
  {
    tag: "SÉCURITÉ",
    title: "Cybersécurité",
    desc: "En partenariat avec Cigogne du Mande, nous protégeons vos données et vos systèmes contre les menaces numériques.",
    items: ["Audit de sécurité", "Sécurisation des systèmes", "Sensibilisation des équipes"],
    icon: Icons.securite,
    partner: true,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* En-tête sobre */}
        <div className="max-w-xl mb-16">
          <p className="font-mono text-xs text-amber-400/70 mb-3 tracking-widest">Ce qu'on fait</p>
          <h2 className="font-display text-4xl md:text-5xl text-slate-100 leading-tight">
            Nos services
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Quatre domaines, un seul objectif : que votre activité tourne mieux grâce au digital.
          </p>
        </div>

        {/* Grille de cartes */}
        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-xl border border-slate-700/60 bg-slate-900/50 p-7 transition-all duration-200 hover:border-amber-400/50 hover:bg-slate-900/70"
            >
              {/* Badge partenaire */}
              {s.partner && (
                <div className="absolute -top-3 right-6">
                  
                </div>
              )}

              {/* En-tête : icône + tag */}
              <div className="flex items-center gap-3 mb-5">
                <div className="text-amber-400/80 group-hover:text-amber-400 transition-colors">
                  {s.icon}
                </div>
                <span className="font-mono text-xs tracking-widest text-amber-400/60 group-hover:text-amber-400/90 transition-colors">
                  {s.tag}
                </span>
              </div>

              <h3 className="font-display text-2xl text-slate-100 mb-2 group-hover:text-amber-400 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{s.desc}</p>

              <ul className="space-y-2 mb-6">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    <span className="text-amber-400/70 mt-0.5">→</span>
                    {it}
                  </li>
                ))}
              </ul>

              {/* Lien d'appel sobre */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-amber-400/70 hover:text-amber-400 transition-colors group-hover:gap-3 duration-200"
              >
                En savoir plus
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}