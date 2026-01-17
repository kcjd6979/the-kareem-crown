/* eslint-disable react/no-unescaped-entities */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SplineParticleBrain } from './SplineParticleBrain';

export const ArchitectSection = () => {
  return (
    <section className="architect-section" id="architect">
      <div className="architect-container">
        <h2 className="section-title">The Architect</h2>

        <div className="architect-grid">
          {/* Left Column: 3D Brain */}
          <motion.div
            className="architect-visual"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <SplineParticleBrain />
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            className="architect-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="architect-text">
              <p>
                &quot;Most companies today see AI as either a confusing threat or a simple toy. I&apos;m the guy who hands them the operating manual. My name is Kareem Daniel, founder of Midas Touch Media.&quot;
              </p>

              <p className="emphasis">
                I&apos;m an AI Systems Architect who doesn&apos;t just use AI, I orchestrate it.
              </p>

              <p>
                &quot;I build the <span className="highlight">proprietary, automated systems</span> that transform that chaos into a strategic weapon. My foundation wasn&apos;t built in a classroom; it was forged in a decade of operational warfare.&quot;
              </p>

              <p>
                &quot;And my future is being honed as a Software Engineering scholarship recipient at the AI-first Maestro University. I&apos;m looking for a place where I can stop just talking about the future of business, and get back to the business of building it.&quot;
              </p>
            </div>

            <div className="architect-ctas">
              <a href="#connection" className="btn-primary">Connect Now</a>
              <a href="#arsenal" className="btn-secondary">View Systems</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
