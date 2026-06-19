import React from "react";

export function Trust() {
  return (
    <section className="py-24 bg-canvas">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="font-heading text-3xl text-text-primary mb-2">10k+</h3>
            <p className="font-label text-sm text-text-secondary tracking-widest uppercase">Happy Customers</p>
          </div>
          <div>
            <h3 className="font-heading text-3xl text-text-primary mb-2">100%</h3>
            <p className="font-label text-sm text-text-secondary tracking-widest uppercase">Cruelty Free</p>
          </div>
          <div>
            <h3 className="font-heading text-3xl text-text-primary mb-2">Tested</h3>
            <p className="font-label text-sm text-text-secondary tracking-widest uppercase">Dermatologically</p>
          </div>
          <div>
            <h3 className="font-heading text-3xl text-text-primary mb-2">Indian</h3>
            <p className="font-label text-sm text-text-secondary tracking-widest uppercase">Skin Science</p>
          </div>
        </div>
      </div>
    </section>
  );
}
