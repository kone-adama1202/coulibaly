import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const CONTACT_INFO = [
  { label: "Email", value: "contact@worlddigital.ml", href: "mailto:contact@worlddigital.ml" },
  { label: "WhatsApp", value: "+223 00 00 00 00", href: "https://wa.me/22300000000" },
  { label: "Localisation", value: "Bamako, Mali", href: null },
];
// (voir .env.example). Jamais commités dans Git.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.name || !form.email || !form.message) return;
  
    setStatus("sending");
  
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        {
          publicKey: PUBLIC_KEY,
        }
      );
  
      setStatus("sent");
  
      // Recharge la page après 2 secondes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  
    } catch (err) {
      console.error("Erreur EmailJS:", err);
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 px-6 sm:px-8 bg-[#f5f2eb]"
    >
      <div
        className={`
          max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* Colonne gauche : infos de contact */}
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-gray-500 border border-gray-300/60 rounded-full px-4 py-1.5 bg-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Contact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mt-4">
            Discutons de <span className="text-amber-600">votre projet</span>.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm mt-2">
            Une idée, un besoin de maintenance, un projet web ou mobile ?
            Écrivez-nous, on revient vers vous rapidement.
          </p>

          <dl className="mt-8 space-y-5">
            {CONTACT_INFO.map((c) => (
              <div key={c.label} className="pb-4 border-b border-gray-300/40 last:border-0">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
                  {c.label}
                </dt>
                <dd className="font-display font-semibold text-lg text-gray-800 mt-0.5">
                  {c.href ? (
                    <a href={c.href} className="hover:text-amber-600 transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Colonne droite : formulaire */}
        {status === "sent" ? (
          <div className="bg-white rounded-xl border border-gray-200/80 p-8 flex flex-col items-center justify-center min-h-[320px] text-center shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-10 h-10 text-teal-500"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12.5l2.5 2.5L16 9.5" />
            </svg>
            <h3 className="font-display text-xl font-semibold text-gray-800 mt-3">
              Message envoyé
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mt-1">
              Merci {form.name.split(" ")[0]}, on vous répond très vite.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-5"
          >
            <div className="space-y-1.5">
              <label htmlFor="wd-name" className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
                Nom
              </label>
              <input
                id="wd-name"
                type="text"
                name="name"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange("name")}
                required
                className="w-full text-sm text-gray-700 bg-[#f8f6f2] border border-gray-300/60 rounded-lg px-4 py-3 outline-none focus:border-amber-500 transition-colors placeholder:text-gray-400/50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="wd-email" className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
                Email
              </label>
              <input
                id="wd-email"
                type="email"
                name="email"
                placeholder="vous@exemple.com"
                value={form.email}
                onChange={handleChange("email")}
                required
                className="w-full text-sm text-gray-700 bg-[#f8f6f2] border border-gray-300/60 rounded-lg px-4 py-3 outline-none focus:border-amber-500 transition-colors placeholder:text-gray-400/50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="wd-message" className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
                Message
              </label>
              <textarea
                id="wd-message"
                name="message"
                rows={5}
                placeholder="Parlez-nous de votre projet…"
                value={form.message}
                onChange={handleChange("message")}
                required
                className="w-full text-sm text-gray-700 bg-[#f8f6f2] border border-gray-300/60 rounded-lg px-4 py-3 outline-none focus:border-amber-500 transition-colors placeholder:text-gray-400/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-br from-amber-500 to-amber-600 text-white font-semibold text-sm rounded-full px-6 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-4 h-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            {status === "error" && (
              <p className="text-sm text-red-500 text-center">
                Une erreur est survenue. Réessayez ou écrivez-nous directement par email.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}