import { useEffect, useState } from "react";
import devImage from "../assets/dev.jpg"; 

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className={`
        relative overflow-hidden flex items-center
        pt-28 sm:pt-32 pb-32 px-6 sm:px-8   /* ← padding-top ajouté ici */
        bg-gradient-to-br from-[#f0ede8] via-[#e8e4dc] to-[#ddd8cf]
        font-sans
      `}
      id="top"
    >
      {/* Aura décorative */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(42% 40% at 12% 20%, rgba(180,150,120,0.15), transparent 70%),
            radial-gradient(36% 34% at 90% 78%, rgba(160,190,180,0.12), transparent 70%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-10 items-center">
        {/* Contenu gauche */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <span
            className={`
              inline-flex items-center gap-2
              font-mono text-xs font-medium uppercase tracking-widest
              text-[#3d3a35]/70 border border-[#3d3a35]/20
              rounded-full px-4 py-1.5
              transition-all duration-700 ease-out
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6fb7a8] shadow-[0_0_0_3px_rgba(111,183,168,0.2)]" />
            Studio digital — Bamako, Mali
          </span>

          <h1
            className={`
              mt-6 mb-5
              text-4xl sm:text-5xl lg:text-6xl
              font-bold leading-tight tracking-tight
              text-[#1e1b17]
              transition-all duration-700 ease-out delay-100
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            On construit <span className="text-[#b87c3a]">votre présence</span> numérique.
          </h1>

          <p
            className={`
              max-w-md text-base text-[#3d3a35]/80 leading-relaxed
              transition-all duration-700 ease-out delay-200
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            WorldDigital accompagne particuliers et entreprises maliennes dans
            leurs projets web, mobile et maintenance informatique — de l'idée
            au lancement.
          </p>

          <div
            className={`
              mt-8 flex flex-wrap items-center gap-3
              transition-all duration-700 ease-out delay-300
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            <a
              href="#contact"
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-full
                font-semibold text-sm
                text-white bg-gradient-to-br from-[#c68a3e] to-[#a66d2a]
                shadow-[0_10px_26px_-12px_rgba(166,109,42,0.5)]
                hover:shadow-[0_16px_32px_-12px_rgba(166,109,42,0.7)]
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              Discuter de votre projet
            </a>
            <a
              href="#services"
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-full
                font-semibold text-sm
                text-[#1e1b17] border border-[#1e1b17]/30
                hover:border-[#b87c3a] hover:text-[#b87c3a]
                transition-all duration-300
              "
            >
              Voir nos services
            </a>
          </div>

          <div
            className={`
              mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6
              font-mono text-xs text-[#3d3a35]/70
              transition-all duration-700 ease-out delay-500
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#b87c3a]" />
              Développement web
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#b87c3a]" />
              Applications mobiles
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#b87c3a]" />
              Maintenance informatique
            </span>
          </div>
        </div>

        {/* Image (taille réduite) */}
        <div
          className={`
            relative max-w-sm mx-auto w-full
            transition-all duration-900 ease-out delay-200
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#1e1b17]/10 bg-[#ddd8cf] shadow-xl">
            {imgBroken ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#3d3a35]/60 bg-gradient-to-b from-[#ddd8cf] to-[#c8c2b6]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-8 h-8 opacity-60"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="8.5" cy="9.5" r="1.5" />
                  <path d="M21 16l-5.5-5.5a2 2 0 0 0-2.8 0L3 20" />
                </svg>
                <span className="font-mono text-xs">Image à venir</span>
              </div>
            ) : (
              <img src={devImage} alt="WorldDigital" onError={() => setImgBroken(true)} />
            )}
          </div>

        
        </div>
      </div>
    </section>
  );
}