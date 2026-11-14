import { useLanguage } from "../context/LanguageContext";

/*
 * Icônes animées (SVG sur grille 48 × 48), une par service.
 * Ordre aligné sur translations.js :
 * web, mobile, Odoo, IA, maintenance & réseaux, formations & conseil
 *
 * Le blanc vient de currentColor ; l'orange #F7931E est l'accent du logo.
 * Les animations sont définies dans ICON_STYLES et s'arrêtent si la personne
 * a demandé moins de mouvement (prefers-reduced-motion).
 */
const ORANGE = "#F7931E";

// Développement web : fenêtre de navigateur, chevrons qui respirent, curseur
function WebGlyph() {
  return (
    <g>
      <rect x="6" y="9" width="36" height="30" rx="4" fill="currentColor" fillOpacity=".12" />
      <path d="M6 17h36" />
      <circle cx="11.5" cy="13" r="1.3" fill={ORANGE} stroke="none" />
      <circle cx="16" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="20.5" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <path className="svc-br-l" d="M19 24l-5 4.5 5 4.5" />
      <path className="svc-br-r" d="M29 24l5 4.5-5 4.5" />
      <path className="svc-blink" d="M24 23v11" stroke={ORANGE} />
    </g>
  );
}

// Applications mobiles : téléphone qui se balance, notification qui pulse
function MobileGlyph() {
  return (
    <g>
      <g className="svc-sway">
        <rect x="14" y="5" width="20" height="38" rx="4" fill="currentColor" fillOpacity=".12" />
        <path d="M21 9h6" />
        <path className="svc-shimmer" d="M19 18h10" />
        <path className="svc-shimmer svc-d1" d="M19 24h10" />
        <path className="svc-shimmer svc-d2" d="M19 30h6" />
        <circle cx="24" cy="38.5" r="1.3" fill="currentColor" stroke="none" />
      </g>
      <circle className="svc-ping" cx="36" cy="9" r="3.6" fill={ORANGE} stroke="none" />
    </g>
  );
}

// Odoo (ERP) : quatre modules qui pulsent à tour de rôle
function OdooGlyph() {
  return (
    <g>
      <rect className="svc-pop" x="7" y="7" width="14" height="14" rx="3.5" fill="currentColor" fillOpacity=".12" />
      <rect className="svc-pop svc-d1" x="27" y="7" width="14" height="14" rx="3.5" fill="currentColor" fillOpacity=".12" />
      <rect className="svc-pop svc-d3" x="7" y="27" width="14" height="14" rx="3.5" fill="currentColor" fillOpacity=".12" />
      <rect className="svc-pop svc-d2" x="27" y="27" width="14" height="14" rx="3.5" fill={ORANGE} stroke={ORANGE} fillOpacity=".9" />
    </g>
  );
}

// Intelligence artificielle : grande étincelle et deux petites qui scintillent
function AiGlyph() {
  return (
    <g>
      <path
        className="svc-breathe"
        d="M22 10c0 11 5 16 16 16-11 0-16 5-16 16 0-11-5-16-16-16 11 0 16-5 16-16Z"
        fill="currentColor"
        fillOpacity=".14"
      />
      <path
        className="svc-twinkle"
        d="M37 5c0 4.4 1.6 6 6 6-4.4 0-6 1.6-6 6 0-4.4-1.6-6-6-6 4.4 0 6-1.6 6-6Z"
        fill={ORANGE}
        stroke={ORANGE}
      />
      <path
        className="svc-twinkle svc-d2"
        d="M9 5c0 3 1 4 4 4-3 0-4 1-4 4 0-3-1-4-4-4 3 0 4-1 4-4Z"
        fill="currentColor"
        stroke="none"
      />
    </g>
  );
}

// Maintenance & réseaux : deux engrenages qui tournent en sens inverse
function GearGlyph() {
  return (
    <g>
      <g className="svc-spin">
        <circle cx="20" cy="28" r="11.5" strokeWidth="4" strokeDasharray="3.6 3.6" />
        <circle cx="20" cy="28" r="9" fill="currentColor" fillOpacity=".12" />
        <circle cx="20" cy="28" r="3" />
      </g>
      <g className="svc-spin-r" stroke={ORANGE}>
        <circle cx="35" cy="14" r="6.5" strokeWidth="3" strokeDasharray="2.04 2.04" />
        <circle cx="35" cy="14" r="5" fill={ORANGE} fillOpacity=".2" />
        <circle cx="35" cy="14" r="1.5" fill={ORANGE} />
      </g>
    </g>
  );
}

// Formations & conseil : toque qui flotte, gland qui se balance
function TrainingGlyph() {
  return (
    <g>
      <g className="svc-bob">
        <path d="M24 9 4 19l20 10 20-10L24 9Z" fill="currentColor" fillOpacity=".14" />
        <path d="M12 23.5v9c0 2.5 5.4 5.5 12 5.5s12-3 12-5.5v-9" />
      </g>
      <g className="svc-tassel" stroke={ORANGE}>
        <path d="M40 20v12" />
        <circle cx="40" cy="34" r="2.3" fill={ORANGE} />
      </g>
    </g>
  );
}

const SERVICE_ICONS = [
  WebGlyph,
  MobileGlyph,
  OdooGlyph,
  AiGlyph,
  GearGlyph,
  TrainingGlyph,
];

const ICON_STYLES = `
.svc-ico * { transform-box: fill-box; transform-origin: center; }
.svc-ico .svc-spin   { transform-origin: 20px 28px; transform-box: view-box; }
.svc-ico .svc-spin-r { transform-origin: 35px 14px; transform-box: view-box; }
.svc-ico .svc-tassel { transform-origin: 40px 20px; transform-box: view-box; }

@keyframes svc-br-l { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-2px); } }
@keyframes svc-br-r { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
@keyframes svc-blink { 0%,45% { opacity: 1; } 50%,95% { opacity: 0; } 100% { opacity: 1; } }
@keyframes svc-sway { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
@keyframes svc-shimmer { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
@keyframes svc-ping { 0%,100% { transform: scale(1); } 50% { transform: scale(1.4); } }
@keyframes svc-pop { 0%,100% { transform: scale(1); } 50% { transform: scale(.8); } }
@keyframes svc-twinkle { 0%,100% { transform: scale(.4) rotate(0deg); opacity: .4; } 50% { transform: scale(1.1) rotate(45deg); opacity: 1; } }
@keyframes svc-breathe { 0%,100% { transform: scale(.94); } 50% { transform: scale(1.06); } }
@keyframes svc-spin { to { transform: rotate(360deg); } }
@keyframes svc-spin-r { to { transform: rotate(-360deg); } }
@keyframes svc-tassel { 0%,100% { transform: rotate(14deg); } 50% { transform: rotate(-14deg); } }
@keyframes svc-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }

.svc-ico .svc-br-l    { animation: svc-br-l 2.4s ease-in-out infinite; }
.svc-ico .svc-br-r    { animation: svc-br-r 2.4s ease-in-out infinite; }
.svc-ico .svc-blink   { animation: svc-blink 1.2s steps(1) infinite; }
.svc-ico .svc-sway    { animation: svc-sway 3s ease-in-out infinite; }
.svc-ico .svc-shimmer { animation: svc-shimmer 2s ease-in-out infinite; }
.svc-ico .svc-ping    { animation: svc-ping 1.6s ease-in-out infinite; }
.svc-ico .svc-pop     { animation: svc-pop 3.2s ease-in-out infinite; }
.svc-ico .svc-twinkle { animation: svc-twinkle 2.4s ease-in-out infinite; }
.svc-ico .svc-breathe { animation: svc-breathe 3s ease-in-out infinite; }
.svc-ico .svc-spin    { animation: svc-spin 9s linear infinite; }
.svc-ico .svc-spin-r  { animation: svc-spin-r 5.8s linear infinite; }
.svc-ico .svc-tassel  { animation: svc-tassel 2.2s ease-in-out infinite; }
.svc-ico .svc-bob     { animation: svc-bob 2.6s ease-in-out infinite; }

.svc-ico .svc-d1 { animation-delay: .4s; }
.svc-ico .svc-d2 { animation-delay: .8s; }
.svc-ico .svc-d3 { animation-delay: 1.2s; }

@media (prefers-reduced-motion: reduce) {
  .svc-ico * { animation: none !important; }
}
`;

// Couleur d'accent (bleu du logo), clair / sombre
const ACCENT = "text-[#0b3d91] dark:text-[#5b9bff]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b3d91] dark:focus-visible:outline-[#5b9bff]";

/*
 * Vague de séparation entre la section du dessus et celle-ci.
 * Une seule vague douce, de la couleur exacte du fond de la section : elle
 * monte dans la section précédente (aucun aplat de couleur ajouté).
 * Une bordure blanche (trait seul) suit la courbe du haut de la vague.
 *
 * Réglages :
 *  - WAVE_POINTS : sommets (crêtes / creux) d'UNE période de 1440 ; la forme
 *    se répète à l'identique, ce qui permet la dérive sans coupure.
 *  - WAVE_DRIFT_SECONDS : durée d'un défilement ; mettre 0 pour une vague fixe.
 *  - WAVE_BORDER_WIDTH : épaisseur de la bordure blanche (en px) ; 0 pour la retirer.
 *  - Si un parent de ce composant a "overflow-hidden", la vague (placée au-
 *    dessus de la section) serait coupée : retirez-le sur ce parent.
 */
const WAVE_PERIOD = 1440;
const WAVE_HEIGHT = 120;
const WAVE_DRIFT_SECONDS = 45;
const WAVE_BORDER_WIDTH = 3;

// crête, creux, crête, creux (x, y) : y plus petit = vague plus haute
const WAVE_POINTS = [
  [260, 36],
  [700, 88],
  [1060, 30],
  [1380, 82],
];

// Courbe lisse (tangentes horizontales aux sommets) sur deux périodes + marge.
// Retourne la forme remplie (fond) et la ligne seule (bordure).
function buildWavePath() {
  const pts = [];
  // dernier sommet de la période précédente, pour démarrer avant x = 0
  const last = WAVE_POINTS[WAVE_POINTS.length - 1];
  pts.push([last[0] - WAVE_PERIOD, last[1]]);

  for (let period = 0; period < 2; period += 1) {
    for (const [x, y] of WAVE_POINTS) pts.push([x + period * WAVE_PERIOD, y]);
  }
  // un sommet de plus pour dépasser le bord droit
  pts.push([WAVE_POINTS[0][0] + 2 * WAVE_PERIOD, WAVE_POINTS[0][1]]);

  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i += 1) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const half = (x1 - x0) / 2;
    d += ` C${x0 + half} ${y0} ${x1 - half} ${y1} ${x1} ${y1}`;
  }

  return {
    fill: `${d} V${WAVE_HEIGHT} H${pts[0][0]} Z`, // forme remplie
    line: d, // ligne seule (bordure)
  };
}

const { fill: WAVE_FILL_PATH, line: WAVE_LINE_PATH } = buildWavePath();

const WAVE_STYLES = `
@keyframes svc-wave-x {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
.svc-wave-drift { animation: svc-wave-x ${WAVE_DRIFT_SECONDS}s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .svc-wave-drift { animation: none !important; }
}
`;

function TopWave() {
  return (
    <>
      {WAVE_DRIFT_SECONDS > 0 && <style>{WAVE_STYLES}</style>}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-1px)] z-10 h-12 overflow-hidden sm:h-16 lg:h-24"
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 ${WAVE_PERIOD * 2} ${WAVE_HEIGHT}`}
          preserveAspectRatio="none"
          className={`absolute left-0 top-0 h-full w-[200%] will-change-transform ${
            WAVE_DRIFT_SECONDS > 0 ? "svc-wave-drift" : ""
          }`}
        >
          {/* Remplissage : couleur du fond de la section */}
          <path
            d={WAVE_FILL_PATH}
            className="fill-[#f5f2eb] dark:fill-[#0b0c10]"
          />

          {/* Bordure blanche qui suit la courbe de la vague */}
          {WAVE_BORDER_WIDTH > 0 && (
            <path
              d={WAVE_LINE_PATH}
              fill="none"
              strokeWidth={WAVE_BORDER_WIDTH}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="stroke-white"
            />
          )}
        </svg>
      </div>
    </>
  );
}

function ServiceIcon({ index, className = "" }) {
  const Glyph = SERVICE_ICONS[index];
  if (!Glyph) return null;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`svc-ico ${className}`}
      aria-hidden="true"
    >
      <Glyph />
    </svg>
  );
}

function ServiceCard({ item, index, ctaLabel }) {
  return (
    <li className="group relative mt-10 h-full">
      {/* Fond de la carte, légèrement incliné */}
      <div
        className="absolute inset-0 -skew-y-2 rounded-3xl bg-white shadow-xl shadow-[#0b3d91]/10 ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transition-none dark:bg-white/[0.05] dark:shadow-none dark:ring-white/10"
        aria-hidden="true"
      />

      {/* Pastille d'icône, à cheval sur le haut de la carte */}
      <span
        className="absolute left-1/2 top-0 z-10 flex h-14 w-14 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5b9bff] to-[#0b3d91] text-white shadow-lg shadow-[#0b3d91]/30 transition-transform duration-200 group-hover:-translate-y-[55%] motion-reduce:transition-none"
        aria-hidden="true"
      >
        <ServiceIcon index={index} className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#F7931E]" />
      </span>

      <div className="relative flex h-full flex-col items-center px-5 pb-7 pt-10 text-center sm:px-6 sm:pb-8 sm:pt-12">
        <h3 className="font-['Space_Grotesk'] text-lg font-semibold leading-snug">
          {item.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          {item.desc}
        </p>

        <a
          href="#contact"
          aria-label={`${item.title} : ${ctaLabel}`}
          className={`mt-6 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#0b3d91] to-[#5b9bff] text-white shadow-md shadow-[#0b3d91]/30 transition-transform duration-200 hover:scale-110 motion-reduce:transition-none ${FOCUS}`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </li>
  );
}

export default function Services() {
  const { lang, t } = useLanguage();

  const services = t.services.items || [];
  if (services.length === 0) return null;

  const ctaLabel =
    lang === "fr" ? "Parlons de votre projet" : "Let's discuss your project";

  return (
    <section
      id="services"
      className="relative bg-[#f5f2eb] text-neutral-900 dark:bg-[#0b0c10] dark:text-white"
    >
      <style>{ICON_STYLES}</style>
      <TopWave />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        {/* En-tête */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.services.titleStart}
            <span className={ACCENT}>{t.services.titleHighlight}</span>
            {t.services.titleEnd}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
            {t.services.description}
          </p>
        </div>

        {/* Cartes de services */}
        <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3">
          {services.map((item, index) => (
            <ServiceCard
              key={item.title}
              item={item}
              index={index}
              ctaLabel={ctaLabel}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}