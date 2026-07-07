const NODES = [
  { id: "bamako", label: "Bamako", x: 195, y: 345, hub: true },
  { id: "kayes", label: "Kayes", x: 75, y: 250 },
  { id: "segou", label: "Ségou", x: 275, y: 300 },
  { id: "sikasso", label: "Sikasso", x: 245, y: 400 },
  { id: "mopti", label: "Mopti", x: 345, y: 225 },
  { id: "tombouctou", label: "Tombouctou", x: 335, y: 110 },
  { id: "gao", label: "Gao", x: 465, y: 85 },
];

const HUB = NODES.find((n) => n.hub);
const SPOKES = NODES.filter((n) => !n.hub);

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 bg-slate-950"
    >
      {/* SVG épuré - seulement la carte, sans fioritures */}
      <svg
        viewBox="0 0 600 480"
        className="absolute inset-0 w-full h-full opacity-50"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Lignes simples, pas d'animation */}
        {SPOKES.map((n) => (
          <line
            key={n.id}
            x1={HUB.x}
            y1={HUB.y}
            x2={n.x}
            y2={n.y}
            stroke="#475569"
            strokeWidth="1"
          />
        ))}

        {/* Nœuds secondaires */}
        {SPOKES.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="3" fill="#64748B" />
            <text
              x={n.x + 9}
              y={n.y + 4}
              fontFamily="sans-serif"
              fontSize="10"
              fill="#64748B"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Hub - cercles sans animation */}
        <circle cx={HUB.x} cy={HUB.y} r="6" fill="#0F172A" stroke="#FCD34D" strokeWidth="1.5" />
        <text
          x={HUB.x + 14}
          y={HUB.y + 4}
          fontFamily="sans-serif"
          fontSize="12"
          fontWeight="600"
          fill="#FCD34D"
        >
          {HUB.label}
        </text>
      </svg>

      {/* Dégradé simple pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

      {/* Contenu - sobre et lisible */}
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-amber-400/70 mb-4 tracking-widest">
            BASÉ À BAMAKO
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-100">
            On construit les outils digitaux
            <br />
            <span className="text-amber-400">dont votre activité a besoin.</span>
          </h1>
          <p className="mt-6 text-base text-slate-300 max-w-xl leading-relaxed">
            WorldDigital conçoit des sites web, des applications mobiles et prend en charge
            la maintenance informatique des entreprises maliennes — avec un volet
            cybersécurité assuré aux côtés de notre partenaire Cigogne du Mande.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-amber-400 text-slate-950 font-medium px-6 py-3 hover:bg-amber-300 transition-colors text-sm"
            >
              Discuter de votre projet
            </a>
            <a
              href="#services"
              className="rounded-full border border-slate-700 text-slate-200 font-medium px-6 py-3 hover:border-slate-400 transition-colors text-sm"
            >
              Voir les services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}