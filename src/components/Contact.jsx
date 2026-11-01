import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/*
  Palette tirée du logo Nieta Digital
  - Bleu marine #0B3D91 (clair) / #5B9BFF (sombre)  : couleur principale
  - Orange #F7931E                                    : accent (carrés du logo)
*/

const fieldClass =
  "w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 " +
  "outline-none transition placeholder:text-neutral-400 " +
  "focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 " +
  "dark:border-neutral-700 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500 " +
  "dark:focus:border-[#5B9BFF] dark:focus:ring-[#5B9BFF]/25";

const labelClass =
  "mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200";

// Cartes de coordonnées, posées sur le panneau bleu
const infoCardClass =
  "flex items-center gap-4 bg-white/10 p-4 transition-colors hover:bg-white/[0.17] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const iconBox =
  "flex h-10 w-10 shrink-0 items-center justify-center bg-white/10 text-white";

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

  const txt = {
    reply:
      c.replyPromise ||
      (fr
        ? "Nous répondons en général sous 24 h."
        : "We usually reply within 24 hours."),
    nameLabel: fr ? "Comment vous appelez-vous ?" : "What's your name?",
    emailLabel: fr ? "Votre adresse e-mail" : "Your email address",
    messageLabel: fr ? "Votre message" : "Your message",
    namePh: fr ? "Votre nom" : "Your name",
    emailPh: fr ? "vous@exemple.com" : "you@example.com",
    messagePh: fr
      ? "Parlez-nous de votre projet, de vos idées ou de vos questions…"
      : "Tell us about your project, your ideas or your questions…",
    submit: c.form?.submit || (fr ? "Envoyer le message" : "Send message"),
    sending: c.form?.sending || (fr ? "Envoi en cours…" : "Sending…"),
    privacy: fr
      ? "Vos informations ne sont utilisées que pour vous répondre."
      : "Your details are only used to reply to you.",
    email: fr ? "Envoyez-nous un e-mail" : "Send us an email",
    whatsapp: fr ? "Écrivez-nous sur WhatsApp" : "Chat with us on WhatsApp",
    location: fr ? "Où nous trouver" : "Where to find us",
  };

  // successMessage peut être une fonction (translations.js) ou une chaîne
  const successTitle =
    c.form?.successTitle || (fr ? "Message envoyé" : "Message sent");

  const successText =
    typeof c.form?.successMessage === "function"
      ? c.form.successMessage(firstName)
      : c.form?.successMessage ||
        (fr
          ? "Votre message nous est bien parvenu. Nous revenons vers vous très vite."
          : "Your message has reached us. We'll get back to you very soon.");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      });
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
      className="bg-[#f5f2eb] px-6 py-20 text-neutral-900 dark:bg-[#0c0d12] dark:text-white sm:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-5 md:gap-0">
        {/* Panneau bleu : accueil + coordonnées */}
        <div className="relative bg-[#0B3D91] p-6 text-white dark:bg-[#12306f] sm:p-8 md:col-span-2 md:p-10">
          {/* Carré orange : clin d'œil au logo */}
          <span
            className="absolute -right-2.5 -top-2.5 h-4 w-4 bg-[#F7931E]"
            aria-hidden="true"
          />

          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl">
            {c.titleStart}
            <span className="text-[#F7931E]">{c.titleHighlight}</span>
            {c.titleEnd}
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/80">
            {c.description}
          </p>

          <p className="mt-5 flex items-center gap-3 text-sm text-white/90">
            <span
              className="h-2 w-2 shrink-0 bg-[#F7931E]"
              aria-hidden="true"
            />
            {txt.reply}
          </p>

          <div className="mt-8 space-y-3">
            <a href="mailto:contact@nietadigital.com" className={infoCardClass}>
              <span className={iconBox}>
                <Icon d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </span>
              <span>
                <span className="block text-xs text-white/70">
                  {txt.email}
                </span>
                <span className="break-all text-sm font-medium">
                  contact@nietadigital.com
                </span>
              </span>
            </a>

            <a
              href="https://wa.me/22392397518"
              target="_blank"
              rel="noopener noreferrer"
              className={infoCardClass}
            >
              <span className={iconBox}>
                <Icon d="M21 11.5a8.4 8.4 0 01-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1121 11.5z" />
              </span>
              <span>
                <span className="block text-xs text-white/70">
                  {txt.whatsapp}
                </span>
                <span className="text-sm font-medium">+223 92 39 75 18</span>
              </span>
            </a>

            <div className="flex items-center gap-4 bg-white/10 p-4">
              <span className={iconBox}>
                <Icon d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </span>
              <span>
                <span className="block text-xs text-white/70">
                  {txt.location}
                </span>
                <span className="text-sm font-medium">
                  {c.infoLabels?.locationValue || "Bamako, Mali"}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04] sm:p-8 md:col-span-3 md:p-10">
          {status === "sent" ? (
            <div
              role="status"
              className="flex min-h-[320px] flex-col items-center justify-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center bg-[#0B3D91] text-white dark:bg-[#5B9BFF] dark:text-[#001a4d]">
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

              <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-semibold">
                {successTitle}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {successText}
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 border-b-2 border-current pb-0.5 text-sm font-semibold text-[#0B3D91] transition-colors hover:text-[#082d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B3D91] dark:text-[#5B9BFF] dark:hover:text-[#7DB1FF] dark:focus-visible:outline-[#5B9BFF]"
              >
                {fr ? "Envoyer un autre message" : "Send another message"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-busy={status === "sending"}
              className="space-y-5"
            >
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  {txt.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
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
                  rows={6}
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
                  className="inline-flex items-center justify-center gap-2 bg-[#0B3D91] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#082d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#5B9BFF] dark:text-[#001a4d] dark:hover:bg-[#7DB1FF] dark:focus-visible:outline-[#5B9BFF]"
                >
                  {status === "sending" ? txt.sending : txt.submit}
                </button>

                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {txt.privacy}
                </p>
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
                >
                  {c.form?.errorMessage ||
                    (fr
                      ? "Une erreur est survenue. Réessayez ou écrivez-nous directement par e-mail."
                      : "Something went wrong. Please try again or email us directly.")}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}