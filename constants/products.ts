export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string;
  price: string;
  category: string;
  ingredients: string[];
  concerns: string[];
}

const images = [
  "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3685532/pexels-photo-3685532.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/4465829/pexels-photo-4465829.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=800"
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Purifying Rice Wash",
    shortDesc: "Gentle daily cleanser",
    description: "A soft, pH-neutral cream cleanser that gently washes away impurities while restoring essential moisture and leaving a luminous glow.",
    image: images[5], // Using the main hero image which definitely works
    price: "$38.00",
    category: "Cleanse",
    ingredients: ["Rice Water", "Hyaluronic Acid"],
    concerns: ["Dryness", "Dullness"]
  },
  {
    id: "p2",
    name: "Camellia Cleansing Oil",
    shortDesc: "Makeup melting oil",
    description: "A 2-in-1 makeup remover and cleanser formulated with Japanese Camellia Oil to melt away impurities and waterproof makeup.",
    image: images[1],
    price: "$48.00",
    category: "Cleanse",
    ingredients: ["Camellia Oil", "Green Tea"],
    concerns: ["Clogged Pores", "Makeup Removal"]
  },
  {
    id: "p3",
    name: "Gentle Exfoliant",
    shortDesc: "Skin polishing enzyme powder",
    description: "A water-activated exfoliant of nourishing Japanese rice bran that transforms to a creamy foam for smooth, polished skin.",
    image: images[2],
    price: "$65.00",
    category: "Cleanse",
    ingredients: ["Rice Bran", "Papaya Enzymes"],
    concerns: ["Uneven Texture", "Dullness"]
  },
  {
    id: "p4",
    name: "Niacinamide Essence",
    shortDesc: "Brightening & balancing",
    description: "A watery essence formulated with 5% niacinamide to brighten skin tone, refine pores, and balance oil production for a clear complexion.",
    image: images[3],
    price: "$54.00",
    category: "Treat",
    ingredients: ["Niacinamide", "Centella Asiatica"],
    concerns: ["Enlarged Pores", "Pigmentation"]
  },
  {
    id: "p5",
    name: "Ginseng Renewal Serum",
    shortDesc: "Potent anti-aging serum",
    description: "Concentrated Korean ginseng extract helps improve skin elasticity, reduces fine lines, and revitalizes tired skin for a youthful complexion.",
    image: images[4],
    price: "$85.00",
    category: "Treat",
    ingredients: ["Korean Ginseng Root", "Peptides"],
    concerns: ["Fine Lines", "Loss of Firmness"]
  },
  {
    id: "p6",
    name: "Vitamin C Drops",
    shortDesc: "Glow enhancing serum",
    description: "20% pure Vitamin C helps brighten uneven skin tone, fade dark spots, and protect against environmental damage.",
    image: images[0],
    price: "$72.00",
    category: "Treat",
    ingredients: ["Vitamin C", "Ferulic Acid"],
    concerns: ["Dark Spots", "Dullness"]
  },
  {
    id: "p7",
    name: "Silk Peony Cream",
    shortDesc: "Deep hydration moisturizer",
    description: "A rich, melting cream that provides deep hydration and leaves a healthy, glowing finish without feeling heavy or greasy on the skin.",
    image: images[5],
    price: "$65.00",
    category: "Hydrate",
    ingredients: ["Japanese Peony Extract", "Silk Protein"],
    concerns: ["Dryness", "Uneven Texture"]
  },
  {
    id: "p8",
    name: "Dewy Skin Emulsion",
    shortDesc: "Lightweight moisture",
    description: "A sheer, fluid moisturizer that gives skin a fresh, healthy glow while balancing oil production.",
    image: images[1],
    price: "$58.00",
    category: "Hydrate",
    ingredients: ["Squalane", "Algae Extract"],
    concerns: ["Dehydration", "Oiliness"]
  },
  {
    id: "p9",
    name: "Overnight Mask",
    shortDesc: "Intensive recovery",
    description: "An intensive overnight treatment that seals in moisture and active ingredients, revealing plump, rested skin by morning.",
    image: images[2],
    price: "$90.00",
    category: "Hydrate",
    ingredients: ["Ceramides", "Ginseng Root"],
    concerns: ["Severe Dryness", "Fatigue"]
  },
  {
    id: "p10",
    name: "Invisible Mineral Sunscreen",
    shortDesc: "Broad spectrum SPF 50",
    description: "A lightweight, white-cast-free mineral sunscreen that protects against UV rays while priming the skin for flawless makeup application.",
    image: images[3],
    price: "$42.00",
    category: "Protect",
    ingredients: ["Zinc Oxide", "Titanium Dioxide"],
    concerns: ["Sun Protection", "Photoaging"]
  },
  {
    id: "p11",
    name: "Antioxidant Mist",
    shortDesc: "Refreshing protective spray",
    description: "A refreshing mist packed with antioxidants to protect skin from free radicals and provide an instant burst of hydration anytime.",
    image: images[4],
    price: "$35.00",
    category: "Protect",
    ingredients: ["Green Tea", "Rose Water"],
    concerns: ["Environmental Stress", "Dehydration"]
  }
];
