export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  badge?: string;
  rating?: number;
  formula: string; // floating glassmorphism mini-badge text
  row: 1 | 2;
  accentColor: string;
}

export const products: Product[] = [
  // ── ROW 1 ──────────────────────────────────────────────────────────
  {
    id: "p1",
    title: "Rice Water Radiance Serum",
    subtitle: "Brightening & Pore-Minimising",
    price: 1299,
    originalPrice: 1799,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781884995/a1bf4ddf-488d-4d7e-90ef-dd241d9587c8_no3t8e.png",
    badge: "BESTSELLER",
    rating: 4.8,
    formula: "ACTIVE FORMULA",
    row: 1,
    accentColor: "#D9B98E",
  },
  {
    id: "p2",
    title: "Ginseng Revival Cream",
    subtitle: "Deep Nourishment & Firming",
    price: 1599,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781884920/1ae1ff37-ef53-41fe-9fa9-da66d594ebde_gaoyme.png",
    badge: "NEW",
    rating: 4.6,
    formula: "VEGAN",
    row: 1,
    accentColor: "#A8B3A1",
  },
  {
    id: "p3",
    title: "Fermented Barrier Essence",
    subtitle: "Microbiome-Balanced Hydration",
    price: 1099,
    originalPrice: 1399,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781883717/425f1dac-494d-439d-bd23-9be06013beaf_wzutyt.png",
    rating: 4.7,
    formula: "PROBIOTIC",
    row: 1,
    accentColor: "#D7C3A3",
  },
  {
    id: "p4",
    title: "Centella Calm Sheet Mask",
    subtitle: "Intensive Soothing Treatment",
    price: 299,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781883818/34f50ee6-ff57-4ef0-9abf-fced606a00d3_g5u18o.png",
    badge: "SALE",
    rating: 4.9,
    formula: "DERMA-TESTED",
    row: 1,
    accentColor: "#D7B7AE",
  },
  {
    id: "p5",
    title: "Snail Mucin Repair Ampoule",
    subtitle: "Overnight Regeneration Complex",
    price: 1899,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781884535/56ce9a83-1efb-4653-a8fa-7565b90e26f6_vnjovw.png",
    rating: 4.5,
    formula: "CRUELTY-FREE",
    row: 1,
    accentColor: "#C9B8A8",
  },

  // ── ROW 2 ──────────────────────────────────────────────────────────
  {
    id: "p6",
    title: "Niacinamide Glass Toner",
    subtitle: "Pore Refining & Even Tone",
    price: 899,
    originalPrice: 1199,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781884459/615eeb66-c87c-44d0-8d9d-262b837dab03_mmvpx1.png",
    badge: "BESTSELLER",
    rating: 4.7,
    formula: "10% NIACIN",
    row: 2,
    accentColor: "#B8C4B8",
  },
  {
    id: "p7",
    title: "Mugwort Detox Clay Mask",
    subtitle: "Deep Pore Cleansing & Brightening",
    price: 749,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781883987/79293189-90c6-4e39-9e71-99a9211381a6_dj9sm8.png",
    rating: 4.4,
    formula: "CLAY-ACTIVE",
    row: 2,
    accentColor: "#8B6A50",
  },
  {
    id: "p8",
    title: "Hyaluronic Glow Emulsion",
    subtitle: "Triple-Weight Moisture Surge",
    price: 1199,
    originalPrice: 1499,
    currency: "₹",
    image:
      "https://res.cloudinary.com/dtslaveid/image/upload/v1781884186/b2749403-21c7-4817-a194-db713a53d142_giwfy9.png",
    badge: "NEW",
    rating: 4.6,
    formula: "3× HA",
    row: 2,
    accentColor: "#D9B98E",
  },
  {
    id: "p9",
    title: "Propolis Energy Ampule",
    subtitle: "Antioxidant Radiance Booster",
    price: 1449,
    currency: "₹",
    image:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=600&h=800",
    rating: 4.8,
    formula: "BIO-ACTIVE",
    row: 2,
    accentColor: "#E8D5B8",
  },
  {
    id: "p10",
    title: "Retinol Night Renewal Cream",
    subtitle: "Anti-Ageing Skin Resurfacing",
    price: 2199,
    originalPrice: 2799,
    currency: "₹",
    image:
      "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?auto=format&fit=crop&q=80&w=600&h=800",
    badge: "SALE",
    rating: 4.9,
    formula: "0.3% RETINOL",
    row: 2,
    accentColor: "#B8A898",
  },
];

export const row1Products = products.filter((p) => p.row === 1);
export const row2Products = products.filter((p) => p.row === 2);
