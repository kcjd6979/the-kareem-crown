// components/ArchitectSection.tsx

import { SplineParticleBrain } from './SplineParticleBrain';

export const ArchitectSection = () => {
  return (
    <section className="architect-section" id="architect">
      <div className="architect-container">

        <h2 className="section-title">Architect</h2>

        {/* TWO-COLUMN GRID */}
        <div className="architect-grid">

          {/* LEFT: Particle Brain */}
          <div className="architect-visual">
            <SplineParticleBrain />
          </div>

          {/* RIGHT: Existing text content */}
          <div className="architect-content">
            <div className="architect-text">
              <p>
                "Most companies today see AI as either a confusing threat
                or a simple toy. I'm the guy who hands them the operating
                manual. My name is Kareem Daniel, founder of
                <span className="highlight">Midas Touch Media</span>.
              </p>

              <p className="emphasis">
                I'm an AI Systems Architect who doesn't just use AI,
                I orchestrate it.
              </p>

              <p>
                I build the proprietary, automated systems that transform
                that chaos into a strategic weapon. My foundation wasn't
                built in a classroom; it was forged in a decade of
                operational warfare. And my future is being honed as a
                Software Engineering scholarship recipient at the AI-first
                Maestro University.
              </p>
            </div>

            {/* CTAs */}
            <div className="architect-ctas">
              <a href="#connection" className="btn-primary">
                Let's Build Together
              </a>
              <a href="/resume.pdf" className="btn-secondary" download>
                Download Resume
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};