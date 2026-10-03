// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Récupérer la langue sauvegardée ou utiliser 'fr' par défaut
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "fr";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang; // Met à jour l'attribut <html lang="...">
  }, [lang]);

  // Objet de traductions pour la langue active
  const t = translations[lang] || translations.fr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personnalisé pour accéder facilement aux traductions
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé dans un LanguageProvider");
  }
  return context;
}