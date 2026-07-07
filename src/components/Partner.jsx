// Données des partenaires (à compléter avec tes images)
const PARTNERS = [
  {
    name: "Cigogne du Mande",
    logo: "../assets/partenaires/image.png", // ← chemin vers le logo
    url: "https://cigognedumande.com",       // lien optionnel
  },
  // Ajoute d’autres partenaires ici
  // {
  //   name: "Partenaire 2",
  //   logo: "/assets/partenaires/partenaire2.png",
  //   url: "#",
  // },
];

export default function Partner() {
  return (
    <section id="partenaire" className="relative py-28 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Carte avec dégradé et bordure distinctive */}
        <div className="relative rounded-2xl border border-amber-400/20 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-slate-900/80 p-8 md:p-12 shadow-2xl shadow-amber-400/5 overflow-hidden">
          
          {/* Badge "Partenaire" en haut à droite */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/10 text-amber-400 text-[11px] font-mono tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Partenaire
            </span>
          </div>

          {/* Contenu : texte + logos */}
          <div className="text-center">
            <p className="font-mono text-xs text-amber-400/70 mb-3 tracking-widest">
              Ils nous font confiance
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-slate-100 leading-tight mb-4">
              Nos partenaires
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-10">
              Nous collaborons avec des acteurs de confiance pour vous offrir des solutions complètes et sécurisées.
            </p>

            {/* Logos horizontalement */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {PARTNERS.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-slate-800/50 border border-slate-700/60 group-hover:border-amber-400/40 flex items-center justify-center p-4 transition-colors">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-slate-500 font-display text-lg">{partner.name}</span>
                    )}
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-amber-400 transition-colors">
                    {partner.name}
                  </span>
                </a>
              ))}
            </div>

            {PARTNERS.length === 0 && (
              <p className="text-slate-400 text-sm italic">
                Aucun partenaire pour le moment. Revenez bientôt !
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}