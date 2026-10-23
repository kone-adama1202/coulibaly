
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const inputClass =
  "w-full border border-neutral-300 dark:border-neutral-700 " +
  "bg-transparent px-4 py-3 text-neutral-900 dark:text-white " +
  "outline-none transition-colors focus:border-[#c68a3e] " +
  "placeholder:text-neutral-400";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      });

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
      className="border-t border-neutral-200 bg-[#f5f2eb] px-6 py-16 dark:border-neutral-800 dark:bg-[#0c0d12]"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">

        {/* Coordonnées */}
        <div className="md:border-r md:border-neutral-300 md:pr-10 dark:md:border-neutral-700">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            {c.titleStart}
            <span className="text-[#c68a3e]">{c.titleHighlight}</span>
            {c.titleEnd}
          </h2>

          <p className="mt-4 leading-7 text-neutral-600 dark:text-neutral-400">
            {c.description}
          </p>

          <div className="mt-8 divide-y divide-neutral-300 border-y border-neutral-300 text-neutral-900 dark:divide-neutral-700 dark:border-neutral-700 dark:text-white">
            <p className="py-4">
              <a
                href="mailto:contact@nietadigital.com"
                className="transition-colors hover:text-[#c68a3e]"
              >
                contact@nietadigital.com
              </a>
            </p>

            <p className="py-4">
              <a
                href="https://wa.me/22392397518"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#c68a3e]"
              >
                +223 92 39 75 18
              </a>
            </p>

            <p className="py-4 text-neutral-500 dark:text-neutral-400">
              {c.infoLabels.locationValue || "Bamako, Mali"}
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="border border-neutral-300 p-5 dark:border-neutral-700 sm:p-7">
          {status === "sent" ? (
            <div role="status" className="py-8">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                {c.form.successTitle}
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder={c.form.nameLabel}
                aria-label={c.form.nameLabel}
                value={form.name}
                onChange={handleChange("name")}
                required
                className={inputClass}
              />

              <input
                type="email"
                name="email"
                placeholder={c.form.emailLabel}
                aria-label={c.form.emailLabel}
                value={form.email}
                onChange={handleChange("email")}
                required
                className={inputClass}
              />

              <textarea
                name="message"
                rows={5}
                placeholder={c.form.messageLabel}
                aria-label={c.form.messageLabel}
                value={form.message}
                onChange={handleChange("message")}
                required
                className={`${inputClass} resize-y`}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="border border-[#c68a3e] bg-[#c68a3e] px-6 py-3 font-medium text-white transition-colors hover:bg-[#a66d2a] hover:border-[#a66d2a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? c.form.sending : c.form.submit}
              </button>

              {status === "error" && (
                <p role="alert" className="text-sm text-rose-500">
                  {c.form.errorMessage}
                </p>
              )}
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
