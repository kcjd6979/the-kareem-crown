/* eslint-disable react/no-unescaped-entities */

// components/ConnectSection.tsx

import { SplineRobot } from './SplineRobot';
import { Github, Linkedin, Mail } from 'lucide-react';

export const ConnectionSection = () => {
  return (
    <section className="connect-section" id="connection">
      <div className="connect-container">

        <h2 className="section-title">Connect with The Architect</h2>
        <p className="section-subtitle">Let's Build the Future Together</p>

        {/* 3D Robot */}
        <div className="connect-robot">
          <SplineRobot />
        </div>

        {/* Social Links */}
        <div className="connect-links">
          <a href="https://github.com/kcjd6979" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={32} />
          </a>
          <a href="https://www.linkedin.com/in/kareem-daniel-a1a397b5/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={32} />
          </a>
          <a href="mailto:your-email@example.com" aria-label="Email">
            <Mail size={32} />
          </a>
        </div>

        <footer className="connect-footer">
          <p>© 2026 Kareem Daniel</p>
          <p>Told by The Forge</p>
        </footer>
      </div>
    </section>
  );
};
