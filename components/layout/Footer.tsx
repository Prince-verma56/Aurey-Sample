import React from "react";

export function Footer() {
  return (
    <footer className="bg-canvas pt-32 pb-16 border-t border-surface-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading text-4xl text-text-primary mb-6">AUREY</h3>
            <p className="font-body text-text-secondary max-w-sm">
              Korean Beauty for Indian Skin. We believe in the power of ritual to transform not just your skin, but your state of mind.
            </p>
          </div>
          <div>
            <h4 className="font-label text-sm uppercase tracking-widest text-text-primary mb-6">Explore</h4>
            <ul className="space-y-4 font-body text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">Shop All</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Ingredients</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Rituals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-sm uppercase tracking-widest text-text-primary mb-6">Support</h4>
            <ul className="space-y-4 font-body text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-surface-3 font-label text-xs uppercase tracking-widest text-text-muted">
          <p>&copy; {new Date().getFullYear()} Aurey Beauty. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-text-secondary transition-colors">Instagram</a>
            <a href="#" className="hover:text-text-secondary transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
