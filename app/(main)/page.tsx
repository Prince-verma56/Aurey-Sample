import React from "react";
import { Hero } from "@/components/sections/Hero/Hero";
import { BrandStory } from "@/components/sections/BrandStory/BrandStory";
import { Ingredients } from "@/components/sections/Ingredients/Ingredients";
import { Products } from "@/components/sections/Products/Products";
import { RitualBuilder } from "@/components/sections/RitualBuilder/RitualBuilder";
import { Trust } from "@/components/sections/Trust/Trust";
import { BeforeAfter } from "@/components/sections/BeforeAfter/BeforeAfter";
import { FooterCTA } from "@/components/sections/FooterCTA/FooterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <Ingredients />
      <Products />
      <RitualBuilder />
      <Trust />
      {/* <BeforeAfter /> */}
      <FooterCTA />
    </>
  );
}