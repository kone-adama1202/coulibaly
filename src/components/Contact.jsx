import { useState } from "react";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const SERVICES = ["Développement web", "Développement mobile", "Maintenance informatique", "Cybersécurité", "Autre"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: SERVICES[0], message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", service: SERVICES[0], message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  // Icônes inline (SVG)
  const icons = {
    name: (
      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    message: (
      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21.75l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-xl mb-12">
          <p className="font-mono text-xs text-amber-400/70 mb-3 tracking-widest">Parlons-en</p>
          <h2 className="font-display text-4xl md:text-5xl text-slate-100 leading-tight">
            Un projet en tête ?
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Décrivez-nous votre besoin, on vous répond rapidement — par email, WhatsApp ou téléphone.
          </p>
        </div>

        {status === "sent" ? (
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-10 text-center transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 text-amber-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="font-display text-2xl text-slate-100 mb-2">Message envoyé ✓</p>
            <p className="text-slate-300 text-sm">
              Merci ! Nous revenons vers vous très rapidement.
            </p>
          </div>
        ) : (
          <>
            <form
              name="contact"
              method="POST"
              data-netlify="true"  
              onSubmit={handleSubmit}
              className="grid sm:grid-cols-2 gap-5 rounded-xl border border-slate-700/60 bg-slate-900/50 p-6 md:p-8"
            >
              {/* Honeypot anti-spam */}
              <p className="hidden">
                <label>
                  Ne pas remplir : <input name="bot-field" onChange={handleChange} />
                </label>
              </p>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 tracking-wider" htmlFor="name">
                  Nom complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icons.name}
                  </div>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900/60 border border-slate-700/60 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    placeholder="Aïcha Traoré"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 tracking-wider" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icons.email}
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900/60 border border-slate-700/60 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 tracking-wider" htmlFor="phone">
                  Téléphone / WhatsApp
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icons.phone}
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900/60 border border-slate-700/60 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    placeholder="+223 70 00 00 00"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 tracking-wider" htmlFor="service">
                  Service concerné
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all appearance-none"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-slate-900">{s}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-mono text-slate-400 tracking-wider" htmlFor="message">
                  Votre message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    {icons.message}
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900/60 border border-slate-700/60 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                    placeholder="Décrivez votre besoin, votre budget approximatif, vos délais..."
                  />
                </div>
              </div>

              <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-950 font-medium px-7 py-3 hover:bg-amber-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le message"
                  )}
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Une erreur est survenue. Réessayez ou contactez-nous directement.
                  </p>
                )}

                <span className="text-sm text-slate-500">ou</span>

                <a
                  href="https://wa.me/22392397518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </form>

            <p className="mt-4 text-center text-xs text-slate-500">
              Nous traitons vos données avec confidentialité. Aucun spam, jamais.
            </p>
          </>
        )}
      </div>
    </section>
  );
}