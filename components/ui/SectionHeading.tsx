import React from "react";

export function SectionHeading({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h2 className={`font-heading text-4xl md:text-6xl text-text-primary ${className || ""}`}>{children}</h2>;
}
