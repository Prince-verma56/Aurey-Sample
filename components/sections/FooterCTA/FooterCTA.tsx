import React from "react";

export function FooterCTA() {
  return (
    <section className="section-padding bg-text-primary text-canvas">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-5xl md:text-8xl mb-12 max-w-4xl mx-auto leading-tight">
          Your Skin Deserves Ritual, <br />
          <span className="italic text-champagne">Not Routine.</span>
        </h2>
        {/* TODO: Add AnimatedButton */}
        <button className="px-10 py-5 bg-champagne text-text-primary font-label uppercase tracking-widest text-sm hover:bg-white transition-colors">
          Shop The Collection
        </button>
      </div>
    </section>
  );
}
