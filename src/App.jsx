import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Leadership from "./components/Leadership";
import Achievements from "./components/Achievements";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackgroundField from "./components/BackgroundField";

function App() {
  return (
    <>
      <BackgroundField />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Leadership />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
