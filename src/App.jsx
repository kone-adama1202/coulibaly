import { useEffect, useState } from "react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Partner from "./components/Partner";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // Récupérer le thème sauvegardé
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Appliquer le thème sur <html>
  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="
        min-h-screen
        font-body
        bg-[#f5f2eb]
        text-gray-800
        dark:bg-gray-950
        dark:text-gray-100
        transition-colors
        duration-300
      "
    >
      <Nav
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        <Hero />
        <Services />

        {/* <Portfolio /> */}
        {/* <Partner /> */}

        <Team />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}