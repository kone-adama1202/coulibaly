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

  const reveal = (delay = "") =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }`;

  return (
    <section
      id="hero"
      className="
        relative overflow-hidden isolate
        min-h-screen flex items-center
        pt-32 sm:pt-36 pb-32 px-6 sm:px-10
        bg-gradient-to-br from-[#f0ede8] via-[#e8e4dc] to-[#ddd8cf]
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        text-gray-900 dark:text-gray-100
        transition-colors duration-500 font-sans
      "
    >
      <style>{`
        @keyframes wd-scroll-cue {
          0% { transform: translateY(0); opacity: 0.9; }
          60% { transform: translateY(9px); opacity: 0.2; }
          61% { transform: translateY(-4px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0.9; }
        }
        .wd-scroll-cue span span { animation: wd-scroll-cue 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wd-scroll-cue span span { animation: none; }
        }
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

          {/* Voile mobile */}
          <div className="absolute inset-0 bg-[#f0ede8]/85 dark:bg-gray-950/85 lg:hidden" />

          {/* Fondu gauche → droite (desktop) */}
          <div
            className="
              absolute inset-0 hidden lg:block
              bg-gradient-to-r
              from-[#e8e4dc] via-[#e8e4dc]/75 to-transparent
              dark:from-gray-950 dark:via-gray-950/75 dark:to-gray-950/10
            "
          />

          {/* Fondu bas pour fondre l'image dans la section suivante */}
          <div
            className="
              absolute inset-x-0 bottom-0 h-40
              bg-gradient-to-t
              from-[#ddd8cf] to-transparent
              dark:from-gray-950 dark:to-transparent
            "
          />
        </div>
      )}

      {/* CONTENU */}
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Titre invisible (SEO + lecteurs d'écran) */}
          <h1 className="sr-only">
            {t.hero.titleStart}
            {t.hero.titleHighlight}
            {t.hero.titleEnd}
          </h1>

          {/* Filet décoratif */}
          <span
            className={`block h-1 w-14 rounded-full bg-gradient-to-r from-[#0B3D91] to-[#3B7DE0] dark:from-[#5B9BFF] dark:to-[#9CC3FF] ${reveal()}`}
            aria-hidden="true"
          />

          {/* Accroche principale */}
          <p
            className={`
              mt-6 max-w-xl
              text-xl sm:text-2xl lg:text-[1.75rem]
              font-medium leading-snug tracking-tight
              text-[#1e1b17] dark:text-white
              ${reveal("delay-100")}
            `}
          >
            {t.hero.description}
          </p>

          {/* Boutons */}
          <div
            className={`
              mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4
              ${reveal("delay-200")}
            `}
          >
            <a
              href="#contact"
              className="
                group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                font-semibold text-sm sm:text-base text-white
                bg-gradient-to-br from-[#0B3D91] to-[#082d6e]
                shadow-[0_12px_28px_-12px_rgba(11,61,145,0.6)]
                hover:shadow-[0_18px_36px_-12px_rgba(11,61,145,0.75)]
                hover:-translate-y-0.5 transition-all duration-300
                dark:from-[#5B9BFF] dark:to-[#3B7DE0] dark:text-[#001a4d]
                dark:shadow-[0_12px_28px_-12px_rgba(91,155,255,0.55)]
                dark:hover:shadow-[0_18px_36px_-12px_rgba(91,155,255,0.7)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus-visible:ring-offset-2
                dark:focus-visible:ring-[#5B9BFF] dark:focus-visible:ring-offset-gray-950
              "
            >
              <span>{t.hero.ctaPrimary}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <a
              href="#services"
              className="
                inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                font-semibold text-sm sm:text-base
                text-[#1e1b17] dark:text-white
                border border-[#1e1b17]/25 dark:border-white/25
                bg-white/50 dark:bg-white/5 backdrop-blur-sm
                hover:border-[#0B3D91] hover:text-[#0B3D91] hover:bg-white/80
                dark:hover:border-[#5B9BFF] dark:hover:text-[#5B9BFF] dark:hover:bg-white/10
                transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus-visible:ring-offset-2
                dark:focus-visible:ring-[#5B9BFF] dark:focus-visible:ring-offset-gray-950
              "
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}