import { Home, Briefcase, Map, ShoppingBag, Wrench } from "lucide-react";

export interface PricingTier {
  label: string;
  bdtPrice: string;
  usdApprox: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: "Home" | "Briefcase" | "Map" | "ShoppingBag" | "Wrench";
  buttonText: string;
  note?: string;
  items: string[];
  heroImage: string;
  pricing: PricingTier;
  testimonials: Testimonial[];
  faqs: FAQ[];
  whatsappNumber: string;
  phoneNumber: string;
}

export const servicesData: ServiceType[] = [
  {
    id: "accommodation",
    title: "Accommodation & Office Support",
    description: "Find the perfect space for your needs seamlessly.",
    longDescription:
      "Relocating or setting up in Dhaka can be overwhelming. Our expert team handles the entire process — from scouting premium apartments in Gulshan and Banani to finding the ideal co-working space or private office. We negotiate on your behalf and ensure everything is move-in ready.",
    iconName: "Home",
    buttonText: "Find Your Space",
    heroImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80&fit=crop",
    items: [
      "Apartment Finding Assistance",
      "Office Space Finding Assistance",
      "Relocation Support",
    ],
    pricing: {
      label: "Starting From",
      bdtPrice: "৳ 5,000",
      usdApprox: "≈ $45 USD",
      features: [
        "Dedicated housing consultant",
        "Up to 10 shortlisted properties",
        "Landlord negotiation support",
        "Contract review assistance",
        "Move-in coordination",
      ],
    },
    testimonials: [
      {
        name: "James R.",
        location: "UK Expat in Gulshan",
        quote:
          "Found my dream apartment in under a week. The team at Be Happy handled everything — viewings, negotiations, even the paperwork. Absolutely seamless.",
        rating: 5,
      },
      {
        name: "Sofia M.",
        location: "Corporate Relocatee",
        quote:
          "We needed an office space urgently and they delivered three excellent options within 48 hours. Professional, responsive, and genuinely helpful.",
        rating: 5,
      },
      {
        name: "David K.",
        location: "Digital Nomad",
        quote:
          "As someone new to Dhaka, I had no idea where to start. They matched me with a fully furnished flat in Bashundhara within my budget. Highly recommend.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "How quickly can you find an apartment?",
        answer:
          "In most cases, we present shortlisted properties within 48–72 hours of your request, depending on your requirements and preferred neighborhoods.",
      },
      {
        question: "Do you help with furnished or unfurnished apartments?",
        answer:
          "We handle both. We also have connections with trusted furniture vendors if you need to furnish a new space quickly.",
      },
      {
        question: "Is there an additional fee for landlord negotiation?",
        answer:
          "No. Negotiation support is included in our standard service package. We work to get you the best possible deal.",
      },
      {
        question: "Which areas of Dhaka do you cover?",
        answer:
          "We specialize in Gulshan, Banani, Bashundhara R/A, Uttara, and Dhanmondi — the most sought-after neighborhoods for expats and professionals.",
      },
    ],
    whatsappNumber: "+8801700000000",
    phoneNumber: "+8801700000000",
  },
  {
    id: "concierge",
    title: "Concierge Services",
    description: "Premium assistance for your travel and daily needs.",
    longDescription:
      "Life in Dhaka moves fast. Our white-glove concierge service ensures you're always ahead — with hotel bookings, flight arrangements, professional drivers on standby, and even help finding the perfect housemate. Consider us your personal assistant in Dhaka.",
    iconName: "Briefcase",
    buttonText: "Request Concierge",
    heroImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80&fit=crop",
    items: [
      "Hotel Reservations",
      "Flight Bookings",
      "Professional Drivers",
      "Rent-a-Car Services",
      "Housemate Finding Assistance",
    ],
    pricing: {
      label: "Starting From",
      bdtPrice: "৳ 2,500",
      usdApprox: "≈ $23 USD",
      features: [
        "Dedicated concierge agent",
        "24/7 booking assistance",
        "Professional, vetted drivers",
        "Airport pick-up & drop-off",
        "Housemate matching service",
      ],
    },
    testimonials: [
      {
        name: "Priya S.",
        location: "Business Traveler",
        quote:
          "Our corporate driver was punctual, professional, and knew Dhaka inside out. Saved us hours of commute stress during a critical project week.",
        rating: 5,
      },
      {
        name: "Marcus L.",
        location: "Frequent Visitor",
        quote:
          "They booked my flights, hotel, and arranged a driver — all through a single WhatsApp message. This is how concierge should work.",
        rating: 5,
      },
      {
        name: "Anna C.",
        location: "NGO Worker",
        quote:
          "Finding a trustworthy housemate was daunting until Be Happy stepped in. They vetted candidates and matched me within two weeks. Safe and reliable.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "Are your drivers licensed and vetted?",
        answer:
          "Yes. All drivers go through background checks, have valid commercial licenses, and are experienced with navigating Dhaka's traffic.",
      },
      {
        question: "Can you arrange last-minute hotel bookings?",
        answer:
          "Absolutely. We have partnerships with hotels across Dhaka and can often secure bookings even on the same day.",
      },
      {
        question: "Do you provide airport transfer services?",
        answer:
          "Yes. We offer reliable airport pick-up and drop-off at Hazrat Shahjalal International Airport with professional drivers.",
      },
      {
        question: "How does the housemate matching process work?",
        answer:
          "We first understand your preferences (lifestyle, budget, location), then shortlist compatible candidates from our database, and arrange introductory meetings.",
      },
    ],
    whatsappNumber: "+8801700000000",
    phoneNumber: "+8801700000000",
  },
  {
    id: "tour",
    title: "Tour Guide Services",
    description: "Discover Dhaka with a trusted local guide.",
    longDescription:
      "Dhaka has layers that only a local truly understands. Our experienced, bilingual tour guides take you beyond the tourist spots — into vibrant local markets, historic neighborhoods, and the real heartbeat of the city. Perfect for business visitors and curious travelers alike.",
    iconName: "Map",
    buttonText: "Book a Guide",
    heroImage:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=80&fit=crop",
    items: [
      "Hourly-Based Tour Guide Service",
      "Business Visitor Assistance",
      "City Tours & Local Experience",
      "Flexible Schedule at Competitive Rates",
    ],
    pricing: {
      label: "Starting From",
      bdtPrice: "৳ 1,500",
      usdApprox: "≈ $14 USD",
      features: [
        "Minimum 2-hour booking",
        "Bilingual guide (English & Bengali)",
        "Custom route planning",
        "Local restaurant recommendations",
        "Business district orientation tours",
      ],
    },
    testimonials: [
      {
        name: "Thomas H.",
        location: "Tourist from Germany",
        quote:
          "Our guide took us to places no travel blog ever mentions. We ate incredible street food, visited hidden mosques, and got a genuine feel for Dhaka. Unforgettable.",
        rating: 5,
      },
      {
        name: "Rachel W.",
        location: "Business Delegate",
        quote:
          "The business district orientation tour was invaluable. Our guide knew exactly which areas were relevant to our industry and made introductions feel natural.",
        rating: 5,
      },
      {
        name: "Omar F.",
        location: "Diaspora Visitor",
        quote:
          "Coming back to Dhaka after 15 years, I needed help navigating how much it had changed. Our guide made it feel familiar and exciting at the same time.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "Are tours available in English?",
        answer:
          "Yes. All our guides are fluent in English and Bengali, and some speak additional languages. Let us know your preference when booking.",
      },
      {
        question: "Can I customize the tour route?",
        answer:
          "Absolutely. We always plan routes based on your interests — whether that's historical sites, food markets, shopping districts, or business hubs.",
      },
      {
        question: "What is the minimum booking duration?",
        answer:
          "Our minimum booking is 2 hours. Most city tours are between 4–6 hours for a comprehensive experience.",
      },
      {
        question: "Do you offer tours outside of Dhaka?",
        answer:
          "Currently we specialize in Dhaka city tours. However, we can assist with planning day trips to nearby destinations like Sonargaon upon request.",
      },
    ],
    whatsappNumber: "+8801700000000",
    phoneNumber: "+8801700000000",
  },
  {
    id: "buying",
    title: "Buying Used Items",
    description: "We purchase used Furniture, Electronics, and Cars.",
    longDescription:
      "Leaving Dhaka or simply need to clear space? We make it easy to sell your used furniture, electronics, and vehicles. Our team visits your location, evaluates your items fairly, and pays cash on the spot. No hassle, no haggling — just a smooth, honest transaction.",
    iconName: "ShoppingBag",
    note: "Fast Evaluation • Fair Price • Immediate Cash Payment",
    buttonText: "Get an Offer",
    heroImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80&fit=crop",
    items: ["Used Furniture", "Used Electronics", "Used Cars"],
    pricing: {
      label: "We Come to You",
      bdtPrice: "Free Evaluation",
      usdApprox: "No hidden fees",
      features: [
        "Home visit for evaluation",
        "Fair market-rate pricing",
        "Immediate cash payment",
        "We handle transport & pickup",
        "No commission or extra charges",
      ],
    },
    testimonials: [
      {
        name: "Claire T.",
        location: "Expat Departing Dhaka",
        quote:
          "I had a full apartment of furniture to sell before my flight. They came the next morning, gave a fair price on everything, and paid cash. Couldn't have been easier.",
        rating: 5,
      },
      {
        name: "Reza N.",
        location: "Dhaka Resident",
        quote:
          "Sold my old AC and refrigerator in one visit. The valuation was honest and they carried everything out themselves. No stress at all.",
        rating: 5,
      },
      {
        name: "Emily P.",
        location: "Corporate Relocatee",
        quote:
          "Our office was upgrading equipment. Be Happy bought all the old laptops and monitors at a reasonable price, saving us the hassle of finding individual buyers.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "How is the price determined for my items?",
        answer:
          "Our evaluators assess the age, condition, and current market value of each item. We aim to offer a fair price that reflects the true market rate.",
      },
      {
        question: "Do you buy all brands and models?",
        answer:
          "We buy most major brands of furniture, consumer electronics, and vehicles. Some heavily damaged or very old items may not be eligible.",
      },
      {
        question: "How quickly can you arrange a home visit?",
        answer:
          "In most cases, we can arrange an evaluation visit within 24 hours of your request.",
      },
      {
        question: "Is there any cost for the evaluation visit?",
        answer:
          "Absolutely not. The home visit and evaluation are completely free, with no obligation to sell.",
      },
    ],
    whatsappNumber: "+8801700000000",
    phoneNumber: "+8801700000000",
  },
  {
    id: "repair",
    title: "Repair & Maintenance Services",
    description: "Expert servicing for all your home and office appliances.",
    longDescription:
      "Keep your home and office running smoothly with our certified repair and maintenance specialists. From air conditioner servicing to refrigerator repairs and TV diagnostics, our technicians arrive promptly, diagnose quickly, and fix it right the first time.",
    iconName: "Wrench",
    buttonText: "Book a Repair",
    heroImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80&fit=crop",
    items: [
      "Refrigerator Servicing",
      "Air Conditioner Servicing",
      "Television Repair",
      "Home & Office Electronics Maintenance",
    ],
    pricing: {
      label: "Starting From",
      bdtPrice: "৳ 800",
      usdApprox: "≈ $7 USD",
      features: [
        "Certified, experienced technicians",
        "Transparent pricing before work begins",
        "Same-day or next-day service",
        "Warranty on repairs",
        "Genuine spare parts used",
      ],
    },
    testimonials: [
      {
        name: "Linda S.",
        location: "Homeowner in Banani",
        quote:
          "My AC stopped working in the summer heat. The technician arrived within hours, diagnosed the problem, and had it running again the same day. Excellent service.",
        rating: 5,
      },
      {
        name: "Karim A.",
        location: "Office Manager",
        quote:
          "We use Be Happy for all our office electronics maintenance. Reliable, professional, and they always explain what was done. Trust is everything for us.",
        rating: 5,
      },
      {
        name: "Natalie B.",
        location: "Expat Resident",
        quote:
          "My refrigerator was making a strange noise and they fixed it at a fraction of what a replacement would have cost. Quick, honest, and skilled.",
        rating: 4,
      },
    ],
    faqs: [
      {
        question: "Do your technicians carry spare parts?",
        answer:
          "Our technicians carry common spare parts for quick fixes. For specific parts, we source genuine components and return for a scheduled follow-up.",
      },
      {
        question: "Is there a warranty on repairs?",
        answer:
          "Yes. We provide a 30-day warranty on all repair work. If the same issue recurs within this period, we return at no extra charge.",
      },
      {
        question: "How quickly can a technician arrive?",
        answer:
          "We offer same-day service for most requests made before 12 PM. For requests after noon, we typically schedule a next-morning visit.",
      },
      {
        question: "Do you provide a quote before starting work?",
        answer:
          "Always. Our technicians diagnose the issue first and provide a full, transparent quote before any repair work begins. No surprises.",
      },
    ],
    whatsappNumber: "+8801700000000",
    phoneNumber: "+8801700000000",
  },
];

export const iconMap = {
  Home,
  Briefcase,
  Map,
  ShoppingBag,
  Wrench,
};
