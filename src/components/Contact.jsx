import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const fieldClass =
  "w-full border border-neutral-300 bg-white/70 px-4 py-3 text-sm text-neutral-900 " +
  "outline-none transition-colors placeholder:text-neutral-400 " +
  "focus:border-[#0B3D91] dark:focus:border-[#5B9BFF] focus:bg-white " +
  "dark:border-neutral-700 dark:bg-white/5 dark:text-white dark:focus:bg-white/10";

const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400";

const cardClass =
  "flex items-center gap-4 border border-neutral-300/70 bg-white/60 p-4 " +
  "transition-colors hover:border-[#0B3D91]/60 dark:border-neutral-800 dark:bg-white/[0.03] " +
  "dark:hover:border-[#5B9BFF]/50";

const iconBox =
  "flex h-10 w-10 shrink-0 items-center justify-center border border-[#0B3D91]/40 dark:border-[#5B9BFF]/40 " +
  "text-[#0B3D91] dark:text-[#5B9BFF]";

function Icon({ d }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export default function Contact() {
  const { lang, t } = useLanguage();
  const c = t.contact;
  const fr = lang === "fr";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [firstName, setFirstName] = useState("");

  // Textes "humains" : utilise translations.js si présent, sinon un texte par défaut
  const txt = {
    kicker: c.kicker || (fr ? "Parlons-en" : "Let's talk"),
    reply:
      c.replyPromise ||
      (fr
        ? "Nous répondons en général sous 24 h, par une vraie personne."
        : "We usually reply within 24h, from a real person."),
    nameLabel: fr ? "Comment vous appelez-vous ?" : "What's your name?",
    emailLabel: fr ? "Votre adresse e-mail" : "Your email address",
    messageLabel: fr ? "Dites-nous tout" : "Tell us everything",
    namePh: fr ? "Votre prénom" : "Your first name",
    emailPh: fr ? "vous@exemple.com" : "you@example.com",
    messagePh: fr
      ? "Parlez-nous de votre projet, de vos idées ou de vos questions…"
      : "Tell us about your project, your ideas or your questions…",
    submit: c.form.submit || (fr ? "Envoyer mon message" : "Send my message"),
    sending: c.form.sending || (fr ? "Envoi en cours…" : "Sending…"),
    privacy: fr
      ? "Votre message reste entre nous. Promis."
      : "Your message stays between us. Promise.",
    whatsapp: fr ? "Écrivez-nous sur WhatsApp" : "Chat with us on WhatsApp",
    email: fr ? "Envoyez-nous un e-mail" : "Send us an email",
    location: fr ? "Où nous trouver" : "Where to find us",
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      setFirstName(form.name.trim().split(/\s+/)[0]);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Erreur EmailJS:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#f5f2eb] px-6 py-20 transition-colors duration-300 dark:bg-[#0c0d12]"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-5 md:gap-12">
        {/* Colonne gauche : accueil + coordonnées */}
        <div className="md:col-span-2">
          <span className="inline-flex items-center gap-2 border border-neutral-300 bg-white/50 px-4 py-1 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:border-neutral-800 dark:bg-white/5 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 bg-[#0B3D91] dark:bg-[#5B9BFF]" />
            {txt.kicker}
          </span>

          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            {c.titleStart}
            <span className="text-[#0B3D91] dark:text-[#5B9BFF]">{c.titleHighlight}</span>
            {c.titleEnd}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {c.description}
          </p>

          {/* Promesse de réponse */}
          <p className="mt-5 flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {txt.reply}
          </p>

          {/* Coordonnées */}
          <div className="mt-8 space-y-3">
            <a href="mailto:contact@nietadigital.com" className={cardClass}>
              <span className={iconBox}>
                <Icon d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {txt.email}
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  contact@nietadigital.com
                </span>
              </span>
            </a>

            <a
              href="https://wa.me/22392397518"
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              <span className={iconBox}>
                <Icon d="M21 11.5a8.4 8.4 0 01-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1121 11.5z" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {txt.whatsapp}
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  +223 92 39 75 18
                </span>
              </span>
            </a>

            <div className={cardClass}>
              <span className={iconBox}>
                <Icon d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {txt.location}
                </span>
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  {c.infoLabels?.locationValue || "Bamako, Mali"}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Colonne droite : formulaire */}
        <div className="relative border border-neutral-300/70 bg-white/60 p-6 dark:border-neutral-800 dark:bg-white/[0.03] sm:p-8 md:col-span-3">
          {/* Coins décoratifs */}
          <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#0B3D91] dark:border-[#5B9BFF]" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#0B3D91] dark:border-[#5B9BFF]" />

          {status === "sent" ? (
            <div
              role="status"
              className="flex min-h-[320px] flex-col items-center justify-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center border border-[#0B3D91] dark:border-[#5B9BFF] text-[#0B3D91] dark:text-[#5B9BFF]">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </span>

              <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold text-neutral-900 dark:text-white">
                {fr
                  ? `Merci${firstName ? `, ${firstName}` : ""} !`
                  : `Thank you${firstName ? `, ${firstName}` : ""}!`}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {c.form.successMessage ||
                  (fr
                    ? "Votre message nous est bien parvenu. Nous le lisons avec attention et revenons vers vous très vite."
                    : "Your message has reached us. We'll read it carefully and get back to you very soon.")}
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 border border-[#0B3D91] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#0B3D91] transition-colors hover:bg-[#0B3D91] hover:text-white dark:border-[#5B9BFF] dark:text-[#5B9BFF] dark:hover:bg-[#5B9BFF] dark:hover:text-[#001a4d]"
              >
                {fr ? "Envoyer un autre message" : "Send another message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  {txt.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="given-name"
                  placeholder={txt.namePh}
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  {txt.emailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder={txt.emailPh}
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  {txt.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder={txt.messagePh}
                  value={form.message}
                  onChange={handleChange("message")}
                  required
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 border border-[#0B3D91] bg-[#0B3D91] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#082d6e] hover:bg-[#082d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D91] disabled:opacity-60 dark:border-[#5B9BFF] dark:bg-[#5B9BFF] dark:text-[#001a4d] dark:hover:border-[#7DB1FF] dark:hover:bg-[#7DB1FF] dark:focus-visible:outline-[#5B9BFF]"
                >
                  {status === "sending" ? txt.sending : txt.submit}
                  {status !== "sending" && <span aria-hidden="true">→</span>}
                </button>

                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {txt.privacy}
                </p>
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400"
                >
                  {c.form.errorMessage ||
                    (fr
                      ? "Oups, quelque chose s'est mal passé. Réessayez ou écrivez-nous directement par e-mail."
                      : "Oops, something went wrong. Please try again or email us directly.")}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}