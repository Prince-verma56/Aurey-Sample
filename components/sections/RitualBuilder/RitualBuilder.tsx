import React from "react";

export function RitualBuilder() {
  return (
    <section className="section-padding bg-surface-3">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-6xl text-text-primary mb-6">
          Beauty Ritual Builder
        </h2>
        <p className="font-body text-text-secondary mb-12">
          Cleanse &rarr; Treat &rarr; Protect &rarr; Glow
        </p>
        <div className="h-[30vh] flex items-center justify-center border border-dashed border-text-muted">
          <p className="font-label text-text-muted">TODO: Interactive Ritual Steps</p>
        </div>
      </div>
    </section>
  );
}
