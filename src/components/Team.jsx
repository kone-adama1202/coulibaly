import { useEffect, useRef, useState } from "react";

// Import des photos des fondateurs
import founder1 from "../assets/adama.jpg";
import founder2 from "../assets/adama.jpg";

const TEAM = [
  {
    name: "Adama KONE",
    role: "developpeur web & mobile",
    photo: founder1,
  },
  {
    name: "Fondateur 2",
    role: "Cofondateur — Design & Mobile",
    photo: founder2,
  },
];

// Fonction pour les initiales
function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Composant Photo
function Photo({ member }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className="
          w-full
          h-full

          flex
          items-center
          justify-center

          bg-gradient-to-br
          from-slate-700
          to-slate-800

          dark:from-gray-800
          dark:to-gray-950
        "
      >
        <span
          className="
            font-display
            text-4xl
            font-bold
            tracking-wide

            text-slate-300
            dark:text-gray-400
          "
        >
          {initials(member.name)}
        </span>
      </div>
    );
  }

  return (
    <img
      className="
        w-full
        h-full
        object-cover

        transition-transform
        duration-700

        group-hover:scale-105
      "
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
      {
        threshold: 0.15,
      }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="
        relative
        overflow-hidden

        py-20
        px-6
        sm:px-8

        bg-[#f3efe6]
        dark:bg-[#0d0f16]

        transition-colors
        duration-500
      "
    >
      {/* Légers effets décoratifs */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none

          opacity-60
          dark:opacity-30
        "
        style={{
          backgroundImage: `
            radial-gradient(
              35% 35% at 15% 20%,
              rgba(184,124,58,0.12),
              transparent 70%
            ),
            radial-gradient(
              35% 35% at 85% 75%,
              rgba(111,183,168,0.10),
              transparent 70%
            )
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">

        {/* EN-TÊTE */}
        <div className="text-center max-w-2xl mx-auto mb-14">

          {/* Badge */}
          <span
            className="
              inline-flex
              items-center
              gap-2

              font-mono
              text-xs
              font-medium
              uppercase
              tracking-widest

              text-gray-500
              dark:text-slate-400

              border
              border-gray-300/60
              dark:border-slate-700

              rounded-full

              px-4
              py-1.5

              bg-white/60
              dark:bg-white/5

              backdrop-blur-sm

              transition-all
              duration-500
            "
          >
            <span
              className="
                w-1.5
                h-1.5

                rounded-full

                bg-teal-500
                dark:bg-teal-400

                shadow-[0_0_10px_rgba(111,183,168,0.5)]
              "
            />

            L'équipe
          </span>

          {/* TITRE */}
          <h2
            className="
              font-display

              text-3xl
              sm:text-4xl

              font-bold
              tracking-tight

              text-gray-800
              dark:text-white

              mt-4

              transition-colors
              duration-500
            "
          >
           
            
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              text-gray-500
              dark:text-slate-400

              text-sm

              leading-relaxed

              mt-2

              transition-colors
              duration-500
            "
          >
            Ce projet est né de deux jeunes maliens convaincus
            que le numérique peut changer le quotidien des
            entreprises et des particuliers au Mali.
            Passionnés de technologie depuis toujours, on a choisi
            de mettre nos compétences au service de projets
            concrets — avec la volonté de livrer un travail sérieux,
            accessible et durable.
          </p>
        </div>

        {/* GRILLE DES MEMBRES */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2

            gap-10

            max-w-3xl
            mx-auto
          "
        >
          {TEAM.map((member, index) => (
            <div
              key={member.name}
              className={`
                flex
                flex-col
                items-center

                transition-all
                duration-700
                ease-out

                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
              style={{
                transitionDelay: visible
                  ? `${index * 100}ms`
                  : "0ms",
              }}
            >
              {/* PHOTO */}
              <div
                className="
                  group

                  w-full
                  aspect-[3/4]

                  rounded-2xl

                  overflow-hidden

                  bg-slate-200
                  dark:bg-slate-800

                  shadow-lg
                  dark:shadow-black/30

                  border

                  border-gray-300/70
                  dark:border-slate-700

                  transition-all
                  duration-500

                  hover:-translate-y-2

                  hover:shadow-2xl

                  hover:border-amber-500/50
                  dark:hover:border-amber-400/50
                "
              >
                <Photo member={member} />
              </div>

              {/* LÉGENDE */}
              <div
                className="
                  mt-5
                  text-center
                "
              >
                <h3
                  className="
                    font-display

                    text-xl

                    font-semibold

                    text-gray-800
                    dark:text-white

                    transition-colors
                    duration-500
                  "
                >
                  {member.name}
                </h3>

                <p
                  className="
                    font-mono

                    text-xs

                    tracking-wide

                    text-amber-600
                    dark:text-amber-400

                    mt-1

                    transition-colors
                    duration-500
                  "
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PETITE LIGNE EN BAS */}
        <div
          className="
            flex
            justify-center

            mt-16
          "
        >
          <div
            className="
              flex
              items-center
              gap-3

              font-mono
              text-[10px]

              uppercase
              tracking-widest

              text-gray-400
              dark:text-slate-600
            "
          >
            <span className="w-10 h-px bg-gray-300 dark:bg-slate-700" />

           SiraSolf

            <span className="w-10 h-px bg-gray-300 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </section>
  );
}