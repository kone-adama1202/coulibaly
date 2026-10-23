import { useLanguage } from "../context/LanguageContext";
import partnerLogo from "../assets/cigogne.png";

export default function Partner() {
  const { t } = useLanguage();
  const p = t.partner;

  return (
    <section
      id="partenaires"
      className="bg-white dark:bg-[#0c0d12] py-12 px-6 text-center"
    >
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
        {p.titleStart}
        <span className="text-[#c68a3e]">{p.titleHighlight}</span>
        {p.titleEnd}
      </h2>

      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 px-6 py-4 transition hover:border-[#c68a3e]/60 hover:shadow-md">
          <img
            src={partnerLogo}
            alt={p.name}
            className="h-16 w-auto object-contain"
          />

          <div className="text-left">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {p.name}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {p.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}