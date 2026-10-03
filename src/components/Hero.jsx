import { useEffect, useState } from "react";
import devImage from "../assets/dev.jpg";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reveal = (delay) =>
    `transition-all duration-700 ease-out ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
    }`;

  return (
    <section
      id="hero"
      className="
        relative overflow-hidden isolate
        min-h-screen flex items-center
        pt-28 sm:pt-32 pb-28 px-6 sm:px-8
        bg-gradient-to-br from-[#f0ede8] via-[#e8e4dc] to-[#ddd8cf]
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        text-gray-900 dark:text-gray-100
        transition-colors duration-500 font-sans
      "
    >
      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(3.2); opacity: 0; }
        }
        .wd-ping { animation: ping-slow 2.4s cubic-bezier(0.2, 0.7, 0.4, 1) infinite; }

        @keyframes wd-scroll-cue {
          0% { transform: translateY(0); opacity: 0.9; }
          60% { transform: translateY(9px); opacity: 0.2; }
          61% { transform: translateY(-4px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0.9; }
        }
        .wd-scroll-cue span span { animation: wd-scroll-cue 1.8s ease-in-out infinite; }
      `}</style>

      {/* IMAGE EN ARRIÈRE-PLAN (À DROITE) */}
      {!imgBroken && (
        <div
          className={`
            absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]
            transition-opacity duration-1000 ease-out
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
          aria-hidden="true"
        >
          <img
            src={devImage}
            alt={t.hero.imageAlt}
            onError={() => setImgBroken(true)}
            className="w-full h-full object-cover object-center"
          />

          {/* Voile pour la lisibilité du texte (mobile : sur toute l'image) */}
          <div className="absolute inset-0 bg-[#f0ede8]/80 dark:bg-gray-950/80 lg:hidden" />

          {/* Fondu de gauche à droite (desktop) */}
          <div
            className="
              absolute inset-0 hidden lg:block
              bg-gradient-to-r
              from-[#e8e4dc] via-[#e8e4dc]/70 to-transparent
              dark:from-gray-950 dark:via-gray-950/70 dark:to-gray-950/10
            "
          />
        </div>
      )}

      {/* CONTENU (AU-DESSUS DE L'IMAGE) */}
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Badge */}
          <span
            className={`
              inline-flex items-center gap-2
              font-mono text-xs font-medium uppercase tracking-widest
              text-[#3d3a35]/80 dark:text-gray-300/80
              border border-[#3d3a35]/20 dark:border-white/15
              bg-white/40 dark:bg-white/5 backdrop-blur-sm
              rounded-full px-4 py-1.5
              ${reveal("")}
            `}
          >
            <span className="relative w-1.5 h-1.5 flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-[#6fb7a8]" />
              <span className="absolute inset-0 rounded-full bg-[#6fb7a8] wd-ping" />
            </span>
            {t.hero.badge}
          </span>

          {/* Titre */}
          <h1
            className={`
              mt-6 mb-5
              text-4xl sm:text-5xl lg:text-6xl
              font-bold leading-tight tracking-tight
              text-[#1e1b17] dark:text-white
              ${reveal("delay-100")}
            `}
          >
            {t.hero.titleStart}
            <span className="text-[#b87c3a]">{t.hero.titleHighlight}</span>
            {t.hero.titleEnd}
          </h1>

          {/* Description */}
          <p
            className={`
              max-w-md text-base leading-relaxed
              text-[#3d3a35] dark:text-gray-300
              ${reveal("delay-200")}
            `}
          >
            {t.hero.description}
          </p>

          {/* Boutons */}
          <div
            className={`
              mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3
              ${reveal("delay-300")}
            `}
          >
            <a
              href="#contact"
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-full
                font-semibold text-sm text-white
                bg-gradient-to-br from-[#c68a3e] to-[#a66d2a]
                shadow-[0_10px_26px_-12px_rgba(166,109,42,0.5)]
                hover:shadow-[0_16px_32px_-12px_rgba(166,109,42,0.7)]
                hover:-translate-y-0.5 transition-all duration-300
              "
            >
              <span>{t.hero.ctaPrimary}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <a
              href="#services"
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-full
                font-semibold text-sm
                text-[#1e1b17] dark:text-white
                border border-[#1e1b17]/30 dark:border-white/25
                bg-white/40 dark:bg-white/5 backdrop-blur-sm
                hover:border-[#b87c3a] hover:text-[#b87c3a]
                transition-all duration-300
              "
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* Domaines */}
          <div
            className={`
              mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2
              font-mono text-xs text-[#3d3a35]/80 dark:text-gray-400
              ${reveal("delay-500")}
            `}
          >
            {t.hero.features.map((feature) => (
              <span key={feature} className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#b87c3a]" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Repère de scroll */}
      <div
        className={`
          wd-scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2
          hidden sm:flex flex-col items-center gap-2
          text-[#3d3a35]/60 dark:text-gray-400/70
          transition-opacity duration-700 delay-700
          ${mounted ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          {t.hero.scrollCue}
        </span>
        <span className="w-5 h-8 rounded-full border border-[#3d3a35]/30 dark:border-white/20 flex justify-center pt-1.5">
          <span className="w-1 h-1.5 rounded-full bg-[#b87c3a] block" />
        </span>
      </div>
    </section>
  );
}