import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Partner from "./components/Partner";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen  font-body">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        {/* <Partner /> */}
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
