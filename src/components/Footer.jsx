import { personal } from "../data/content";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {personal.name}</p>
        <div className="footer-links">
          <a href={personal.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={personal.emailLink} target="_blank" rel="noopener noreferrer">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
