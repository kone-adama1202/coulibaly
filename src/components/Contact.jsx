import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/*
  Palette tirée du logo Nieta Digital
  - Bleu marine #0B3D91 : fond de la section et bouton
  - Orange #F7931E      : accent (carrés du logo)
*/

// Champs : fond clair, texte sombre (la carte reste blanche en mode sombre aussi)
const fieldClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 " +
  "outline-none transition placeholder:text-neutral-400 " +
  "focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20";

const labelClass = "mb-1.5 block text-sm font-medium text-neutral-800";

const infoLinkClass =
  "flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const iconBox =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-white";

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

/* Filet horizontal de part et d'autre du titre */
function SideRule() {
  return (
    <span
      className="hidden h-px flex-1 bg-white/35 sm:block"
      aria-hidden="true"
    />
  );
}

export default function Contact() {
  const { lang, t } = useLanguage();
  const c = t.contact;
  const fr = lang === "fr";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [firstName, setFirstName] = useState("");

  // Délai avant le rechargement automatique (laisse lire le message de succès)
  const RELOAD_DELAY_MS = 3000;

  useEffect(() => {
    if (status !== "sent") return undefined;

    const timer = setTimeout(() => {
      window.location.reload();
    }, RELOAD_DELAY_MS);

    return () => clearTimeout(timer);
  }, [status]);

  const txt = {
    heading: fr
      ? "Prêt à transformer votre entreprise ?"
      : "Ready to transform your business?",
    subheading: fr
      ? "Parlons de votre projet dès aujourd'hui !"
      : "Let's talk about your project today!",
    nameLabel: fr ? "Nom" : "Name",
    emailLabel: fr ? "E-mail" : "Email",
    phoneLabel: fr ? "Téléphone" : "Phone",
    messageLabel: "Message",
    submit: c.form?.submit || (fr ? "Envoyer" : "Send"),
    sending: c.form?.sending || (fr ? "Envoi en cours…" : "Sending…"),
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
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Erreur EmailJS:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-[#0B3D91] to-[#12306f] px-6 py-20 text-white dark:from-[#0f2a63] dark:to-[#0a1b42] sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        {/* Titre centré, filets de chaque côté */}
        <div className="mb-12 flex items-center gap-4 sm:gap-6">
          <SideRule />
          <h2 className="mx-auto font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:mx-0 sm:text-4xl">
            {c.titleStart}
            <span className="text-[#F7931E]">{c.titleHighlight}</span>
            {c.titleEnd}
          </h2>
          <SideRule />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Texte d'accueil */}
          <div>
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold leading-snug sm:text-2xl">
              {txt.heading}
            </h3>

            <div
              className="mt-3 h-px w-full max-w-sm bg-gradient-to-r from-[#F7931E] via-white/40 to-transparent"
              aria-hidden="true"
            />

            <p className="mt-4 text-sm leading-6 text-white/85">
              {txt.subheading}
            </p>

            {/* Coordonnées */}
            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href="https://wa.me/22392397518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={infoLinkClass}
                >
                  <span className={iconBox}>
                    <Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                  </span>
                  <span>+223 92 39 75 18</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:contact@nietadigital.com"
                  className={infoLinkClass}
                >
                  <span className={iconBox}>
                    <Icon d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                  </span>
                  <span className="break-all">contact@nietadigital.com</span>
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-white/90">
                <span className={iconBox}>
                  <Icon d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                </span>
                <span>{c.infoLabels?.locationValue || "Bamako, Mali"}</span>
              </li>
            </ul>
          </div>

          {/* Carte du formulaire */}
          <div className="rounded-xl bg-white p-6 text-neutral-900 shadow-2xl shadow-black/25 sm:p-8">
            {status === "sent" ? (
              <div
                role="status"
                className="flex min-h-[300px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B3D91] text-white">
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

                <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600">
                  {successText}
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 border-b-2 border-current pb-0.5 text-sm font-semibold text-[#0B3D91] transition-colors hover:text-[#082d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B3D91]"
                >
                  {fr ? "Envoyer un autre message" : "Send another message"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-busy={status === "sending"}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    {txt.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
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
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    {txt.phoneLabel}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    {txt.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange("message")}
                    required
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p
                    role="alert"
                    className="rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                  >
                    {c.form?.errorMessage ||
                      (fr
                        ? "Une erreur est survenue. Réessayez ou écrivez-nous directement par e-mail."
                        : "Something went wrong. Please try again or email us directly.")}
                  </p>
                )}

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-md bg-[#0B3D91] px-7 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#0B3D91]/30 transition-colors hover:bg-[#082d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D91] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? txt.sending : txt.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}