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
      id="hero"
      className="
        relative overflow-hidden
        flex items-center
        pt-28 sm:pt-32
        pb-32
        px-6 sm:px-8

        bg-gradient-to-br
        from-[#f0ede8]
        via-[#e8e4dc]
        to-[#ddd8cf]

        dark:from-gray-950
        dark:via-gray-900
        dark:to-gray-950

        text-gray-900
        dark:text-gray-100

        transition-colors
        duration-500

        font-sans
      "
    >
      <style>{`
        :root {
          --wd-ink: #1e1b17;
          --wd-amber: #b87c3a;
          --wd-amber-2: #c68a3e;
          --wd-amber-3: #a66d2a;
          --wd-teal: #6fb7a8;
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }

          80% {
            transform: scale(3.2);
            opacity: 0;
          }

          100% {
            transform: scale(3.2);
            opacity: 0;
          }
        }

        .wd-ping {
          animation: ping-slow 2.4s cubic-bezier(0.2, 0.7, 0.4, 1) infinite;
        }

        @keyframes wd-float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        .wd-float {
          animation: wd-float 5s ease-in-out infinite;
        }

        @keyframes wd-scroll-cue {
          0% {
            transform: translateY(0);
            opacity: 0.9;
          }

          60% {
            transform: translateY(9px);
            opacity: 0.2;
          }

          61% {
            transform: translateY(-4px);
            opacity: 0;
          }

          100% {
            transform: translateY(0);
            opacity: 0.9;
          }
        }

        .wd-scroll-cue span {
          animation: wd-scroll-cue 1.8s ease-in-out infinite;
        }

        .wd-cta-primary {
          position: relative;
          overflow: hidden;
        }

        .wd-cta-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255,255,255,0.35) 40%,
            transparent 60%
          );
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }

        .wd-cta-primary:hover::before {
          transform: translateX(120%);
        }

        .wd-cta-primary svg {
          transition: transform 0.3s ease;
        }

        .wd-cta-primary:hover svg {
          transform: translateX(3px);
        }

        .wd-frame {
          background: linear-gradient(
            160deg,
            var(--wd-amber-2),
            var(--wd-teal) 130%
          );
        }

        .wd-dot-grid {
          background-image: radial-gradient(
            rgba(30,27,23,0.09) 1px,
            transparent 1px
          );

          background-size: 22px 22px;

          -webkit-mask-image: radial-gradient(
            ellipse 60% 55% at 78% 45%,
            black 0%,
            transparent 72%
          );

          mask-image: radial-gradient(
            ellipse 60% 55% at 78% 45%,
            black 0%,
            transparent 72%
          );
        }

        .dark .wd-dot-grid {
          background-image: radial-gradient(
            rgba(255,255,255,0.08) 1px,
            transparent 1px
          );
        }
      `}</style>

      {/* Aura décorative */}
      <div
        className="
          absolute
          inset-0
          -z-10

          opacity-100
          dark:opacity-70

          transition-opacity
          duration-500
        "
        style={{
          backgroundImage: `
            radial-gradient(
              42% 40% at 12% 20%,
              rgba(180,150,120,0.15),
              transparent 70%
            ),
            radial-gradient(
              36% 34% at 90% 78%,
              rgba(160,190,180,0.12),
              transparent 70%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Aura supplémentaire mode sombre */}
      <div
        className="
          absolute
          inset-0
          -z-10
          hidden
          dark:block
        "
        style={{
          backgroundImage: `
            radial-gradient(
              35% 35% at 15% 20%,
              rgba(184,124,58,0.10),
              transparent 70%
            ),
            radial-gradient(
              40% 40% at 85% 75%,
              rgba(111,183,168,0.08),
              transparent 70%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Grille */}
      <div
        className="
          wd-dot-grid
          absolute
          inset-0
          -z-10
          opacity-70
          dark:opacity-50
        "
        aria-hidden="true"
      />

      {/* CONTENU */}
      <div
        className="
          relative
          max-w-6xl
          mx-auto
          w-full

          grid
          grid-cols-1
          lg:grid-cols-[1fr_0.7fr]

          gap-10
          items-center
        "
      >
        {/* COLONNE GAUCHE */}
        <div
          className="
            text-center
            lg:text-left

            flex
            flex-col
            items-center
            lg:items-start
          "
        >
          {/* Badge */}
          <span
            className={`
              inline-flex
              items-center
              gap-2

              font-mono
              text-xs
              font-medium
              uppercase
              tracking-widest

              text-[#3d3a35]/70
              dark:text-gray-300/80

              border
              border-[#3d3a35]/20
              dark:border-white/15

              bg-white/20
              dark:bg-white/5

              rounded-full
              px-4
              py-1.5

              backdrop-blur-sm

              transition-all
              duration-700
              ease-out

              ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
            `}
          >
            <span className="relative w-1.5 h-1.5 flex-shrink-0">
              <span className="absolute inset-0 rounded-full bg-[#6fb7a8]" />
              <span className="absolute inset-0 rounded-full bg-[#6fb7a8] wd-ping" />
            </span>

            Studio digital — Bamako, Mali
          </span>

          {/* TITRE */}
          <h1
            className={`
              mt-6
              mb-5

              text-4xl
              sm:text-5xl
              lg:text-6xl

              font-bold
              leading-tight
              tracking-tight

              text-[#1e1b17]
              dark:text-white

              transition-all
              duration-700
              ease-out
              delay-100

              ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
            `}
          >
            On construit{" "}
            <span className="text-[#b87c3a]">
              votre présence
            </span>{" "}
            numérique.
          </h1>

          {/* DESCRIPTION */}
          <p
            className={`
              max-w-md

              text-base

              text-[#3d3a35]/80
              dark:text-gray-300

              leading-relaxed

              transition-all
              duration-700
              ease-out
              delay-200

              ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
            `}
          >
            WorldDigital accompagne particuliers et entreprises
            maliennes dans leurs projets web, mobile et maintenance
            informatique — de l'idée au lancement.
          </p>

          {/* BOUTONS */}
          <div
            className={`
              mt-8

              flex
              flex-wrap
              items-center
              justify-center
              lg:justify-start

              gap-3

              transition-all
              duration-700
              ease-out
              delay-300

              ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
            `}
          >
            {/* CTA principal */}
            <a
              href="#contact"
              className="
                wd-cta-primary

                inline-flex
                items-center
                gap-2

                px-6
                py-3

                rounded-full

                font-semibold
                text-sm

                text-white

                bg-gradient-to-br
                from-[#c68a3e]
                to-[#a66d2a]

                shadow-[0_10px_26px_-12px_rgba(166,109,42,0.5)]

                hover:shadow-[0_16px_32px_-12px_rgba(166,109,42,0.7)]

                hover:-translate-y-0.5

                transition-all
                duration-300
              "
            >
              <span className="relative z-10">
                Discuter de votre projet
              </span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-3.5 h-3.5 relative z-10"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* CTA secondaire */}
            <a
              href="#services"
              className="
                inline-flex
                items-center
                gap-2

                px-6
                py-3

                rounded-full

                font-semibold
                text-sm

                text-[#1e1b17]
                dark:text-white

                border
                border-[#1e1b17]/30
                dark:border-white/25

                bg-white/20
                dark:bg-white/5

                backdrop-blur-sm

                hover:border-[#b87c3a]
                hover:text-[#b87c3a]

                transition-all
                duration-300
              "
            >
              Voir nos services
            </a>
          </div>

          {/* SERVICES */}
          <div
            className={`
              mt-12

              flex
              flex-wrap
              items-center
              justify-center
              lg:justify-start

              gap-6

              font-mono
              text-xs

              text-[#3d3a35]/70
              dark:text-gray-400

              transition-all
              duration-700
              ease-out
              delay-500

              ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
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

        {/* IMAGE */}
        <div
          className={`
            relative
            max-w-sm
            mx-auto
            w-full

            transition-all
            duration-900
            ease-out
            delay-200

            ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }
          `}
        >
          {/* Cadre */}
          <div className="wd-frame rounded-[1.35rem] p-[3px] shadow-xl">
            <div
              className="
                aspect-[3/4]
                rounded-[1.15rem]
                overflow-hidden

                bg-[#ddd8cf]
                dark:bg-gray-800

                relative
                group

                transition-colors
                duration-500
              "
            >
              {imgBroken ? (
                <div
                  className="
                    w-full
                    h-full

                    flex
                    flex-col
                    items-center
                    justify-center

                    gap-2

                    text-[#3d3a35]/60
                    dark:text-gray-400

                    bg-gradient-to-b
                    from-[#ddd8cf]
                    to-[#c8c2b6]

                    dark:from-gray-800
                    dark:to-gray-900
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-8 h-8 opacity-60"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="16"
                      rx="2"
                    />

                    <circle
                      cx="8.5"
                      cy="9.5"
                      r="1.5"
                    />

                    <path d="M21 16l-5.5-5.5a2 2 0 0 0-2.8 0L3 20" />
                  </svg>

                  <span className="font-mono text-xs">
                    Image à venir
                  </span>
                </div>
              ) : (
                <img
                  src={devImage}
                  alt="Équipe WorldDigital au travail"
                  onError={() => setImgBroken(true)}
                  className="
                    w-full
                    h-full
                    object-cover

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:scale-105
                  "
                />
              )}

              {/* Overlay */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/25
                  via-transparent
                  to-transparent

                  dark:from-black/45

                  pointer-events-none

                  transition-opacity
                  duration-500
                "
              />
            </div>
          </div>

          {/* Coins décoratifs */}
          <span
            className="
              absolute
              -top-3
              -left-3

              w-6
              h-6

              border-t-2
              border-l-2

              border-[#b87c3a]/50
              dark:border-[#b87c3a]/70

              rounded-tl-md
            "
            aria-hidden="true"
          />

          <span
            className="
              absolute
              -bottom-3
              -right-3

              w-6
              h-6

              border-b-2
              border-r-2

              border-[#6fb7a8]/50
              dark:border-[#6fb7a8]/70

              rounded-br-md
            "
            aria-hidden="true"
          />

          {/* CARTE FLOTTANTE */}
          <div
            className={`
              wd-float

              absolute
              -bottom-6
              -left-6
              sm:-left-10

              bg-white/90
              dark:bg-gray-900/90

              backdrop-blur-md

              border
              border-[#1e1b17]/8
              dark:border-white/10

              rounded-2xl

              shadow-lg
              dark:shadow-black/30

              px-4
              py-3

              flex
              items-center
              gap-3

              transition-all
              duration-700
              ease-out
              delay-500

              ${
                mounted
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }
            `}
          >
            <span
              className="
                w-9
                h-9

                rounded-full

                bg-gradient-to-br
                from-[#c68a3e]
                to-[#a66d2a]

                flex
                items-center
                justify-center

                text-white
                text-xs
                font-bold

                flex-shrink-0
              "
            >
              WD
            </span>

            <div className="leading-tight">
              <p
                className="
                  font-semibold
                  text-sm

                  text-[#1e1b17]
                  dark:text-white
                "
              >
                2 fondateurs
              </p>

              <p
                className="
                  font-mono
                  text-[11px]

                  text-[#3d3a35]/60
                  dark:text-gray-400
                "
              >
                basés à Bamako
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REPÈRE DE SCROLL */}
      <div
        className={`
          wd-scroll-cue

          absolute
          bottom-8
          left-1/2
          -translate-x-1/2

          hidden
          sm:flex

          flex-col
          items-center
          gap-2

          text-[#3d3a35]/50
          dark:text-gray-400/60

          transition-opacity
          duration-700
          delay-700

          ${
            mounted
              ? "opacity-100"
              : "opacity-0"
          }
        `}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Découvrir
        </span>

        <span
          className="
            w-5
            h-8

            rounded-full

            border
            border-[#3d3a35]/30
            dark:border-white/20

            flex
            justify-center

            pt-1.5
          "
        >
          <span className="w-1 h-1.5 rounded-full bg-[#b87c3a] block" />
        </span>
      </div>
    </section>
  );
}