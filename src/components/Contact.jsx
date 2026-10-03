import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const inputClass =
  "w-full text-sm text-neutral-900 dark:text-white bg-white dark:bg-white/[0.04] " +
  "border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 outline-none " +
  "focus:border-[#c68a3e] focus:ring-1 focus:ring-[#c68a3e] transition-colors " +
  "placeholder:text-neutral-400 dark:placeholder:text-neutral-600";

function Field({ id, label, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Coordonnées avec la nouvelle adresse Nieta Digital
  const contactInfo = [
    {
      label: t.contact.infoLabels.email,
      value: "contact@nietadigital.com",
      href: "mailto:contact@nietadigital.com",
    },
    {
      label: t.contact.infoLabels.whatsapp,
      value: "+223 92 39 75 18",
      href: "https://wa.me/22392397518",
    },
    {
      label: t.contact.infoLabels.location,
      value: t.contact.infoLabels.locationValue || "Bamako, Mali",
      href: null,
    },
  ];

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        { publicKey: PUBLIC_KEY }
      );

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Erreur EmailJS:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 sm:px-8 bg-[#f5f2eb] dark:bg-[#0c0d12] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        {/* Coordonnées */}
        <div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.contact.titleStart}
            <span className="text-[#c68a3e]">{t.contact.titleHighlight}</span>
            {t.contact.titleEnd}
          </h2>

          <p className="mt-3 max-w-sm text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {t.contact.description}
          </p>

          <dl className="mt-8 space-y-5">
            {contactInfo.map((info) => (
              <div key={info.label}>
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">
                  {info.label}
                </dt>
                <dd className="mt-0.5 font-['Space_Grotesk'] text-lg font-semibold text-neutral-900 dark:text-white">
                  {info.href ? (
                    <a
                      href={info.href}
                      className="hover:text-[#c68a3e] transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    info.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Formulaire */}
        {status === "sent" ? (
          <div
            role="status"
            className="rounded-2xl p-10 min-h-[320px] flex flex-col items-center justify-center text-center bg-white dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]"
          >
            <span className="text-3xl text-[#6fb7a8]" aria-hidden="true">
              ✓
            </span>
            <h3 className="mt-3 font-['Space_Grotesk'] text-xl font-bold text-neutral-900 dark:text-white">
              {t.contact.form.successTitle}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-neutral-600 dark:text-neutral-400">
              {lang === "fr"
                ? "Merci pour votre message, notre équipe revient vers vous très rapidement."
                : "Thank you for reaching out, our team will get back to you shortly."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 sm:p-8 space-y-5 bg-white dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]"
          >
            <Field id="nd-name" label={t.contact.form.nameLabel}>
              <input
                id="nd-name"
                type="text"
                name="name"
                placeholder={t.contact.form.namePlaceholder}
                value={form.name}
                onChange={handleChange("name")}
                required
                className={inputClass}
              />
            </Field>

            <Field id="nd-email" label={t.contact.form.emailLabel}>
              <input
                id="nd-email"
                type="email"
                name="email"
                placeholder={t.contact.form.emailPlaceholder}
                value={form.email}
                onChange={handleChange("email")}
                required
                className={inputClass}
              />
            </Field>

            <Field id="nd-message" label={t.contact.form.messageLabel}>
              <textarea
                id="nd-message"
                name="message"
                rows={4}
                placeholder={t.contact.form.messagePlaceholder}
                value={form.message}
                onChange={handleChange("message")}
                required
                className={`${inputClass} resize-none`}
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className="
                w-full py-3 px-6 rounded-lg
                text-sm font-semibold text-white bg-[#c68a3e]
                hover:bg-[#a66d2a] transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c68a3e]
                disabled:opacity-60 disabled:pointer-events-none
              "
            >
              {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
            </button>

            {status === "error" && (
              <p role="alert" className="text-sm text-center text-rose-500">
                {t.contact.form.errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}