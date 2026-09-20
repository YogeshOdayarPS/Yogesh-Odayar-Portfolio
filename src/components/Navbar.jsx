import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navSections, personal } from "../data/content";
import useActiveSection from "../hooks/useActiveSection";
import "./Navbar.css";

const sectionIds = navSections.map((s) => s.id);

export default function Navbar() {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a
          href="#home"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
        >
          Y<span className="gradient-text">.</span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {navSections.map((section) => (
            <button
              key={section.id}
              className={`navbar-link ${active === section.id ? "active" : ""}`}
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
              {active === section.id && <span className="navbar-link-underline" />}
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          <a href={personal.resume} download className="btn btn-secondary navbar-resume">
            Resume
          </a>
          <button
            className="navbar-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar-mobile">
          {navSections.map((section) => (
            <button
              key={section.id}
              className={`navbar-mobile-link ${active === section.id ? "active" : ""}`}
              onClick={() => handleNavClick(section.id)}
            >
              {section.label}
            </button>
          ))}
          <a href={personal.resume} download className="btn btn-primary navbar-mobile-resume">
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
