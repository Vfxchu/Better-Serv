/* ─── ICONS ─── */
const ICONS = {
  build: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/><path d="M7 14h.01"/><path d="M10 11h.01"/><path d="M10 17h.01"/><path d="M14 14h.01"/><path d="M17 11h.01"/><path d="M17 17h.01"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="m19 19-7-8-3 3-3-3"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-10 10Z"/><path d="M17.6 14c-.7-1.5-1.5-1.5-3-1"/><path d="M15 22v-4"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect width="8" height="18" x="3" y="3" rx="2"/><path d="M7 10h11"/><path d="M21 21H3"/><rect width="3" height="12" x="14" y="9" rx="1"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
};

/* ─── PIN ICON ─── */
const pin =
  '<svg style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;flex-shrink:0" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';

/* ─── HERO SLIDES ─── */
const HS = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=800&fit=crop",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&h=800&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=800&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&h=800&fit=crop",
];

/* ─── SERVICES ─── */
const SV = [
  {
    i: ICONS.build,
    t: "Property Development",
    d: "World-class residential and commercial developments across Dubai and India with premium finishes.",
  },
  {
    i: ICONS.key,
    t: "Sales & Leasing",
    d: "Full-cycle support for buying, selling, or leasing premium properties with expert negotiation.",
  },
  {
    i: ICONS.chart,
    t: "Investment Advisory",
    d: "Data-driven investment guidance to maximize your real estate portfolio returns.",
  },
  {
    i: ICONS.gear,
    t: "Property Management",
    d: "Comprehensive maintenance, tenant management, and revenue optimization.",
  },
];

/* ─── DUBAI PROPERTIES ─── */
const DP = [
  { id: 11, t: "Marina Bay Penthouse", l: "Dubai Marina", p: "AED 8.5M", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop", b: 4, a: "3,200 sqft", tg: "Penthouse", m: "buy" },
  { id: 12, t: "Palm Jumeirah Villa", l: "Palm Jumeirah", p: "AED 15M", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop", b: 6, a: "6,500 sqft", tg: "Villa", m: "buy" },
  { id: 13, t: "Al Barari Garden", l: "Al Barari", p: "AED 12M", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop", b: 5, a: "5,800 sqft", tg: "Villa", m: "buy" },
  { id: 14, t: "Downtown Luxury Apt", l: "Downtown Dubai", p: "AED 25,000/mo", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop", b: 2, a: "1,400 sqft", tg: "Apartment", m: "rent" },
  { id: 15, t: "Business Bay Studio", l: "Business Bay", p: "AED 10,000/mo", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", b: 1, a: "850 sqft", tg: "Studio", m: "rent" },
  { id: 16, t: "Dubai Hills Villa", l: "Dubai Hills", p: "AED 18,000/mo", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop", b: 3, a: "2,900 sqft", tg: "Villa", m: "rent" },
  { id: 17, t: "Waterfront Mansion", l: "Jumeirah Islands", p: "AED 22M", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop", b: 5, a: "7,200 sqft", tg: "Villa", m: "buy" },
  { id: 18, t: "Emaar Beachfront Apt", l: "Dubai Harbour", p: "AED 4.2M", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", b: 2, a: "1,600 sqft", tg: "Apartment", m: "buy" },
  { id: 19, t: "Mirdif Family Home", l: "Mirdif", p: "AED 12,000/mo", img: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=600&h=400&fit=crop", b: 4, a: "3,100 sqft", tg: "Townhouse", m: "rent" },
  { id: 20, t: "DIFC Exec Suite", l: "DIFC", p: "AED 14,000/mo", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop", b: 1, a: "1,100 sqft", tg: "Apartment", m: "rent" }
];

/* ─── INDIA PROPERTIES ─── */
const IP = [
  { id: 1, t: "Skyline Residences", l: "Mumbai, Maharashtra", p: "₹2.5 Cr", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", b: 3, a: "1,800 sqft", tg: "High-Rise", m: "buy" },
  { id: 2, t: "Garden Villas", l: "Bangalore, Karnataka", p: "₹1.8 Cr", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop", b: 4, a: "2,400 sqft", tg: "Villa", m: "buy" },
  { id: 3, t: "Marine Drive Residency", l: "Mumbai", p: "₹4.5 Cr", img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop", b: 3, a: "2,200 sqft", tg: "Apartment", m: "buy" },
  { id: 4, t: "Gurgaon Modern Suite", l: "Gurgaon", p: "₹95,000/mo", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop", b: 2, a: "1,400 sqft", tg: "Apartment", m: "rent" },
  { id: 5, t: "Whitefield Loft", l: "Bangalore", p: "₹65,000/mo", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop", b: 1, a: "950 sqft", tg: "Loft", m: "rent" },
  { id: 6, t: "Korone Park Residences", l: "Pune, Maharashtra", p: "₹1.2 Cr", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", b: 3, a: "1,650 sqft", tg: "High-Rise", m: "buy" },
  { id: 7, t: "Heritage Haveli", l: "Jaipur, Rajasthan", p: "₹5.5 Cr", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop", b: 6, a: "8,000 sqft", tg: "Heritage", m: "buy" },
  { id: 8, t: "Hyderabad Tech Suite", l: "Hitech City, Hyderabad", p: "₹45,000/mo", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop", b: 2, a: "1,300 sqft", tg: "Apartment", m: "rent" },
  { id: 9, t: "Sea View Flat", l: "Marine Drive, Kochi", p: "₹35,000/mo", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop", b: 2, a: "1,200 sqft", tg: "Apartment", m: "rent" }
];

/* ─── DUBAI DEVELOPERS ─── */
const DD = [
  { n: "Emaar Properties",    l: "Dubai Developers/Emaar.png" },
  { n: "DAMAC Properties",    l: "Dubai Developers/damac.png" },
  { n: "Sobha Realty",        l: "Dubai Developers/sobha.png" },
  { n: "Meraas",              l: "Dubai Developers/Meraas.png" },
  { n: "Binghatti",           l: "Dubai Developers/binghatti.png" },
  { n: "Danube Properties",   l: "Dubai Developers/Danube-logo.png" },
  { n: "Azizi Developments",  l: "Dubai Developers/Aziz-Logo.png" },
  { n: "Arada",               l: "Dubai Developers/arada.png" },
  { n: "Deyaar",              l: "Dubai Developers/deyaar.png" },
  { n: "Dubai Properties",    l: "Dubai Developers/dubai-properties.png" },
  { n: "Ellington",           l: "Dubai Developers/ellington.png" },
  { n: "Imtiaz",              l: "Dubai Developers/imtiaz.png" },
  { n: "Samana Developers",   l: "Dubai Developers/samana.png" }
];

/* ─── INDIA DEVELOPERS ─── */
const ID = [
  { n: "DLF Limited",          l: "Indian Developers/dlf-logo.png" },
  { n: "Godrej Properties",    l: "Indian Developers/Godrej.jpg" },
  { n: "Tata Realty",          l: "Indian Developers/tata-realty.png" },
  { n: "Prestige Group",       l: "Indian Developers/prestige-group.png" },
  { n: "Lodha Group",          l: "Indian Developers/Lodha.jpg" },
  { n: "L&T Realty",           l: "Indian Developers/lnt-reality.png" },
  { n: "Mahindra Lifespace",   l: "Indian Developers/mahindra-lifespace.png" },
  { n: "Oberoi Realty",        l: "Indian Developers/oberoi-reality.png" },
  { n: "Kolte-Patil",          l: "Indian Developers/KP.jpg" },
  { n: "Shapoorji Pallonji",   l: "Indian Developers/SP.jpg" },
  { n: "VTP Realty",           l: "Indian Developers/VTP.jpg" }
];

/* ─── WHY US ─── */
const WU = [
  {
    i: ICONS.users,
    t: "Expert Agents",
    d: "Industry veterans with 10+ years experience",
  },
  {
    i: ICONS.shield,
    t: "Verified Listings",
    d: "Every property is personally inspected",
  },
  {
    i: ICONS.globe,
    t: "Global Reach",
    d: "Offices in Dubai, Mumbai & Bangalore",
  },
  {
    i: ICONS.dollar,
    t: "Best Value",
    d: "Competitive pricing with no hidden fees",
  },
  {
    i: ICONS.users,
    t: "24/7 Support",
    d: "Always available via phone, email or chat",
  },
  {
    i: ICONS.zap,
    t: "Fast Closing",
    d: "Streamlined process from offer to keys",
  },
];

/* ─── STATS ─── */
const ST = [
  { v: 500, s: "+", l: "Properties Sold" },
  { v: 10, s: "+", l: "Years Experience" },
  { v: 1200, s: "+", l: "Happy Clients" },
  { v: 50, s: "+", l: "Expert Agents" },
];

/* ─── PROCESS STEPS ─── */
const PR = [
  {
    n: "01",
    t: "Consultation",
    d: "Share your requirements, budget, and preferred locations",
  },
  {
    n: "02",
    t: "Curated Selection",
    d: "We handpick properties matching your exact criteria",
  },
  {
    n: "03",
    t: "Property Viewing",
    d: "Virtual or in-person tours at your convenience",
  },
  {
    n: "04",
    t: "Closing & Handover",
    d: "Seamless paperwork, financing, and key handover",
  },
  {
    n: "05",
    t: "Extra Mile Service",
    d: "Post-handover interior design, property management, and ongoing legal support.",
  },
];

/* ─── TESTIMONIALS ─── */
const TM = [
  {
    n: "Rajesh Menon",
    r: "Investor, Mumbai",
    tx: "Exceptional service from start to finish. They helped me secure a prime Dubai Marina apartment at a fantastic price.",
  },
  {
    n: "Sarah Al-Maktoum",
    r: "Homeowner, Dubai",
    tx: "Professional, transparent, and incredibly efficient. I found my dream villa through Better Serv in just two weeks.",
  },
  {
    n: "Amit Sharma",
    r: "NRI Investor, London",
    tx: "As an overseas buyer, their end-to-end support was invaluable. Highly recommend for international investments.",
  },
  {
    n: "Priya Nair",
    r: "First-time Buyer, Kerala",
    tx: "Better Serv made my first property purchase stress-free. Their team guided me through every step with patience.",
  },
];

/* ─── CORE VALUES ─── */
const VL = [
  {
    i: ICONS.target,
    t: "Client-First Approach",
    d: "Every decision is guided by what serves our clients best.",
  },
  {
    i: ICONS.shield,
    t: "Transparency",
    d: "No hidden fees, no surprises. Complete clarity at every stage.",
  },
  {
    i: ICONS.shield,
    t: "Integrity",
    d: "Lasting relationships founded on trust and ethical practices.",
  },
  {
    i: ICONS.award,
    t: "Excellence",
    d: "The highest standards in service, analysis, and client care.",
  },
  {
    i: ICONS.zap,
    t: "Innovation",
    d: "Latest technology and data analytics for smarter decisions.",
  },
  {
    i: ICONS.leaf,
    t: "Sustainability",
    d: "Promoting eco-friendly developments and sustainable practices.",
  },
];

/* ─── TEAM ─── */
const TEM = [
  {
    n: "Vishnu S.",
    r: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    n: "Aisha Rahman",
    r: "Head of Dubai Ops",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    n: "Arjun Mehta",
    r: "India Sales Director",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    n: "Fatima Al-Sayed",
    r: "Legal & Compliance",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
];
