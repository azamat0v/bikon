import type { Core } from '@strapi/strapi';

/* ── Default EN content for all product pages ────────────────────────────
   Loaded once on first startup (if no product-page entries exist yet).
   Admin can edit any field via Content Manager → Product Page.
─────────────────────────────────────────────────────────────────────── */
const SEED_PAGES = [
  {
    slug: 'laptops',
    hero_eyebrow: 'Smartbook & Workbook Series',
    hero_title: 'Power That\nGoes With You.',
    hero_subtitle: 'Engineered for students, professionals, and creators. Light by design, powerful by nature.',
    hero_cta_primary: 'Explore Models',
    hero_cta_secondary: 'View Specs',
    lineup_eyebrow: 'Model Lineup',
    lineup_title: 'Choose Your\nPerfect Laptop',
    models: [
      { name: 'Bikon Smartbook', tag: 'Everyday Excellence', badge: 'PRO',
        description: 'Intel Celeron N5095, 8GB DDR4, 256GB SSD, fingerprint scanner — smart performance for students and professionals.',
        specs: ['Intel Celeron N5095', '8GB DDR4', '256GB SSD', 'Fingerprint'] },
      { name: 'Bikon Workbook', tag: 'Reliable Everyday',
        description: 'Intel Celeron N4000, 8GB DDR4, 256GB SSD — solid and dependable, built for everyday tasks.',
        specs: ['Intel Celeron N4000', '8GB DDR4', '256GB SSD'] },
    ],
    specs_eyebrow: 'Specifications',
    specs_title: 'Technical Specifications',
    specs_label: 'Smartbook',
    spec_categories: [
      { name: 'Display', rows: [
        { col1: 'Screen Size',  col2: '15.6"',         col3: '15.6"' },
        { col1: 'Resolution',   col2: '1920×1080',     col3: '1920×1080' },
        { col1: 'Panel Type',   col2: 'IPS',           col3: 'IPS' },
        { col1: 'Refresh Rate', col2: '60Hz',          col3: '60Hz' },
        { col1: 'Brightness',   col2: '220 nits',      col3: '220 nits' },
      ]},
      { name: 'Performance', rows: [
        { col1: 'Processor', col2: 'Intel Celeron N5095', col3: 'Intel Celeron N4000' },
        { col1: 'RAM',       col2: '8GB DDR4',            col3: '8GB DDR4' },
        { col1: 'Storage',   col2: '256GB SSD / NVMe',    col3: '256GB SSD / NVMe' },
        { col1: 'Graphics',  col2: 'Intel UHD',           col3: 'Intel UHD 600' },
        { col1: 'OS',        col2: 'Windows 10 Pro',      col3: 'Windows 10 Pro' },
      ]},
      { name: 'Battery & Build', rows: [
        { col1: 'Battery Life', col2: 'Long-lasting', col3: 'Long-lasting' },
        { col1: 'Weight',       col2: 'Light',        col3: 'Light' },
        { col1: 'Fingerprint',  col2: 'Yes',          col3: '—' },
      ]},
      { name: 'Connectivity', rows: [
        { col1: 'Wi-Fi',     col2: 'Wi-Fi 5',      col3: 'Wi-Fi 5' },
        { col1: 'Bluetooth', col2: 'BT 5.0',       col3: 'BT 5.0' },
        { col1: 'USB Ports', col2: '2× USB-A',     col3: '2× USB-A' },
        { col1: 'HDMI',      col2: '1× HDMI 1.4',  col3: '1× HDMI 1.4' },
        { col1: 'Webcam',    col2: 'Full HD 1080p', col3: 'Full HD 1080p' },
      ]},
    ],
  },
  {
    slug: 'monitors',
    hero_eyebrow: 'Vision Series',
    hero_title: 'See Everything\nDifferently.',
    hero_subtitle: 'Engineered for clarity. Built for those who demand the best from every pixel.',
    hero_cta_primary: 'Shop Now',
    hero_cta_secondary: 'See Specs',
    lineup_eyebrow: 'Model Lineup',
    lineup_title: 'Choose Your Vision',
    models: [
      { name: 'Bikon Vision', tag: 'Essential Performance',
        description: 'An IPS panel with accurate colors and a slim profile — the ideal display for the modern workspace.',
        specs: ['22" / 24" IPS', '75Hz', 'HDMI + VGA', '5ms'] },
      { name: 'Bikon Vision Pro', tag: 'Professional Grade', badge: 'PRO',
        description: 'Ultra-thin bezels, a signature V-shaped metallic stand, and fast response time for professionals.',
        specs: ['27" IPS', '75Hz', 'HDMI + VGA + AUX', '5ms'] },
    ],
    specs_eyebrow: 'Specifications',
    specs_title: 'Technical Specifications',
    specs_label: 'Vision',
    spec_categories: [
      { name: 'Display', rows: [
        { col1: 'Screen Size',   col2: '22" / 24"', col3: '27"' },
        { col1: 'Resolution',    col2: '1920×1080', col3: '1920×1080' },
        { col1: 'Panel Type',    col2: 'IPS',       col3: 'IPS' },
        { col1: 'Refresh Rate',  col2: '75Hz',      col3: '75Hz' },
        { col1: 'Response Time', col2: '5ms',       col3: '5ms' },
        { col1: 'Brightness',    col2: '250 nits',  col3: '300 nits' },
      ]},
      { name: 'Connectivity', rows: [
        { col1: 'HDMI',  col2: '1× HDMI',   col3: '1× HDMI' },
        { col1: 'VGA',   col2: '1× VGA',    col3: '1× VGA' },
        { col1: 'Audio', col2: '3.5mm AUX', col3: '3.5mm AUX' },
      ]},
    ],
  },
  {
    slug: 'aios',
    hero_eyebrow: 'Matrix Series',
    hero_title: 'All-in-One.\nAll You Need.',
    hero_subtitle: 'Powerful Intel processors, vibrant IPS displays, and a sleek all-in-one design — built for the modern workplace.',
    hero_cta_primary: 'Explore Models',
    hero_cta_secondary: 'View Specs',
    lineup_eyebrow: 'Our Lineup',
    lineup_title: 'Find Your\nPerfect AiO',
    models: [
      { name: 'Bikon Matrix', tag: 'Smart Office Choice',
        description: 'Intel Core i3, 8GB DDR4, 256GB SSD, 21.5" FHD IPS — an all-in-one that powers the everyday office.',
        specs: ['21.5" FHD IPS', 'Core i3', '8GB DDR4', '256GB SSD'] },
      { name: 'Bikon Optima', tag: 'Proven Reliability',
        description: 'Intel 2nd–3rd Gen, DDR3, H61 chipset — solid performance at an accessible price.',
        specs: ['23.8" FHD IPS', 'Core i5/i7', '16GB DDR3', '512GB SSD'] },
      { name: 'Bikon NOVA', tag: 'Advanced Flagship',
        description: '20mm slim aluminum, Wi-Fi 6, Intel 12th–14th Gen — the most refined AIO from Bikon.',
        specs: ['24" / 27" IPS', 'Core i3/i5/i7', 'DDR4 up to 16GB', '20mm Slim'] },
    ],
  },
  {
    slug: 'nova',
    hero_eyebrow: 'Bikon NOVA',
    hero_title: 'Designed for the\nModern Workplace.',
    hero_subtitle: 'The NOVA redefines what an all-in-one can be — a refined, powerful desktop built for professionals who demand the best.',
    hero_cta_primary: 'Explore NOVA',
    hero_cta_secondary: 'View Specs',
    lineup_eyebrow: 'Model Lineup',
    lineup_title: 'Meet the\nBikon NOVA.',
    models: [
      { name: 'Bikon NOVA', tag: 'All-in-One Desktop',
        description: 'A 24" or 27" IPS display, Intel Core i3/i5/i7 (12th–14th Gen), DDR4 memory up to 16 GB, and a 20 mm CNC-aluminum chassis.',
        specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 up to 16 GB', '20 mm Slim'] },
    ],
    specs_eyebrow: 'Specifications',
    specs_title: 'Technical Specifications',
    specs_label: 'NOVA',
    spec_categories: [
      { name: 'Display', rows: [
        { col1: 'Screen Size',  col2: '24" or 27"', col3: '' },
        { col1: 'Panel Type',   col2: 'IPS FHD',    col3: '' },
        { col1: 'Refresh Rate', col2: '75Hz',       col3: '' },
      ]},
      { name: 'Performance', rows: [
        { col1: 'Processor', col2: 'Intel Core i3/i5/i7 (12th–14th Gen)', col3: '' },
        { col1: 'RAM',       col2: 'DDR4, up to 16 GB',                   col3: '' },
        { col1: 'Storage',   col2: 'NVMe SSD',                             col3: '' },
        { col1: 'OS',        col2: 'Windows 11',                           col3: '' },
      ]},
      { name: 'Design', rows: [
        { col1: 'Chassis',   col2: 'CNC Aluminum', col3: '' },
        { col1: 'Thickness', col2: '20 mm slim',   col3: '' },
        { col1: 'Wi-Fi',     col2: 'Wi-Fi 6',      col3: '' },
        { col1: 'Webcam',    col2: 'Full HD 1080p', col3: '' },
      ]},
    ],
  },
  {
    slug: 'matrix',
    hero_eyebrow: 'Bikon Matrix',
    hero_title: 'Powerful. Precise.\nAll-in-One.',
    hero_subtitle: 'The Matrix brings Intel 12th–14th Gen power, DDR4 memory, and a 24" or 27" IPS display into one clean all-in-one package.',
    hero_cta_primary: 'Explore Matrix',
    hero_cta_secondary: 'View Specs',
    lineup_eyebrow: 'Model Lineup',
    lineup_title: 'Meet the\nBikon Matrix.',
    models: [
      { name: 'Bikon Matrix', tag: 'All-in-One Desktop',
        description: '24" or 27" IPS display, Intel Core i3/i5/i7 (12th–14th Gen), DDR4 memory, and a slim chassis for the modern office.',
        specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4', 'Slim Design'] },
    ],
    specs_eyebrow: 'Specifications',
    specs_title: 'Technical Specifications',
    specs_label: 'Matrix',
    spec_categories: [
      { name: 'Display', rows: [
        { col1: 'Screen Size',  col2: '24" or 27"', col3: '' },
        { col1: 'Panel Type',   col2: 'IPS FHD',    col3: '' },
        { col1: 'Refresh Rate', col2: '75Hz',       col3: '' },
      ]},
      { name: 'Performance', rows: [
        { col1: 'Processor', col2: 'Intel Core i3/i5/i7 (12th–14th Gen)', col3: '' },
        { col1: 'RAM',       col2: '8GB – 16GB DDR4',                      col3: '' },
        { col1: 'Storage',   col2: '256GB – 1TB NVMe',                     col3: '' },
        { col1: 'OS',        col2: 'Windows 11',                            col3: '' },
      ]},
    ],
  },
  {
    slug: 'optima',
    hero_eyebrow: 'Bikon Optima',
    hero_title: 'Trusted Performance.\nAccessible Price.',
    hero_subtitle: 'The Optima delivers proven Intel Core performance, DDR3 memory, and a 24" or 27" IPS display — trusted computing at an accessible price.',
    hero_cta_primary: 'Explore Optima',
    hero_cta_secondary: 'View Specs',
    lineup_eyebrow: 'Model Lineup',
    lineup_title: 'Meet the\nBikon Optima.',
    models: [
      { name: 'Bikon Optima', tag: 'All-in-One Desktop',
        description: '24" or 27" IPS display, Intel Core i5/i7 (2nd–3rd Gen), DDR3 memory — reliable performance at an accessible price.',
        specs: ['24" / 27" IPS', 'Core i5 / i7', 'DDR3', 'H61 Chipset'] },
    ],
    specs_eyebrow: 'Specifications',
    specs_title: 'Technical Specifications',
    specs_label: 'Optima',
    spec_categories: [
      { name: 'Display', rows: [
        { col1: 'Screen Size',  col2: '24" or 27"', col3: '' },
        { col1: 'Panel Type',   col2: 'IPS FHD',    col3: '' },
        { col1: 'Refresh Rate', col2: '75Hz',       col3: '' },
      ]},
      { name: 'Performance', rows: [
        { col1: 'Processor', col2: 'Intel Core i5/i7 (2nd–3rd Gen)', col3: '' },
        { col1: 'RAM',       col2: '4GB – 16GB DDR3',                 col3: '' },
        { col1: 'Storage',   col2: '128GB – 512GB SSD',               col3: '' },
        { col1: 'OS',        col2: 'Windows 10 / 11',                  col3: '' },
      ]},
    ],
  },
  {
    slug: 'cases',
    hero_eyebrow: 'Bikon Cases',
    hero_title: 'Built for\nChampions.',
    hero_subtitle: 'Tempered glass, precision airflow, and full RGB support — engineered to make your build look as powerful as it performs.',
    hero_cta_primary: 'Explore Cases',
    hero_cta_secondary: 'View Specs',
    lineup_eyebrow: 'Model Lineup',
    lineup_title: 'Choose Your\nBattle Station.',
    models: [
      { name: 'Bikon Phantom', tag: 'RGB Mid-Tower',
        description: 'Aggressive tempered glass design with full RGB support and optimized airflow — built for gamers who demand the best.',
        specs: ['ATX Mid-Tower', 'Tempered Glass Panel', 'RGB Fan Support', '360mm Liquid Cooling'] },
      { name: 'Bikon Prisma', tag: 'Glass Showcase',
        description: 'Full panoramic tempered glass on three sides — show off your build with style while keeping thermals in check.',
        specs: ['ATX Mid-Tower', '3-Sided Tempered Glass', 'High-Airflow Front', '280mm Liquid Cooling'] },
      { name: 'Bikon Compact', tag: 'Micro-ATX',
        description: 'Small footprint, big performance. The Compact fits into any space without sacrificing cooling or expansion.',
        specs: ['Micro-ATX Tower', 'Steel + Glass Build', 'Dual Fan Support', '240mm Liquid Cooling'] },
    ],
    specs_eyebrow: 'Specifications',
    specs_title: 'Technical Specifications',
    specs_label: 'Bikon Cases',
    spec_categories: [
      { name: 'Build', rows: [
        { col1: 'Form Factor',  col2: 'ATX / Micro-ATX / Mini-ITX',  col3: '—' },
        { col1: 'Material',     col2: 'SPCC Steel + Tempered Glass',  col3: '—' },
        { col1: 'Side Panel',   col2: '4mm Tempered Glass',           col3: '—' },
        { col1: 'Dimensions',   col2: '450 × 210 × 480 mm',          col3: '—' },
      ]},
      { name: 'Cooling', rows: [
        { col1: 'Front Fans',     col2: '3× 120mm / 2× 140mm (incl.)', col3: '—' },
        { col1: 'Rear Fan',       col2: '1× 120mm (included)',          col3: '—' },
        { col1: 'Top Fans',       col2: '2× 120mm / 2× 140mm',         col3: '—' },
        { col1: 'Liquid Cooling', col2: 'Up to 360mm Radiator',         col3: '—' },
        { col1: 'Max CPU Cooler', col2: '165mm',                        col3: '—' },
      ]},
      { name: 'Front I/O', rows: [
        { col1: 'USB Ports',    col2: '2× USB 2.0',     col3: '—' },
        { col1: 'Video Out',    col2: 'HDMI + VGA',      col3: '—' },
        { col1: 'Audio',        col2: '3.5mm In + Out',  col3: '—' },
        { col1: 'Power Button', col2: 'Illuminated',     col3: '—' },
      ]},
      { name: 'Compatibility', rows: [
        { col1: 'Motherboard',   col2: 'ATX / Micro-ATX / Mini-ITX', col3: '—' },
        { col1: 'GPU Clearance', col2: 'Up to 380mm',                 col3: '—' },
        { col1: 'Drive Bays',    col2: '2× 3.5" HDD / 3× 2.5" SSD', col3: '—' },
        { col1: 'PSU Support',   col2: 'ATX (bottom-mount)',           col3: '—' },
      ]},
    ],
  },
];

const ABOUT_SEED = {
  hero_eyebrow: 'About Us · Since 2015',
  hero_subtitle: 'Modern and trusted technology brand in Uzbekistan, founded in 2015 and based in Tashkent.',
  story_eyebrow: 'Our Story',
  story_title: "Building Uzbekistan's Technology Future",
  story_body: 'Founded in 2015 and based in Tashkent, BIKON provides high-quality and affordable computer equipment for individuals, businesses, and government institutions. Our products are designed to meet real local needs while complying with global standards.',
  stats: [
    { number: '10+',           label: 'Years of experience'     },
    { number: 'B2B · B2G · B2C', label: 'Market segments served' },
    { number: '1–3 yr',        label: 'Warranty coverage'       },
  ],
  values: ['Reliability', 'Collaboration', 'Transparency', 'Development', 'Responsibility'],
  milestones: [
    { year: '2016', title: 'Service Business',       desc: 'Started as a service business under the COMPASS brand' },
    { year: '2019', title: 'Retail Expansion',       desc: 'Launched a computer store and service center' },
    { year: '2021', title: 'SOZLA Brand',            desc: 'Continued operations under the SOZLA brand' },
    { year: '2024', title: 'Wholesale Distribution', desc: 'Started wholesale distribution of imported products (BIKON brand)' },
    { year: '2025', title: 'Local Production',       desc: 'Launched local production (BIKON brand)' },
  ],
  final_quote: "BIKON is not just a computer hardware manufacturer. It is a technology brand contributing to Uzbekistan's digital development, creating new jobs, and building an innovative ecosystem.",
};

async function seedProductPages(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::product-page.product-page').findMany({ locale: 'en' });
  const existingSlugs = new Set(existing.map((p: any) => p.slug));

  for (const page of SEED_PAGES) {
    if (existingSlugs.has(page.slug)) continue;
    await strapi.documents('api::product-page.product-page').create({
      data: page as any,
      locale: 'en',
      status: 'published',
    });
    console.log(`[seed] product-page created: ${page.slug}`);
  }
}

async function seedAboutPage(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::about-page.about-page').findFirst({ locale: 'en' });
  if (existing) return;

  await strapi.documents('api::about-page.about-page').create({
    data: ABOUT_SEED as any,
    locale: 'en',
    status: 'published',
  });
  console.log('[seed] about-page created');
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedProductPages(strapi);
    await seedAboutPage(strapi);
  },
};
