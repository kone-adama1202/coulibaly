
import fond from "../assets/fondateur/fond.jpg";

const FOUNDERS = [
  {
    name: "Adama Kone",
    bio: "Passionné par les technologies web et mobiles, je construis des solutions sur mesure pour les entreprises locales.",
    quote: "« Le digital doit être un levier, pas un obstacle. »",
    photo: fond, 
    linkedin: "#",
  },
  {
    name: "Coulibaly Mamadou",
    bio: "Spécialiste en architecture logicielle et sécurité, je veille à ce que chaque projet soit robuste et évolutif.",
    quote: "« Une bonne application est celle qu’on oublie, tellement elle fonctionne bien. »",
    photo: fond, 
    linkedin: "#",
  },
];


export default function Team() {
  return (
    <section id="equipe" className="relative py-28 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-16">
          <p className="font-mono text-xs text-amber-400/70 mb-3 tracking-widest">
            Qui sommes-nous
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-slate-100 leading-tight">
            Une équipe, deux passionnés
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            WorldDigital est né de la volonté de deux jeunes Maliens de mettre leurs
            compétences techniques au service des entreprises locales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              className="group relative rounded-xl overflow-hidden min-h-[400px] border border-slate-700/60 transition-all duration-300 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10"
            >
              {/* Image en arrière‑plan, couvre toute la carte */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${f.photo})` }}
              />

              {/* Overlay sombre dégradé pour lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30 group-hover:via-slate-950/40 transition-all duration-300" />

              {/* Contenu superposé */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                {/* En-tête : nom + rôle */}
                <div className="mb-4">
                  <h3 className="font-display text-2xl text-slate-100 group-hover:text-amber-400 transition-colors">
                    {f.name}
                  </h3>
                  <p className="font-mono text-xs text-amber-400/80 mt-1 tracking-wider">
                    {f.role}
                  </p>
                </div>

                {/* Citation */}
                <blockquote className="text-sm text-amber-400/70 italic border-l-2 border-amber-400/40 pl-4 mb-3 leading-relaxed">
                  {f.quote}
                </blockquote>

                {/* Biographie */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 max-w-md">
                  {f.bio}
                </p>

                {/* Liens sociaux + localisation */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-600/40">
                  <a
                    href={f.linkedin}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  
                   
                  
                  <span className="flex-1" />
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}