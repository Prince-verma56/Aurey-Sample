import React from "react";
// import { motion } from "framer-motion"; // TODO: Implementation

export function AnimatedButton({ children, className }: { children: React.ReactNode, className?: string }) {
  return <button className={className}>{children}</button>;
}
