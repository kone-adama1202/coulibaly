import { useState } from "react";
import partnerLogo from "../assets/cigogne.png"; // adapte le chemin selon ton projet

const PARTNER = {
  name: "Cigogne du mande",
  role: "cyber café et centre de formation",
  logo: partnerLogo,
};

function PartnerLogo({ partner }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <span className="font-display font-bold text-lg text-gray-800 text-center">
        {partner.name}
      </span>
    );
  }

  return (
    <img
      className="max-w-full max-h-full object-contain"
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}

export default function Partner() {
  return (
    <section id="partenaires" className="py-12 px-6 sm:px-8 bg-[#f3efe6]">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-gray-500 border border-gray-300/60 rounded-full px-4 py-1.5 bg-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Partenaire
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-800 mt-3">
            Ils nous font <span className="text-amber-600">confiance</span>.
          </h2>
        </div>

        {/* Carte partenaire */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 bg-white border border-gray-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Logo */}
          <div className="flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center bg-white border border-gray-200/60 rounded-xl p-4">
            <PartnerLogo partner={PARTNER} />
          </div>

          {/* Infos */}
          <div className="text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-600">
              Partenaire
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-800 mt-1">
              {PARTNER.name}
            </h3>
            <p className="text-gray-500 text-sm">{PARTNER.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}