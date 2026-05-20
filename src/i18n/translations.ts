export type Lang = 'en' | 'ru' | 'uz';

const t = {
  en: {
    /* ── Navbar ─────────────────────────────────────────────────────── */
    nav: {
      home: 'Home',
      laptops: 'Laptops',
      aios: 'AiOs',
      cases: 'Cases',
      monitors: 'Monitors',
      contact: 'Contact',
      blog: 'Blog',
      about: 'About',
    },

    /* ── About Page ──────────────────────────────────────────────────── */
    about: {
      badge: 'About Us · Since 2015',
      hero_sub: 'Modern and trusted technology brand in Uzbekistan, founded in 2015 and based in Tashkent.',
      story_label: 'Our Story',
      story_title: "Building Uzbekistan's Technology Future",
      story_body: 'Founded in 2015 and based in Tashkent, BIKON provides high-quality and affordable computer equipment for individuals, businesses, and government institutions. Our products are designed to meet real local needs while complying with global standards.',
      stat1_n: '10+',      stat1_label: 'Years of experience',
      stat2_n: 'B2B · B2G · B2C', stat2_label: 'Market segments served',
      stat3_n: '1–3 yr',   stat3_label: 'Warranty coverage',
      mission_label: '🚀 Our Mission',
      mission_quote: '"Our mission is to provide reliable, convenient, and cost-effective technology solutions for every user and business. We aim to become Uzbekistan\'s most trusted technology brand by combining quality, service, and affordability."',
      what_label: '💡 What We Do',
      what_title: 'End-to-End Technology Solutions',
      what_summary: 'We combine globally sourced components with local production expertise to deliver powerful, efficient, and reliable technology solutions.',
      what_cards: [
        { icon: '🏭', title: 'Manufacturing',    body: 'Manufacturing and localization of computers and laptops.' },
        { icon: '🏢', title: 'Corporate Sales',  body: 'Corporate sales (B2B and B2G segments).' },
        { icon: '🛒', title: 'Retail Sales',     body: 'Retail sales (B2C via marketplaces and official website).' },
        { icon: '🛠', title: 'Service & Support', body: 'Service and warranty support (1 to 3 years warranty).' },
      ],
      why_label: '⭐ Why Choose BIKON?',
      why_title: 'Six Pillars of Trust',
      why_items: [
        'Experience since 2015 and strong market reputation',
        'Transparent business processes',
        'Efficient and reliable logistics',
        'Qualified and experienced team',
        'Digitalized processes (CRM, ERP, automation systems)',
        'Official service centers and technical support',
      ],
      values_label: 'Our Values',
      values: ['Reliability', 'Collaboration', 'Transparency', 'Development', 'Responsibility'],
      future_label: 'Our Future Goals',
      future_title: "Where We're Headed",
      future_goals: [
        'Expanding local production capabilities',
        'Increasing the number of service centers',
        'Entering Central Asian and global markets',
        'Promoting the "Made in Uzbekistan" brand',
      ],
      global_title: 'Global Reach, Local Roots',
      global_body: 'From the streets of Tashkent to Central Asia and beyond — we\'re building technology infrastructure that empowers every user, business, and institution.',
      global_tags: ['🇺🇿 Uzbekistan', '🌐 Central Asia', '🚀 Global Markets'],
      final_quote: 'BIKON is not just a computer hardware manufacturer. It is a technology brand contributing to Uzbekistan\'s digital development, creating new jobs, and building an innovative ecosystem.',
    },

    /* ── Hero ───────────────────────────────────────────────────────── */
    hero: {
      eyebrow: 'National Brand',
      title1: 'BIKON',
      title2: 'Engineered for',
      title3: 'the Future.',
      subtitle: 'Quality devices crafted to world standards — engineered for performance, designed to inspire.',
      cta_primary: 'Learn More',
      cta_secondary: 'Explore Products',
      badge1: '12 Months Warranty',
      badge2: 'Free Shipping',
      badge3: "Uzbekistan's #1",
    },

    /* ── Category Grid ──────────────────────────────────────────────── */
    categories: {
      eyebrow: 'Products',
      title_light: 'Explore ',
      title_bold: 'Categories',
      learn_more: 'Learn more',
      footer_note: 'All products locally assembled in Uzbekistan · 12-Month Official Warranty',
      items: [
        { series: 'SMARTBOOK SERIES', title: 'Laptops' },
        { series: 'MATRIX SERIES', title: 'All-in-Ones' },
        { series: 'VISION PRO SERIES', title: 'Monitors' },
        { series: 'PHANTOM SERIES', title: 'Cases' },
      ],
    },

    /* ── Catalog Section ────────────────────────────────────────────── */
    catalog: {
      eyebrow: 'Resources',
      title_light: 'Download our ',
      title_bold: '2026 Catalog',
      body: 'Explore the full Bikon product line — detailed specifications, pricing, and configuration options for every device we make.',
      button: 'Download PDF',
    },

    /* ── Why Bikon (TrustSection) ───────────────────────────────────── */
    trust: {
      eyebrow: 'Why Choose Us',
      title_light: 'Why ',
      title_bold: 'Bikon?',
      subtitle: 'Quality and trust are our highest priority. Every device is backed by hard work and constant innovation.',
      features: [
        { title: 'Local Assembly & Service', desc: 'Quality hardware locally assembled and serviced in Uzbekistan for maximum reliability.' },
        { title: 'Optimal Price & Quality', desc: 'The perfect balance of world-class specifications and competitive market pricing.' },
        { title: '12-Month Warranty & National Support', desc: '12-month warranty backed by service centers across the entire republic.' },
        { title: 'Stable Logistics & Fast Delivery', desc: 'Reliable supply chain and prompt delivery so your order arrives on time, every time.' },
      ],
    },

    /* ── Product Sections ───────────────────────────────────────────── */
    products: {
      eyebrow: 'Catalog',
      buy_now: 'Buy Now',
      learn_more: 'Learn More',
      data: [
        {
          title: 'Laptops',
          description: 'Designed to be light, fast, and reliable. Built for students and professionals, delivering smooth performance and long-lasting productivity.',
        },
        {
          title: 'All-in-Ones',
          description: 'Modern desktops built for performance and simplicity. Powered by Intel processors with vibrant IPS displays, perfect for work and everyday use.',
        },
        {
          title: 'Cases',
          description: 'Designed for modern PC builds, combining durability, airflow, and sleek aesthetics. Ideal for gaming setups and professional workstations.',
        },
        {
          title: 'Monitors',
          description: 'Delivering sharp visuals and accurate colors. Designed for professionals and everyday users who value clarity and reliability.',
        },
      ],
    },

    /* ── CTA / Bestseller ───────────────────────────────────────────── */
    cta: {
      badge: 'Top Rated',
      title1: 'Discover our',
      title2: 'Bestsellers.',
      body: 'Join thousands of users who have upgraded to Bikon. Professional power, engineered for Uzbekistan.',
      shop_now: 'Shop Now',
      view_all: 'View all →',
    },

    /* ── Monitors Page ──────────────────────────────────────────────── */
    monitors: {
      hero_eyebrow: 'Vision Series',
      hero_title: 'See Everything\nDifferently.',
      hero_subtitle: 'Engineered for clarity. Built for those who demand the best from every pixel.',
      hero_cta_primary: 'Explore Models',
      hero_cta_secondary: 'View Specs',
      hero_scroll: 'Scroll to reveal',

      lineup_eyebrow: 'Model Lineup',
      lineup_title: 'Choose Your Vision',
      lineup_vision_name: 'Bikon Vision',
      lineup_vision_tag: 'Essential Performance',
      lineup_vision_desc: 'An IPS panel with accurate colors and a slim profile — the ideal display for the modern workspace.',
      lineup_pro_name: 'Bikon Vision Pro',
      lineup_pro_tag: 'Professional Grade',
      lineup_pro_desc: 'Ultra-thin bezels, a signature V-shaped metallic stand, and fast response time for professionals who settle for nothing less.',
      lineup_badge_pro: 'PRO',
      lineup_learn: 'Learn More',

      features_eyebrow: 'Features',
      features_title: 'Every Detail,\nPerfected.',
      features: [
        {
          label: 'IPS Display',
          title: 'Crystal-Clear IPS Panel',
          desc: 'Factory-calibrated IPS panels deliver accurate, vivid colors from any angle — ideal for design, editing, and everyday work.',
        },
        {
          label: '75Hz',
          title: 'Smooth 75Hz Refresh Rate',
          desc: 'Fluid, tear-free motion whether you\'re scrolling through spreadsheets or watching high-definition video content.',
        },
        {
          label: '2.3mm Bezels',
          title: 'Ultra-Thin Bezels',
          desc: 'At just 2.3mm, the bezel steps aside so the image takes over — creating an immersive, near-edgeless viewing experience.',
        },
        {
          label: 'Ergonomics',
          title: 'Ergonomic Tilt & Stand',
          desc: 'Full -5° to +20° tilt range and the Vision Pro\'s signature V-shaped metallic stand let you dial in the perfect angle.',
        },
      ],

      specs_eyebrow: 'Specifications',
      specs_title: 'Technical Specifications',
      specs_vision_label: 'Bikon Vision',
      specs_pro_label: 'Bikon Vision Pro',
      specs_categories: [
        {
          name: 'Display',
          rows: [
            ['Panel Type',    'IPS',              'IPS'],
            ['Screen Size',   '22" / 24"',        '24" / 27"'],
            ['Resolution',    '1920×1080',        '1920×1080'],
            ['Refresh Rate',  '75Hz',             '75Hz'],
            ['Response Time', '0.5ms',             '5ms (GtG)'],
            ['Brightness',    '250 cd/m²',        '250 cd/m²'],
            ['Bezels',        'Standard',         '2.3mm Ultra-Thin'],
          ],
        },
        {
          name: 'Performance',
          rows: [
            ['Adaptive Sync', 'FreeSync',         'FreeSync'],
            ['Low Blue Light','✓',                '✓'],
            ['Flicker-Free',  '✓',                '✓'],
            ['Aspect Ratio',  '16:9',             '16:9'],
            ['Viewing Angle', '178° / 178°',      '178° / 178°'],
          ],
        },
        {
          name: 'Ergonomics',
          rows: [
            ['Tilt Range',    '-5° / +15°',       '-5° / +20°'],
            ['Stand Design',  'Standard Pedestal','V-Shape Metallic'],
            ['VESA Mount',    '100×100mm',        '100×100mm'],
            ['Cable Mgmt',    '—',                'Integrated'],
          ],
        },
        {
          name: 'Connectivity',
          rows: [
            ['HDMI',          '1× HDMI 1.4',      '1× HDMI 1.4'],
            ['VGA',           '1× VGA',           '1× VGA'],
            ['Audio Out',     '3.5mm AUX',        '3.5mm AUX'],
            ['Power',         'AC 100–240V',      'AC 100–240V'],
          ],
        },
      ],

      color_eyebrow: 'Display',
      color_title: 'Infinite Color',
      color_body: 'Factory-calibrated IPS panels reproduce 99% of the sRGB color space with stunning accuracy — so every image looks exactly as it should.',
      color_stats: [
        { value: '99%',   label: 'sRGB' },
        { value: '250',   label: 'cd/m²' },
        { value: '16.7M', label: 'Colors' },
      ],

      stand_eyebrow: 'Design',
      stand_title: 'The Iconic\nV-Stand',
      stand_body: 'Sculpted from aircraft-grade aluminum, the signature V-shaped stand turns every desk into a statement.',
      stand_pills: ['Aluminum Alloy', '-5° / +20° Tilt'],

      cta_title: 'Ready to Upgrade\nYour Display?',
      cta_body: 'Join thousands of professionals and gamers who have made the switch to Bikon Vision.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',
      bento_eyebrow: 'Key Features',
      bento_title: 'VISION SERIES DISPLAY TECHNOLOGY',
      ports_eyebrow: 'Connectivity',
      ports_title: 'Every connection\nyou need.',
      ports_body: 'Vision Series monitors come fully equipped — HDMI, D-SUB, and a 3.5mm AUX output built right in, so you can get set up in seconds.',
    },

    /* ── Laptops Page ───────────────────────────────────────────────── */
    laptops: {
      hero_eyebrow: 'Smartbook & Workbook Series',
      hero_title: 'Power That\nGoes With You.',
      hero_subtitle: 'Engineered for students, professionals, and creators. Light by design, powerful by nature.',
      hero_cta_primary: 'Explore Models',
      hero_cta_secondary: 'View Specs',
      hero_scroll: 'Scroll to reveal',

      built_eyebrow: 'Design',
      built_title: 'Built Different.',
      built_body: 'Precision-engineered to be remarkably thin and remarkably light — without compromising the performance you need.',
      built_stats: [
        { value: '1.8kg', label: 'Starting weight' },
        { value: '18mm', label: 'Slim profile' },
        { value: '8hr', label: 'Battery life' },
      ],

      features_eyebrow: 'Features',
      features_title: 'Every Feature,\nThought Through.',
      features: [
        {
          label: 'IPS Display',
          title: '15.6" Full HD\nIPS Display',
          desc: 'A factory-calibrated 15.6" Full HD IPS panel delivers vivid colors and sharp text — comfortable all day, every day.',
        },
        {
          label: 'Intel Core',
          title: 'Intel Core\nPerformance',
          desc: 'Powered by Intel Celeron to Core i-series — always the right engine for the task at hand.',
        },
        {
          label: 'All-Day Battery',
          title: 'Up to 8 Hours\nof Battery Life',
          desc: 'Take your work anywhere. With up to 8 hours of battery life, Bikon laptops keep up with your day.',
        },
        {
          label: 'Connectivity',
          title: 'Everything\nConnected',
          desc: 'Built-in Wi-Fi, Bluetooth, a wide array of ports, and a Full HD webcam — stay connected, always.',
        },
      ],

      lineup_eyebrow: 'Model Lineup',
      lineup_title: 'Choose Your\nPerfect Laptop',
      lineup_smartbook_name: 'Bikon Smartbook',
      lineup_smartbook_tag: 'Everyday Excellence',
      lineup_smartbook_desc: 'The ideal everyday laptop — lightweight, reliable, and built for students and everyday professionals.',
      lineup_workbook_name: 'Bikon Workbook',
      lineup_workbook_tag: 'Professional Power',
      lineup_workbook_desc: 'For professionals who demand more — a powerful processor, more RAM, and advanced connectivity in a slim chassis.',
      lineup_badge_pro: 'PRO',
      lineup_learn: 'Shop Now',

      specs_eyebrow: 'Specifications',
      specs_title: 'Technical Specifications',
      specs_smartbook_label: 'Smartbook',
      specs_workbook_label: 'Workbook',
      specs_categories: [
        {
          name: 'Display',
          rows: [
            ['Screen Size',   '15.6"',              '15.6"'],
            ['Resolution',    '1920×1080',          '1920×1080'],
            ['Panel Type',    'IPS',                'IPS'],
            ['Refresh Rate',  '60Hz',               '60Hz'],
            ['Brightness',    '220 nits',           '250 nits'],
          ],
        },
        {
          name: 'Performance',
          rows: [
            ['Processor',     'Intel Celeron N5095', 'Intel Core i5 / i7'],
            ['RAM',           '8GB DDR4',            '16GB DDR4'],
            ['Storage',       '256GB SSD',           '512GB NVMe SSD'],
            ['Graphics',      'Intel UHD',           'Intel Iris Xe'],
            ['OS',            'Windows 11',          'Windows 11 Pro'],
          ],
        },
        {
          name: 'Battery & Build',
          rows: [
            ['Battery',       '5000 mAh',           '6000 mAh'],
            ['Battery Life',  'Up to 7hr',          'Up to 8hr'],
            ['Weight',        '1.8 kg',             '1.9 kg'],
            ['Thickness',     '18mm',               '18mm'],
            ['Build',         'Plastic',            'Aluminum Alloy'],
          ],
        },
        {
          name: 'Connectivity',
          rows: [
            ['Wi-Fi',         'Wi-Fi 5',             'Wi-Fi 6'],
            ['Bluetooth',     'BT 5.0',              'BT 5.2'],
            ['USB Ports',     '2× USB-A, 1× USB-C',  '2× USB-A, 2× USB-C'],
            ['HDMI',          '1× HDMI 1.4',         '1× HDMI 2.0'],
            ['Webcam',        'Full HD 1080p',       'Full HD 1080p'],
            ['Audio',         '3.5mm Jack',          '3.5mm Jack'],
          ],
        },
      ],

      cta_title: 'Ready to Find\nYour Laptop?',
      cta_body: 'Smartbook or Workbook — both designed and assembled right here in Uzbekistan.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',
    },

    /* ── AIOs (Matrix + Optima) ─────────────────────────────────────── */
    aios: {
      hero_eyebrow: 'Matrix Series',
      hero_title: 'All-in-One.\nAll You Need.',
      hero_subtitle: 'Powerful Intel processors, vibrant IPS displays, and a sleek all-in-one design — built for the modern workplace.',
      hero_cta_primary: 'Explore Models',
      hero_cta_secondary: 'View Specs',
      hero_scroll: 'Scroll to explore',

      built_eyebrow: 'Designed for Work',
      built_title: 'Less Clutter.\nMore Power.',
      built_body: 'No tower, no tangle of cables. The Matrix series packs full desktop performance into a single slim panel — keeping your desk clean and your mind focused.',
      built_stats: [
        { value: '24"',   label: 'IPS Display'   },
        { value: 'i5/i7', label: 'Intel Core'     },
        { value: '1TB',   label: 'NVMe Storage'   },
        { value: '3yr',   label: 'Warranty'       },
      ],

      features_eyebrow: 'Features',
      features_title: 'Built Different,\nBuilt Better.',
      features: [
        { label: 'IPS Display',   title: 'Crystal-Clear IPS', desc: 'Full HD IPS panels calibrated for accurate colors and wide viewing angles — whether you\'re editing, presenting, or working all day.' },
        { label: 'Intel Core',    title: 'Performance Inside', desc: 'Intel Core i3 to i7 processors from the 12th–14th generation deliver responsive performance for every workload.' },
        { label: 'All-in-One',    title: 'One Device, Clean Desk', desc: 'CPU, display, speakers, and webcam in a single elegant panel. No extra boxes, no cable clutter.' },
        { label: 'Connectivity',  title: 'Stay Connected', desc: 'Wi-Fi 5/6, Bluetooth, HDMI, multiple USB ports, and a built-in Full HD webcam — everything you need, built in.' },
      ],

      compare_eyebrow: 'Model Lineup',
      compare_title: 'Matrix or Optima.\nYou Choose.',
      compare_matrix_name: 'Bikon Matrix',
      compare_matrix_tag: 'Essential Performance',
      compare_optima_name: 'Bikon Optima',
      compare_optima_tag: 'Professional Power',
      compare_rows: [
        { spec: 'Display',     matrix: '21.5" FHD IPS',      optima: '23.8" FHD IPS'       },
        { spec: 'Processor',   matrix: 'Intel Core i3',       optima: 'Intel Core i5 / i7'  },
        { spec: 'RAM',         matrix: '8 GB DDR4',           optima: '16 GB DDR4'           },
        { spec: 'Storage',     matrix: '256 GB SSD',          optima: '512 GB NVMe'          },
        { spec: 'Graphics',    matrix: 'Intel Integrated',    optima: 'Dedicated GPU option' },
        { spec: 'Webcam',      matrix: 'Full HD 1080p',       optima: 'Full HD 1080p'        },
        { spec: 'Wi-Fi',       matrix: 'Wi-Fi 5',             optima: 'Wi-Fi 6'              },
        { spec: 'OS',          matrix: 'Windows 11 Home',     optima: 'Windows 11 Pro'       },
        { spec: 'Warranty',    matrix: '1 Year',              optima: '3 Years'              },
      ],

      specs_eyebrow: 'Specifications',
      specs_title: 'Technical Specifications',
      specs_matrix_label: 'Matrix',
      specs_optima_label: 'Optima',
      specs_categories: [
        {
          name: 'Display',
          rows: [
            ['Screen Size',    '21.5"',           '23.8"'          ],
            ['Resolution',     '1920×1080 FHD',   '1920×1080 FHD'  ],
            ['Panel Type',     'IPS',             'IPS'            ],
            ['Brightness',     '250 nits',        '300 nits'       ],
            ['Viewing Angle',  '178°',            '178°'           ],
          ],
        },
        {
          name: 'Performance',
          rows: [
            ['Processor',  'Intel Core i3 (12th Gen)', 'Intel Core i5 / i7 (12–14th Gen)'],
            ['RAM',        '8 GB DDR4',                '16 GB DDR4'                       ],
            ['Storage',    '256 GB SSD',               '512 GB NVMe SSD'                  ],
            ['Graphics',   'Intel Iris Xe',             'Dedicated GPU option'             ],
          ],
        },
        {
          name: 'Connectivity',
          rows: [
            ['Wi-Fi',      'Wi-Fi 5 (802.11ac)',  'Wi-Fi 6 (802.11ax)' ],
            ['Bluetooth',  'BT 5.0',              'BT 5.2'             ],
            ['USB',        '3× USB-A, 1× USB-C',  '3× USB-A, 2× USB-C' ],
            ['HDMI',       '1× HDMI 1.4',         '1× HDMI 2.0'        ],
            ['Webcam',     'Full HD 1080p',        'Full HD 1080p'      ],
            ['Audio',      '3.5mm Jack',           '3.5mm Jack'         ],
          ],
        },
        {
          name: 'System',
          rows: [
            ['OS',           'Windows 11 Home', 'Windows 11 Pro' ],
            ['Warranty',     '1 Year',          '3 Years'        ],
            ['Origin',       'Made in Uzbekistan', 'Made in Uzbekistan'],
          ],
        },
      ],

      cta_title: 'Ready to Clear\nYour Desk?',
      cta_body: 'Matrix or Optima — both assembled in Uzbekistan and built to last.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',

      nova_teaser_eyebrow: 'Bikon NOVA',
      nova_teaser_title:   'Introducing\nBikon NOVA.',
      nova_teaser_body:    'Experience the NOVA — our all-in-one available in 24" and 27" IPS, powered by Intel Core i3/i5/i7 (12th–14th Gen), in a 20mm slim chassis.',
      nova_teaser_cta:     'Explore NOVA',

      models_eyebrow: 'Our AIO Lineup',
      models_title: 'Choose Your\nIdeal Model.',
      models_matrix_name: 'Matrix',
      models_matrix_tag: 'Modern Performance',
      models_matrix_desc: 'Intel 12th–14th Gen, DDR4, H610 chipset — built for today\'s workplace.',
      models_optima_name: 'Optima',
      models_optima_tag: 'Proven Reliability',
      models_optima_desc: 'Intel 2nd–3rd Gen, DDR3, H61 chipset — solid performance at an accessible price.',
      models_nova_name: 'NOVA',
      models_nova_tag: 'Premium Flagship',
      models_nova_desc: '20mm slim aluminum, Wi-Fi 6, Intel 12th–14th Gen — the most refined AIO from Bikon.',
      models_explore: 'Explore',
    },

    /* ── NOVA ───────────────────────────────────────────────────────── */
    nova: {
      hero_eyebrow: 'Bikon NOVA',
      hero_title: 'Designed for the\nModern Workplace.',
      hero_subtitle: 'The NOVA redefines what an all-in-one can be — a refined, powerful desktop built for professionals who demand the best.',
      hero_cta_primary: 'Explore NOVA',
      hero_cta_secondary: 'Specifications',

      lineup_eyebrow: 'Model Lineup',
      lineup_title: 'Meet the\nBikon NOVA.',
      lineup_nova_name: 'Bikon NOVA',
      lineup_nova_tag: 'All-in-One Desktop',
      lineup_nova_desc: 'A 24" or 27" IPS display, Intel Core i3/i5/i7 (12th–14th Gen), DDR4 memory up to 16 GB, and a 20 mm CNC-aluminum chassis — NOVA adapts to every need.',
      lineup_nova_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 up to 16 GB', '20 mm Slim'],
      lineup_learn: 'Shop Now',

      specs_eyebrow: 'Specifications',
      specs_title: 'Technical Specifications',
      specs_label: 'Bikon NOVA',
      specs_categories: [
        {
          name: 'Display',
          rows: [
            ['Screen Size',    '24" / 27"',                   '—'],
            ['Resolution',     '1920×1080 / 2560×1440',       '—'],
            ['Panel Type',     'IPS',                         '—'],
            ['Refresh Rate',   '75 Hz',                       '—'],
            ['Brightness',     '300–350 nits',                '—'],
            ['Viewing Angle',  '178°',                        '—'],
          ],
        },
        {
          name: 'Performance',
          rows: [
            ['Processor',   'Intel Core i3 / i5 / i7 (12th–14th Gen)', '—'],
            ['Motherboard', 'H610 · Socket LGA 1700',                   '—'],
            ['RAM',         'DDR4  4 / 8 / 16 GB',                      '—'],
            ['Storage',     '128 / 256 / 512 / 1024 GB NVMe SSD',       '—'],
            ['Graphics',    'Intel UHD 730 / 770',                      '—'],
          ],
        },
        {
          name: 'Connectivity',
          rows: [
            ['Wi-Fi',      'Wi-Fi 6 (802.11ax)',   '—'],
            ['Bluetooth',  'BT 5.2',               '—'],
            ['USB',        '4× USB-A, 2× USB-C',   '—'],
            ['HDMI',       '1× HDMI 2.0',          '—'],
            ['Webcam',     'Full HD 1080p',         '—'],
            ['Audio',      '3.5mm Jack + Speakers', '—'],
          ],
        },
        {
          name: 'Design',
          rows: [
            ['Chassis',    'CNC Aluminum',          '—'],
            ['Profile',    '20 mm slim',            '—'],
            ['OS',         'Windows 11 Pro',        '—'],
            ['Warranty',   '12 Months',             '—'],
            ['Origin',     'Made in Uzbekistan',    '—'],
          ],
        },
      ],

      cta_title: 'Elevate Your\nWorkspace.',
      cta_body: 'The NOVA. Assembled in Uzbekistan. Built for wherever your work takes you.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',

      display_eyebrow: 'Crystal-Clear Display',
      display_title: '27" QHD IPS.\nEvery Detail, Vivid.',
      display_body: 'The NOVA ships with a 27-inch QHD IPS panel delivering 2560×1440 resolution, 99% sRGB color accuracy, and a 75 Hz refresh rate — engineered to make every pixel count from the first glance.',
      display_title_24: '24" FHD IPS.\nPerfect for every desk.',
      display_body_24: 'The compact NOVA 24 features a 1920×1080 Full HD IPS panel with 99% sRGB color accuracy and a 75 Hz refresh rate — vibrant, focused, and right-sized for any workspace.',

      back_eyebrow: 'Thoughtful Engineering',
      back_title: 'Refined.\nFrom Every Angle.',
      back_body: 'The rear of the NOVA is as considered as the front. A slim 20 mm aluminum chassis houses all connectivity — HDMI, USB-A, USB-C, and audio — with clean cable routing so nothing interrupts your workspace.',

      vertical_eyebrow: 'Portrait Mode',
      vertical_title: 'Rotate.\nWork Differently.',
      vertical_body: 'The NOVA stand supports full 90° portrait rotation — ideal for coding, reading long documents, or working with vertical layouts. One smooth pivot transforms your entire workflow.',

      apps_eyebrow: 'Built for Windows',
      apps_title: 'Windows 11.\nLet your apps fly.',
      apps_body: 'NOVA ships with Windows 11 Pro pre-installed and ready to go — Word, Excel, PowerPoint, Teams, and thousands of apps run flawlessly on a 24" or 27" IPS display built for productivity.',

      bento_eyebrow: 'Key Features',
      bento_title: 'NOVA ALL-IN-ONE TECHNOLOGY',
      connectivity_eyebrow: 'Connectivity',
      connectivity_title: 'Every port\nyou need.',
      connectivity_body: 'NOVA packs everything into its slim 20mm frame — from high-speed USB-C to HDMI 2.0 video output, so you stay connected without compromise.',
      cam_eyebrow: 'Built-in Essentials',
      cam_title: 'See clearly.\nHear everything.',
      cam_body: 'A Full HD webcam and dual stereo speakers are built right in — crisp video calls and immersive audio, no extra hardware needed.',
    },

    /* ── Matrix Page ─────────────────────────────────────────────────── */
    matrix: {
      hero_eyebrow: 'Bikon Matrix',
      hero_title: 'Performance\nMade Accessible.',
      hero_subtitle: 'The Matrix brings Intel 12th–14th Gen power, DDR4 memory, and a 24" or 27" IPS display into one clean all-in-one package.',
      hero_cta_primary: 'Explore Matrix',
      hero_cta_secondary: 'Specifications',

      lineup_eyebrow: 'Model Lineup',
      lineup_title: 'Meet the\nBikon Matrix.',
      lineup_name: 'Bikon Matrix',
      lineup_tag: 'All-in-One Desktop',
      lineup_desc: 'A 24" or 27" IPS display, Intel Core i3/i5/i7 (12th–14th Gen), DDR4 memory up to 16 GB — reliable performance in one compact unit.',
      lineup_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 up to 16 GB', 'H610 Chipset'],
      lineup_learn: 'Shop Now',

      specs_eyebrow: 'Specifications',
      specs_title: 'Technical Specifications',
      specs_label: 'Bikon Matrix',
      specs_categories: [
        {
          name: 'Display',
          rows: [
            ['Screen Size',   '24" / 27"',                   '—'],
            ['Resolution',    '1920×1080 / 2560×1440',       '—'],
            ['Panel Type',    'IPS',                         '—'],
            ['Refresh Rate',  '75 Hz',                       '—'],
            ['Brightness',    '300–350 nits',                '—'],
            ['Viewing Angle', '178°',                        '—'],
          ],
        },
        {
          name: 'Performance',
          rows: [
            ['Processor',   'Intel Core i3 / i5 / i7 (12th–14th Gen)', '—'],
            ['Motherboard', 'H610 · Socket LGA 1700',                   '—'],
            ['RAM',         'DDR4  4 / 8 / 16 GB',                      '—'],
            ['Storage',     '128 / 256 / 512 / 1024 GB NVMe SSD',       '—'],
            ['Graphics',    'Intel UHD 730 / 770',                      '—'],
          ],
        },
        {
          name: 'Connectivity',
          rows: [
            ['Wi-Fi',     'Wi-Fi 6 (802.11ax)',    '—'],
            ['Bluetooth', 'BT 5.0',                '—'],
            ['USB',       '4× USB-A, 1× USB-C',    '—'],
            ['HDMI',      '1× HDMI 2.0',           '—'],
            ['Webcam',    'Full HD 1080p',          '—'],
            ['Audio',     '3.5mm Jack + Speakers', '—'],
          ],
        },
        {
          name: 'Design',
          rows: [
            ['OS',      'Windows 11 Pro',        '—'],
            ['Warranty','12 Months',             '—'],
            ['Origin',  'Made in Uzbekistan',    '—'],
          ],
        },
      ],

      cta_title: 'Ready to Work?\nThat\'s Matrix.',
      cta_body: 'The Matrix. Assembled in Uzbekistan. Built for everyday performance.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',

      display_eyebrow: 'IPS Display',
      display_title: '27" QHD IPS.\nExpand Your View.',
      display_body: 'The Matrix 27" QHD IPS panel delivers 2560×1440 resolution and a 75 Hz refresh rate — crystal-clear visuals for every task.',
      display_title_24: '24" FHD IPS.\nClean & Focused.',
      display_body_24: 'The Matrix 24" Full HD IPS panel brings 1920×1080 resolution and 75 Hz refresh rate — vibrant and accurate for any workspace.',

      back_eyebrow: 'Thoughtful Design',
      back_title: 'Clean Cables.\nClean Desk.',
      back_body: 'The Matrix rear panel organizes every connection — HDMI, USB-A, USB-C, and audio — cleanly and accessibly, keeping your workspace tidy.',

      apps_eyebrow: 'Built for Windows',
      apps_title: 'Windows 11.\nReady from day one.',
      apps_body: 'Matrix ships with Windows 11 Pro pre-installed — Word, Excel, Teams, and thousands of apps run flawlessly on a 24" or 27" IPS display.',

      bento_eyebrow: 'Key Features',
      bento_title: 'MATRIX ALL-IN-ONE TECHNOLOGY',

      connectivity_eyebrow: 'Connectivity',
      connectivity_title: 'Every port\nyou need.',
      connectivity_body: 'Matrix keeps you connected — HDMI 2.0, USB-C, multiple USB-A ports, Wi-Fi 6, and Bluetooth 5.0, all in one unit.',

      cam_eyebrow: 'Built-in Essentials',
      cam_title: 'See clearly.\nHear everything.',
      cam_body: 'A Full HD webcam and dual stereo speakers are built right in — crisp video calls and immersive audio, no extra hardware needed.',
    },

    /* ── Optima Page ─────────────────────────────────────────────────── */
    optima: {
      hero_eyebrow: 'Bikon Optima',
      hero_title: 'Reliable Power.\nEveryday Ready.',
      hero_subtitle: 'The Optima delivers proven Intel Core performance, DDR3 memory, and a 24" or 27" IPS display — trusted computing at an accessible price.',
      hero_cta_primary: 'Explore Optima',
      hero_cta_secondary: 'Specifications',

      lineup_eyebrow: 'Model Lineup',
      lineup_title: 'Meet the\nBikon Optima.',
      lineup_name: 'Bikon Optima',
      lineup_tag: 'All-in-One Desktop',
      lineup_desc: 'A 24" or 27" IPS display, Intel Core i3/i5/i7 (2nd–3rd Gen), DDR3 memory up to 16 GB — solid everyday computing at a great value.',
      lineup_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR3 up to 16 GB', 'H61 Chipset'],
      lineup_learn: 'Shop Now',

      specs_eyebrow: 'Specifications',
      specs_title: 'Technical Specifications',
      specs_label: 'Bikon Optima',
      specs_categories: [
        {
          name: 'Display',
          rows: [
            ['Screen Size',   '24" / 27"',                   '—'],
            ['Resolution',    '1920×1080 / 2560×1440',       '—'],
            ['Panel Type',    'IPS',                         '—'],
            ['Refresh Rate',  '75 Hz',                       '—'],
            ['Brightness',    '300–350 nits',                '—'],
            ['Viewing Angle', '178°',                        '—'],
          ],
        },
        {
          name: 'Performance',
          rows: [
            ['Processor',   'Intel Core i3 / i5 / i7 (2nd–3rd Gen)', '—'],
            ['Motherboard', 'H61 · Socket LGA 1155',                  '—'],
            ['RAM',         'DDR3  4 / 8 / 16 GB',                    '—'],
            ['Storage',     '128 / 256 / 512 / 1024 GB SSD',          '—'],
            ['Graphics',    'Intel HD Graphics 2000 / 4000',          '—'],
          ],
        },
        {
          name: 'Connectivity',
          rows: [
            ['Wi-Fi',     'Wi-Fi (802.11n)',       '—'],
            ['Bluetooth', 'BT 4.0',                '—'],
            ['USB',       '4× USB-A, 1× USB-C',    '—'],
            ['HDMI',      '1× HDMI 1.4',           '—'],
            ['Webcam',    'Full HD 1080p',          '—'],
            ['Audio',     '3.5mm Jack + Speakers', '—'],
          ],
        },
        {
          name: 'Design',
          rows: [
            ['OS',      'Windows 10 / 11 Pro',   '—'],
            ['Warranty','12 Months',             '—'],
            ['Origin',  'Made in Uzbekistan',    '—'],
          ],
        },
      ],

      cta_title: 'Smart Choice.\nBikon Optima.',
      cta_body: 'The Optima. Assembled in Uzbekistan. Reliable computing that stands the test of time.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',

      display_eyebrow: 'IPS Display',
      display_title: '27" QHD IPS.\nExpand Your View.',
      display_body: 'The Optima 27" QHD IPS panel brings clear 2560×1440 resolution at 75 Hz — sharp and vibrant for work and everyday use.',
      display_title_24: '24" FHD IPS.\nPrecise & Clear.',
      display_body_24: 'The Optima 24" Full HD IPS panel provides crisp 1920×1080 visuals at 75 Hz — reliable clarity for every task.',

      back_eyebrow: 'Accessible Design',
      back_title: 'Everything\nWhere You Need It.',
      back_body: 'The Optima\'s rear panel places every port — HDMI, USB-A, and audio — right where you need them, making setup and daily use effortless.',

      apps_eyebrow: 'Built for Windows',
      apps_title: 'Windows 11.\nFamiliar & Ready.',
      apps_body: 'Optima ships with Windows 11 Pro pre-installed — compatible with all your essential apps and ready to go right out of the box.',

      bento_eyebrow: 'Key Features',
      bento_title: 'OPTIMA ALL-IN-ONE TECHNOLOGY',

      connectivity_eyebrow: 'Connectivity',
      connectivity_title: 'Every port\nyou need.',
      connectivity_body: 'Optima keeps you connected — HDMI 1.4, VGA, multiple USB-A ports, Wi-Fi, and Bluetooth, all built in for easy connectivity.',

      cam_eyebrow: 'Built-in Essentials',
      cam_title: 'See clearly.\nHear everything.',
      cam_body: 'A Full HD webcam and dual stereo speakers are built right in — ready for video calls and everyday audio without extra hardware.',
    },

    /* ── Blog ───────────────────────────────────────────────────────── */
    blog: {
      hero_eyebrow: 'Blog & Insights',
      hero_title: 'News &\nUseful Tips',
      hero_subtitle: 'Product updates, tech guides, and advice from the Bikon team.',
      all_label: 'All',
      read_more: 'Read Article',
      min_read: 'min read',
      featured_badge: 'Featured',
      categories: ['All', 'News', 'Guide', 'Tips', 'Review'],
      posts: [
        {
          id: 'nova-2026',
          category: 'News',
          date: 'May 10, 2026',
          title: 'NOVA AIO: Designed for the Modern Workplace',
          excerpt: 'We are proud to introduce the NOVA All-in-One — a sleek, powerful machine built for professionals who demand both elegance and performance at their desk.',
          read_time: '4',
          featured: true,
        },
        {
          id: 'matrix-vs-optima',
          category: 'Guide',
          date: 'Apr 28, 2026',
          title: 'Matrix vs Optima: Which AIO Is Right for You?',
          excerpt: 'Both are powerful all-in-ones from Bikon, but they serve different users. Here is a detailed comparison to help you decide which model fits your needs best.',
          read_time: '6',
          featured: false,
        },
        {
          id: 'smartbook-review',
          category: 'Review',
          date: 'Apr 15, 2026',
          title: 'Smartbook Series: Power Meets Portability',
          excerpt: 'After months of real-world testing, here is our honest take on the Bikon Smartbook — what makes it stand out in the mid-range laptop segment.',
          read_time: '7',
          featured: false,
        },
        {
          id: 'catalog-2026',
          category: 'News',
          date: 'Apr 1, 2026',
          title: 'Bikon 2026 Full Product Catalog Is Now Available',
          excerpt: 'Download the complete 2026 catalog featuring all Bikon product lines — detailed specs, pricing options, and configuration guides for B2B and B2C buyers.',
          read_time: '2',
          featured: false,
        },
        {
          id: 'office-setup',
          category: 'Tips',
          date: 'Mar 20, 2026',
          title: '5 Tips for the Perfect Bikon-Powered Office Setup',
          excerpt: 'From cable management to monitor height — small tweaks that make a huge difference to your comfort and productivity over a full workday.',
          read_time: '5',
          featured: false,
        },
        {
          id: 'pc-maintenance',
          category: 'Tips',
          date: 'Mar 5, 2026',
          title: 'How to Keep Your PC Running Like New',
          excerpt: 'Dust, heat, and software bloat are the three biggest enemies of PC performance. Here are practical steps to maintain your machine and extend its lifespan.',
          read_time: '5',
          featured: false,
        },
      ],
    },

    /* ── Footer ─────────────────────────────────────────────────────── */
    footer: {
      tagline: 'Quality technology, proudly engineered in Uzbekistan. Building the future together.',
      copyright: '© 2026 Bikon.uz. Handcrafted in UZ.',
      cols: [
        {
          heading: 'Products',
          links: ['Laptops', 'All-in-Ones', 'Cases', 'Monitors'],
        },
        {
          heading: 'About Bikon',
          links: ['Company', 'Careers', 'News', 'Contact'],
        },
        {
          heading: 'Support',
          links: ['How to Buy', 'Shipping', 'Warranty', 'Service Centers'],
        },
      ],
      legal: ['Privacy', 'Terms', 'Sitemap'],
    },
  },

  /* ════════════════════════════════════════════════════════════════════
     RUSSIAN
  ════════════════════════════════════════════════════════════════════ */
  ru: {
    nav: {
      home: 'Главная',
      laptops: 'Ноутбуки',
      aios: 'МоноПК',
      cases: 'Корпуса',
      monitors: 'Мониторы',
      contact: 'Контакт',
      blog: 'Блог',
      about: 'О нас',
    },

    about: {
      badge: 'О нас · С 2015 года',
      hero_sub: 'Современный и надёжный технологический бренд Узбекистана, основанный в 2015 году в Ташкенте.',
      story_label: 'Наша история',
      story_title: 'Строим технологическое будущее Узбекистана',
      story_body: 'Основанная в 2015 году в Ташкенте, компания BIKON предоставляет высококачественную и доступную компьютерную технику частным лицам, предприятиям и государственным учреждениям. Наши продукты разработаны для удовлетворения реальных местных потребностей при соблюдении мировых стандартов.',
      stat1_n: '10+',               stat1_label: 'Лет опыта',
      stat2_n: 'B2B · B2G · B2C',  stat2_label: 'Рыночные сегменты',
      stat3_n: '1–3 года',          stat3_label: 'Гарантийное покрытие',
      mission_label: '🚀 Наша миссия',
      mission_quote: '«Наша миссия — предоставлять надёжные, удобные и экономически эффективные технологические решения для каждого пользователя и бизнеса. Мы стремимся стать самым надёжным технологическим брендом Узбекистана, сочетая качество, сервис и доступность.»',
      what_label: '💡 Чем мы занимаемся',
      what_title: 'Комплексные технологические решения',
      what_summary: 'Мы сочетаем глобально закупаемые компоненты с местной производственной экспертизой для создания мощных, эффективных и надёжных технологических решений.',
      what_cards: [
        { icon: '🏭', title: 'Производство',          body: 'Производство и локализация компьютеров и ноутбуков.' },
        { icon: '🏢', title: 'Корпоративные продажи', body: 'Корпоративные продажи (сегменты B2B и B2G).' },
        { icon: '🛒', title: 'Розничные продажи',     body: 'Розничные продажи (B2C через маркетплейсы и официальный сайт).' },
        { icon: '🛠', title: 'Сервис и поддержка',    body: 'Сервисная и гарантийная поддержка (гарантия от 1 до 3 лет).' },
      ],
      why_label: '⭐ Почему BIKON?',
      why_title: 'Шесть столпов доверия',
      why_items: [
        'Опыт с 2015 года и сильная репутация на рынке',
        'Прозрачные бизнес-процессы',
        'Эффективная и надёжная логистика',
        'Квалифицированная и опытная команда',
        'Цифровизированные процессы (CRM, ERP, системы автоматизации)',
        'Официальные сервисные центры и техническая поддержка',
      ],
      values_label: 'Наши ценности',
      values: ['Надёжность', 'Сотрудничество', 'Прозрачность', 'Развитие', 'Ответственность'],
      future_label: 'Наши цели',
      future_title: 'Наш путь вперёд',
      future_goals: [
        'Расширение местных производственных мощностей',
        'Увеличение количества сервисных центров',
        'Выход на рынки Центральной Азии и мира',
        'Продвижение бренда «Сделано в Узбекистане»',
      ],
      global_title: 'Глобальный охват, местные корни',
      global_body: 'От улиц Ташкента до Центральной Азии и за её пределы — мы строим технологическую инфраструктуру для каждого пользователя, бизнеса и учреждения.',
      global_tags: ['🇺🇿 Узбекистан', '🌐 Центральная Азия', '🚀 Мировые рынки'],
      final_quote: 'BIKON — это не просто производитель компьютерного оборудования. Это технологический бренд, вносящий вклад в цифровое развитие Узбекистана, создающий новые рабочие места и формирующий инновационную экосистему.',
    },
    hero: {
      eyebrow: 'Национальный Бренд',
      title1: 'BIKON',
      title2: 'Создан для',
      title3: 'будущего.',
      subtitle: 'Качественные устройства по мировым стандартам — для производительности и вдохновения.',
      cta_primary: 'Узнать больше',
      cta_secondary: 'Смотреть продукты',
      badge1: 'Гарантия 12 месяцев',
      badge2: 'Бесплатная доставка',
      badge3: '№1 в Узбекистане',
    },
    categories: {
      eyebrow: 'Продукты',
      title_light: 'Исследуйте ',
      title_bold: 'категории',
      learn_more: 'Подробнее',
      footer_note: 'Все устройства собраны в Узбекистане · Гарантия 12 месяцев',
      items: [
        { series: 'СЕРИЯ SMARTBOOK', title: 'Ноутбуки' },
        { series: 'СЕРИЯ MATRIX', title: 'Моноблок' },
        { series: 'СЕРИЯ VISION PRO', title: 'Мониторы' },
        { series: 'СЕРИЯ PHANTOM', title: 'Корпуса' },
      ],
    },
    catalog: {
      eyebrow: 'Ресурсы',
      title_light: 'Скачайте наш ',
      title_bold: 'каталог 2026',
      body: 'Ознакомьтесь с полной линейкой Bikon — детальные характеристики, цены и варианты конфигурации.',
      button: 'Скачать PDF',
    },
    trust: {
      eyebrow: 'Почему мы',
      title_light: 'Почему ',
      title_bold: 'Bikon?',
      subtitle: 'Качество и доверие — наш главный приоритет. За каждым устройством — большой труд и инновации.',
      features: [
        { title: 'Локальная сборка и сервис', desc: 'Качественное оборудование, собранное и обслуживаемое локально в Узбекистане.' },
        { title: 'Оптимальное соотношение цены и качества', desc: 'Идеальный баланс мировых характеристик и конкурентных цен.' },
        { title: '12 месяцев гарантии и сервисные центры по всей республике', desc: '12-месячная гарантия и сеть сервисных центров по всей стране.' },
        { title: 'Стабильная логистика и оперативные поставки', desc: 'Надёжная цепочка поставок и быстрая доставка — ваш заказ прибудет вовремя.' },
      ],
    },
    products: {
      eyebrow: 'Каталог',
      buy_now: 'Купить',
      learn_more: 'Подробнее',
      data: [
        {
          title: 'Ноутбуки',
          description: 'Лёгкие, быстрые и надёжные устройства. Созданы для студентов и профессионалов, обеспечивая плавную работу и долгий заряд аккумулятора.',
        },
        {
          title: 'Моноблок',
          description: 'Современные компьютеры для продуктивной работы. Процессоры Intel с яркими IPS-дисплеями — идеально для работы и повседневного использования.',
        },
        {
          title: 'Корпуса',
          description: 'Созданы для современных ПК-сборок: прочность, эффективное охлаждение и стильный дизайн. Идеальны для игровых и рабочих станций.',
        },
        {
          title: 'Мониторы',
          description: 'Чёткая картинка и точная цветопередача. Для профессионалов и обычных пользователей, ценящих ясность и надёжность.',
        },
      ],
    },
    cta: {
      badge: 'Топ продаж',
      title1: 'Откройте для себя',
      title2: 'бестселлеры.',
      body: 'Тысячи пользователей уже перешли на Bikon. Профессиональная мощь для Узбекистана.',
      shop_now: 'В магазин',
      view_all: 'Смотреть все →',
    },
    monitors: {
      hero_eyebrow: 'Серия Vision',
      hero_title: 'Смотрите иначе.',
      hero_subtitle: 'Создан для чёткости. Для тех, кто требует лучшего от каждого пикселя.',
      hero_cta_primary: 'Смотреть модели',
      hero_cta_secondary: 'Характеристики',
      hero_scroll: 'Прокрутите вниз',

      lineup_eyebrow: 'Линейка моделей',
      lineup_title: 'Выберите свой Vision',
      lineup_vision_name: 'Bikon Vision',
      lineup_vision_tag: 'Базовая производительность',
      lineup_vision_desc: 'IPS-матрица с точной цветопередачей и тонким корпусом — идеальный дисплей для современного рабочего места.',
      lineup_pro_name: 'Bikon Vision Pro',
      lineup_pro_tag: 'Профессиональный уровень',
      lineup_pro_desc: 'Ультратонкие рамки, фирменная V-образная металлическая подставка и быстрое время отклика для тех, кто не идёт на компромисс.',
      lineup_badge_pro: 'PRO',
      lineup_learn: 'Подробнее',

      features_eyebrow: 'Возможности',
      features_title: 'Каждая деталь\nпродумана.',
      features: [
        {
          label: 'IPS-матрица',
          title: 'Кристально чистая IPS-панель',
          desc: 'Заводски откалиброванные IPS-матрицы обеспечивают точную яркую цветопередачу под любым углом — идеально для дизайна, монтажа и повседневной работы.',
        },
        {
          label: '75 Гц',
          title: 'Плавная частота обновления 75 Гц',
          desc: 'Плавное изображение без разрывов при прокрутке таблиц или просмотре видео высокой чёткости.',
        },
        {
          label: 'Рамки 2.3 мм',
          title: 'Ультратонкие рамки',
          desc: 'Рамка всего 2.3 мм делает изображение главным — создавая захватывающий, почти безрамочный визуальный опыт.',
        },
        {
          label: 'Эргономика',
          title: 'Эргономичный наклон и подставка',
          desc: 'Диапазон наклона -5°...+20° и фирменная V-образная металлическая подставка Vision Pro позволяют настроить идеальный угол обзора.',
        },
      ],

      specs_eyebrow: 'Спецификации',
      specs_title: 'Технические характеристики',
      specs_vision_label: 'Bikon Vision',
      specs_pro_label: 'Bikon Vision Pro',
      specs_categories: [
        {
          name: 'Дисплей',
          rows: [
            ['Тип матрицы',      'IPS',                 'IPS'],
            ['Диагональ',        '22" / 24"',           '24" / 27"'],
            ['Разрешение',       '1920×1080',           '1920×1080'],
            ['Частота обновл.',  '75 Гц',               '75 Гц'],
            ['Время отклика',    '0,5 мс',              '5 мс (GtG)'],
            ['Яркость',          '250 кд/м²',           '250 кд/м²'],
            ['Рамки',            'Стандартные',         '2.3 мм ультратонкие'],
          ],
        },
        {
          name: 'Производительность',
          rows: [
            ['Адапт. синхронизация', 'FreeSync',        'FreeSync'],
            ['Фильтр синего света',  '✓',               '✓'],
            ['Flicker-Free',         '✓',               '✓'],
            ['Соотношение сторон',   '16:9',            '16:9'],
            ['Угол обзора',          '178° / 178°',     '178° / 178°'],
          ],
        },
        {
          name: 'Эргономика',
          rows: [
            ['Наклон',             '-5° / +15°',        '-5° / +20°'],
            ['Тип подставки',      'Стандартная',       'V-образная металл.'],
            ['Крепление VESA',     '100×100 мм',        '100×100 мм'],
            ['Кабель-менеджмент',  '—',                 'Встроенный'],
          ],
        },
        {
          name: 'Подключение',
          rows: [
            ['HDMI',               '1× HDMI 1.4',       '1× HDMI 1.4'],
            ['VGA',                '1× VGA',            '1× VGA'],
            ['Аудиовыход',         '3.5 мм AUX',        '3.5 мм AUX'],
            ['Питание',            'AC 100–240 В',      'AC 100–240 В'],
          ],
        },
      ],

      color_eyebrow: 'Дисплей',
      color_title: 'Бесконечный Цвет',
      color_body: 'Откалиброванные на заводе IPS-панели воспроизводят 99% цветового пространства sRGB с поразительной точностью — каждое изображение выглядит именно так, как задумано.',
      color_stats: [
        { value: '99%',   label: 'sRGB' },
        { value: '250',   label: 'кд/м²' },
        { value: '16.7M', label: 'Цветов' },
      ],

      stand_eyebrow: 'Дизайн',
      stand_title: 'Культовая\nV-стойка',
      stand_body: 'Выполненная из авиационного алюминия, фирменная V-образная стойка превращает каждый рабочий стол в произведение искусства.',
      stand_pills: ['Авиационный алюминий', 'Наклон -5° / +20°'],

      cta_title: 'Готовы обновить\nсвой дисплей?',
      cta_body: 'Тысячи профессионалов и геймеров уже перешли на Bikon Vision.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',
      bento_eyebrow: 'Ключевые функции',
      bento_title: 'ТЕХНОЛОГИИ ДИСПЛЕЕВ СЕРИИ VISION',
      ports_eyebrow: 'Подключение',
      ports_title: 'Все нужные\nразъёмы.',
      ports_body: 'Мониторы серии Vision поставляются полностью укомплектованными — HDMI, D-SUB и выход 3.5 мм AUX встроены, чтобы вы могли подключиться за секунды.',
    },
    laptops: {
      hero_eyebrow: 'Серия Smartbook и Workbook',
      hero_title: 'Мощность,\nкоторая идёт с вами.',
      hero_subtitle: 'Разработан для студентов, профессионалов и создателей. Лёгкий по дизайну, мощный по природе.',
      hero_cta_primary: 'Смотреть модели',
      hero_cta_secondary: 'Характеристики',
      hero_scroll: 'Прокрутите вниз',

      built_eyebrow: 'Дизайн',
      built_title: 'Создан иначе.',
      built_body: 'Точно спроектирован, чтобы быть удивительно тонким и лёгким — без ущерба для производительности.',
      built_stats: [
        { value: '1.8кг', label: 'Начальный вес' },
        { value: '18мм', label: 'Тонкий профиль' },
        { value: '8ч', label: 'Аккумулятор' },
      ],

      features_eyebrow: 'Возможности',
      features_title: 'Каждая функция\nпродумана.',
      features: [
        {
          label: 'IPS-дисплей',
          title: '15.6" Full HD\nIPS-дисплей',
          desc: 'Откалиброванная 15.6" Full HD IPS-панель обеспечивает яркие цвета и чёткий текст — комфортно весь день.',
        },
        {
          label: 'Intel Core',
          title: 'Производительность\nIntel Core',
          desc: 'От Intel Celeron до Core i-серии — всегда правильный двигатель для любой задачи.',
        },
        {
          label: 'Весь день',
          title: 'До 8 часов\nработы аккумулятора',
          desc: 'Берите работу куда угодно. До 8 часов работы от аккумулятора — ноутбуки Bikon поспевают за вашим днём.',
        },
        {
          label: 'Подключение',
          title: 'Всё\nподключено',
          desc: 'Встроенные Wi-Fi, Bluetooth, широкий набор портов и веб-камера Full HD — оставайтесь на связи всегда.',
        },
      ],

      lineup_eyebrow: 'Линейка моделей',
      lineup_title: 'Выберите свой\nидеальный ноутбук',
      lineup_smartbook_name: 'Bikon Smartbook',
      lineup_smartbook_tag: 'Повседневное совершенство',
      lineup_smartbook_desc: 'Идеальный ноутбук для повседневной жизни — лёгкий, надёжный, для студентов и специалистов.',
      lineup_workbook_name: 'Bikon Workbook',
      lineup_workbook_tag: 'Профессиональная мощь',
      lineup_workbook_desc: 'Для профессионалов, требующих большего — мощный процессор, больше ОЗУ и расширенные возможности.',
      lineup_badge_pro: 'PRO',
      lineup_learn: 'В магазин',

      specs_eyebrow: 'Спецификации',
      specs_title: 'Технические характеристики',
      specs_smartbook_label: 'Smartbook',
      specs_workbook_label: 'Workbook',
      specs_categories: [
        {
          name: 'Дисплей',
          rows: [
            ['Диагональ',        '15.6"',              '15.6"'],
            ['Разрешение',       '1920×1080',          '1920×1080'],
            ['Тип матрицы',      'IPS',                'IPS'],
            ['Частота обновл.',  '60 Гц',              '60 Гц'],
            ['Яркость',          '220 нит',            '250 нит'],
          ],
        },
        {
          name: 'Производительность',
          rows: [
            ['Процессор',        'Intel Celeron N5095', 'Intel Core i5 / i7'],
            ['ОЗУ',              '8 ГБ DDR4',           '16 ГБ DDR4'],
            ['Накопитель',       '256 ГБ SSD',          '512 ГБ NVMe SSD'],
            ['Графика',          'Intel UHD',           'Intel Iris Xe'],
            ['ОС',               'Windows 11',          'Windows 11 Pro'],
          ],
        },
        {
          name: 'Аккумулятор и корпус',
          rows: [
            ['Аккумулятор',      '5000 мАч',           '6000 мАч'],
            ['Время работы',     'До 7 ч',             'До 8 ч'],
            ['Вес',              '1.8 кг',             '1.9 кг'],
            ['Толщина',          '18 мм',              '18 мм'],
            ['Материал',         'Пластик',            'Алюминиевый сплав'],
          ],
        },
        {
          name: 'Подключение',
          rows: [
            ['Wi-Fi',            'Wi-Fi 5',             'Wi-Fi 6'],
            ['Bluetooth',        'BT 5.0',              'BT 5.2'],
            ['USB-порты',        '2× USB-A, 1× USB-C',  '2× USB-A, 2× USB-C'],
            ['HDMI',             '1× HDMI 1.4',         '1× HDMI 2.0'],
            ['Веб-камера',       'Full HD 1080p',       'Full HD 1080p'],
            ['Аудио',            '3.5 мм разъём',       '3.5 мм разъём'],
          ],
        },
      ],

      cta_title: 'Готовы найти\nсвой ноутбук?',
      cta_body: 'Smartbook или Workbook — оба разработаны и собраны прямо здесь, в Узбекистане.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',
    },

    aios: {
      hero_eyebrow: 'Серия Matrix',
      hero_title: 'Моноблок.\nВсё что нужно.',
      hero_subtitle: 'Мощные процессоры Intel, яркие IPS-дисплеи и элегантный моноблочный дизайн — для современного рабочего места.',
      hero_cta_primary: 'Смотреть модели',
      hero_cta_secondary: 'Характеристики',
      hero_scroll: 'Прокрутите вниз',

      built_eyebrow: 'Создан для работы',
      built_title: 'Меньше кабелей.\nБольше мощности.',
      built_body: 'Никакого системного блока, никаких кабелей. Серия Matrix объединяет полноценную настольную мощность в одном тонком корпусе — чистый стол и ясный ум.',
      built_stats: [
        { value: '24"',   label: 'IPS-дисплей'  },
        { value: 'i5/i7', label: 'Intel Core'   },
        { value: '1TB',   label: 'NVMe-диск'    },
        { value: '3 г',   label: 'Гарантия'     },
      ],

      features_eyebrow: 'Возможности',
      features_title: 'Иначе спроектирован,\nлучше собран.',
      features: [
        { label: 'IPS-дисплей',  title: 'Кристальная чёткость', desc: 'Панели Full HD IPS с заводской калибровкой обеспечивают точные цвета и широкие углы обзора.' },
        { label: 'Intel Core',   title: 'Мощность внутри',      desc: 'Процессоры Intel Core i3–i7 поколений 12–14 обеспечивают отзывчивую производительность для любых задач.' },
        { label: 'Моноблок',     title: 'Один прибор, чистый стол', desc: 'Процессор, дисплей, динамики и веб-камера в одном элегантном корпусе. Никаких лишних устройств.' },
        { label: 'Подключение',  title: 'Всегда на связи',      desc: 'Wi-Fi 5/6, Bluetooth, HDMI, USB-порты и встроенная веб-камера Full HD — всё необходимое уже внутри.' },
      ],

      compare_eyebrow: 'Модельный ряд',
      compare_title: 'Matrix или Optima.\nВыбор за вами.',
      compare_matrix_name: 'Bikon Matrix',
      compare_matrix_tag: 'Базовая производительность',
      compare_optima_name: 'Bikon Optima',
      compare_optima_tag: 'Профессиональная мощность',
      compare_rows: [
        { spec: 'Дисплей',     matrix: '21.5" FHD IPS',     optima: '23.8" FHD IPS'       },
        { spec: 'Процессор',   matrix: 'Intel Core i3',      optima: 'Intel Core i5 / i7'  },
        { spec: 'ОЗУ',         matrix: '8 ГБ DDR4',          optima: '16 ГБ DDR4'           },
        { spec: 'Хранилище',   matrix: '256 ГБ SSD',         optima: '512 ГБ NVMe'          },
        { spec: 'Графика',     matrix: 'Intel Integrated',   optima: 'Дискретная GPU опция' },
        { spec: 'Веб-камера',  matrix: 'Full HD 1080p',      optima: 'Full HD 1080p'        },
        { spec: 'Wi-Fi',       matrix: 'Wi-Fi 5',            optima: 'Wi-Fi 6'              },
        { spec: 'ОС',          matrix: 'Windows 11 Home',    optima: 'Windows 11 Pro'       },
        { spec: 'Гарантия',    matrix: '1 год',              optima: '3 года'               },
      ],

      specs_eyebrow: 'Характеристики',
      specs_title: 'Технические характеристики',
      specs_matrix_label: 'Matrix',
      specs_optima_label: 'Optima',
      specs_categories: [
        {
          name: 'Дисплей',
          rows: [
            ['Размер экрана',  '21.5"',           '23.8"'          ],
            ['Разрешение',     '1920×1080 FHD',   '1920×1080 FHD'  ],
            ['Тип панели',     'IPS',             'IPS'            ],
            ['Яркость',        '250 нит',         '300 нит'        ],
            ['Угол обзора',    '178°',            '178°'           ],
          ],
        },
        {
          name: 'Производительность',
          rows: [
            ['Процессор', 'Intel Core i3 (12 пок.)', 'Intel Core i5/i7 (12–14 пок.)'],
            ['ОЗУ',       '8 ГБ DDR4',               '16 ГБ DDR4'                   ],
            ['Хранилище', '256 ГБ SSD',               '512 ГБ NVMe SSD'              ],
            ['Графика',   'Intel Iris Xe',             'Дискретная GPU опция'         ],
          ],
        },
        {
          name: 'Подключение',
          rows: [
            ['Wi-Fi',      'Wi-Fi 5',             'Wi-Fi 6'            ],
            ['Bluetooth',  'BT 5.0',              'BT 5.2'             ],
            ['USB',        '3× USB-A, 1× USB-C',  '3× USB-A, 2× USB-C' ],
            ['HDMI',       '1× HDMI 1.4',         '1× HDMI 2.0'        ],
            ['Веб-камера', 'Full HD 1080p',        'Full HD 1080p'      ],
            ['Аудио',      '3.5 мм разъём',        '3.5 мм разъём'     ],
          ],
        },
        {
          name: 'Система',
          rows: [
            ['ОС',         'Windows 11 Home',    'Windows 11 Pro'     ],
            ['Гарантия',   '1 год',              '3 года'             ],
            ['Производство','Сделано в Узбекистане','Сделано в Узбекистане'],
          ],
        },
      ],

      cta_title: 'Готовы освободить\nрабочий стол?',
      cta_body: 'Matrix или Optima — оба собраны в Узбекистане и созданы на долгие годы.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',

      nova_teaser_eyebrow: 'Bikon NOVA',
      nova_teaser_title:   'Знакомьтесь:\nBikon NOVA.',
      nova_teaser_body:    'Откройте для себя NOVA — моноблок в версиях 24" и 27" IPS, на базе Intel Core i3/i5/i7 (12–14 поколения) в корпусе толщиной 20 мм.',
      nova_teaser_cta:     'Узнать о NOVA',

      models_eyebrow: 'Наша линейка AIO',
      models_title: 'Выберите\nсвою модель.',
      models_matrix_name: 'Matrix',
      models_matrix_tag: 'Современная производительность',
      models_matrix_desc: 'Intel 12–14 поколение, DDR4, чипсет H610 — создан для современного рабочего места.',
      models_optima_name: 'Optima',
      models_optima_tag: 'Проверенная надёжность',
      models_optima_desc: 'Intel 2–3 поколение, DDR3, чипсет H61 — стабильная работа по доступной цене.',
      models_nova_name: 'NOVA',
      models_nova_tag: 'Премиальный флагман',
      models_nova_desc: 'Алюминий 20 мм, Wi-Fi 6, Intel 12–14 поколение — самый утончённый моноблок от Bikon.',
      models_explore: 'Подробнее',
    },

    nova: {
      hero_eyebrow: 'Bikon NOVA',
      hero_title: 'Создан для\nсовременного офиса.',
      hero_subtitle: 'NOVA переосмысляет понятие моноблока — утончённый, мощный компьютер для профессионалов, которые требуют лучшего.',
      hero_cta_primary: 'Изучить NOVA',
      hero_cta_secondary: 'Характеристики',

      lineup_eyebrow: 'Линейка моделей',
      lineup_title: 'Знакомьтесь:\nBikon NOVA.',
      lineup_nova_name: 'Bikon NOVA',
      lineup_nova_tag: 'Моноблок всё-в-одном',
      lineup_nova_desc: 'Дисплей 24" или 27" IPS, Intel Core i3/i5/i7 (12–14 пок.), DDR4 до 16 ГБ и корпус 20 мм из CNC-алюминия — NOVA подходит для любых задач.',
      lineup_nova_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 до 16 ГБ', '20 мм'],
      lineup_learn: 'В магазин',

      specs_eyebrow: 'Характеристики',
      specs_title: 'Технические характеристики',
      specs_label: 'Bikon NOVA',
      specs_categories: [
        {
          name: 'Дисплей',
          rows: [
            ['Размер',        '24" / 27"',                   '—'],
            ['Разрешение',    '1920×1080 / 2560×1440',       '—'],
            ['Тип панели',    'IPS',                         '—'],
            ['Частота',       '75 Гц',                       '—'],
            ['Яркость',       '300–350 нит',                 '—'],
            ['Угол обзора',   '178°',                        '—'],
          ],
        },
        {
          name: 'Производительность',
          rows: [
            ['Процессор',    'Intel Core i3 / i5 / i7 (12–14 пок.)', '—'],
            ['Материнская плата', 'H610 · Socket LGA 1700',          '—'],
            ['ОЗУ',          'DDR4  4 / 8 / 16 ГБ',                  '—'],
            ['Хранилище',    '128 / 256 / 512 / 1024 ГБ NVMe SSD',   '—'],
            ['Графика',      'Intel UHD 730 / 770',                  '—'],
          ],
        },
        {
          name: 'Подключение',
          rows: [
            ['Wi-Fi',       'Wi-Fi 6 (802.11ax)',   '—'],
            ['Bluetooth',   'BT 5.2',               '—'],
            ['USB',         '4× USB-A, 2× USB-C',   '—'],
            ['HDMI',        '1× HDMI 2.0',          '—'],
            ['Веб-камера',  'Full HD 1080p',         '—'],
            ['Аудио',       '3.5 мм + динамики',    '—'],
          ],
        },
        {
          name: 'Дизайн',
          rows: [
            ['Корпус',        'CNC-алюминий',           '—'],
            ['Толщина',       '20 мм',                  '—'],
            ['ОС',            'Windows 11 Pro',         '—'],
            ['Гарантия',      '12 месяцев',             '—'],
            ['Производство',  'Сделано в Узбекистане',  '—'],
          ],
        },
      ],

      cta_title: 'Преобразите\nваш рабочий стол.',
      cta_body: 'NOVA. Собрано в Узбекистане. Создано для вашей работы.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',

      display_eyebrow: 'Чёткий дисплей',
      display_title: '27" QHD IPS.\nКаждая деталь — ярко.',
      display_body: 'NOVA оснащена 27-дюймовой QHD IPS-панелью с разрешением 2560×1440, точностью цветопередачи 99% sRGB и частотой обновления 75 Гц — каждый пиксель работает на результат.',
      display_title_24: '24" FHD IPS.\nИдеально для любого стола.',
      display_body_24: 'Компактная NOVA 24 оснащена Full HD IPS-панелью 1920×1080 с точностью цветопередачи 99% sRGB и частотой 75 Гц — яркий и чёткий дисплей для любого рабочего места.',

      back_eyebrow: 'Продуманный дизайн',
      back_title: 'Безупречно.\nС любого ракурса.',
      back_body: 'Задняя панель NOVA продумана так же тщательно, как и передняя. Алюминиевый корпус толщиной 20 мм объединяет все порты — HDMI, USB-A, USB-C и аудио — с аккуратной прокладкой кабелей.',

      vertical_eyebrow: 'Портретный режим',
      vertical_title: 'Поверните.\nРаботайте иначе.',
      vertical_body: 'Подставка NOVA поддерживает полный поворот на 90° в портретный режим — идеально для написания кода, чтения длинных документов или работы с вертикальными макетами. Один плавный поворот меняет весь рабочий процесс.',

      apps_eyebrow: 'Создан для Windows',
      apps_title: 'Windows 11.\nВаши приложения\nлетят вперёд.',
      apps_body: 'NOVA поставляется с предустановленной Windows 11 Pro — Word, Excel, PowerPoint, Teams и тысячи других приложений работают безупречно на дисплее 24" или 27" IPS.',

      bento_eyebrow: 'Ключевые функции',
      bento_title: 'ТЕХНОЛОГИИ NOVA AIO',
      connectivity_eyebrow: 'Подключение',
      connectivity_title: 'Все порты,\nкоторые нужны.',
      connectivity_body: 'NOVA вмещает всё необходимое в тонком корпусе 20 мм — высокоскоростной USB-C, HDMI 2.0 и Bluetooth 5.0 для полноценной работы.',
      cam_eyebrow: 'Встроенные возможности',
      cam_title: 'Видьте чётко.\nСлышьте всё.',
      cam_body: 'Веб-камера Full HD и двойные стереодинамики встроены в корпус — чёткие видеозвонки и объёмный звук без лишнего оборудования.',
    },

    matrix: {
      hero_eyebrow: 'Bikon Matrix',
      hero_title: 'Производительность\nдля каждого.',
      hero_subtitle: 'Matrix объединяет мощь Intel 12–14 поколения, память DDR4 и IPS-дисплей 24" или 27" в один компактный моноблок.',
      hero_cta_primary: 'Изучить Matrix',
      hero_cta_secondary: 'Характеристики',

      lineup_eyebrow: 'Линейка моделей',
      lineup_title: 'Знакомьтесь:\nBikon Matrix.',
      lineup_name: 'Bikon Matrix',
      lineup_tag: 'Моноблок всё-в-одном',
      lineup_desc: 'Дисплей 24" или 27" IPS, Intel Core i3/i5/i7 (12–14 пок.), DDR4 до 16 ГБ — надёжная производительность в одном компактном корпусе.',
      lineup_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 до 16 ГБ', 'Чипсет H610'],
      lineup_learn: 'В магазин',

      specs_eyebrow: 'Характеристики',
      specs_title: 'Технические характеристики',
      specs_label: 'Bikon Matrix',
      specs_categories: [
        {
          name: 'Дисплей',
          rows: [
            ['Размер',        '24" / 27"',                   '—'],
            ['Разрешение',    '1920×1080 / 2560×1440',       '—'],
            ['Тип панели',    'IPS',                         '—'],
            ['Частота',       '75 Гц',                       '—'],
            ['Яркость',       '300–350 нит',                 '—'],
            ['Угол обзора',   '178°',                        '—'],
          ],
        },
        {
          name: 'Производительность',
          rows: [
            ['Процессор',          'Intel Core i3 / i5 / i7 (12–14 пок.)', '—'],
            ['Материнская плата',  'H610 · Socket LGA 1700',                '—'],
            ['ОЗУ',                'DDR4  4 / 8 / 16 ГБ',                   '—'],
            ['Хранилище',          '128 / 256 / 512 / 1024 ГБ NVMe SSD',    '—'],
            ['Графика',            'Intel UHD 730 / 770',                   '—'],
          ],
        },
        {
          name: 'Подключение',
          rows: [
            ['Wi-Fi',      'Wi-Fi 6 (802.11ax)',   '—'],
            ['Bluetooth',  'BT 5.0',               '—'],
            ['USB',        '4× USB-A, 1× USB-C',   '—'],
            ['HDMI',       '1× HDMI 2.0',          '—'],
            ['Веб-камера', 'Full HD 1080p',         '—'],
            ['Аудио',      '3.5 мм + динамики',    '—'],
          ],
        },
        {
          name: 'Дизайн',
          rows: [
            ['ОС',           'Windows 11 Pro',          '—'],
            ['Гарантия',     '12 месяцев',              '—'],
            ['Производство', 'Сделано в Узбекистане',   '—'],
          ],
        },
      ],

      cta_title: 'Готовы к работе?\nЭто Matrix.',
      cta_body: 'Matrix. Собрано в Узбекистане. Создано для ежедневной производительности.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',

      display_eyebrow: 'IPS-дисплей',
      display_title: '27" QHD IPS.\nРасширьте горизонты.',
      display_body: 'IPS-панель Matrix 27" QHD обеспечивает разрешение 2560×1440 и частоту 75 Гц — кристально чёткое изображение для любых задач.',
      display_title_24: '24" FHD IPS.\nЧётко и сфокусировано.',
      display_body_24: 'IPS-панель Matrix 24" Full HD обеспечивает разрешение 1920×1080 и частоту 75 Гц — яркое и точное изображение для любого рабочего места.',

      back_eyebrow: 'Продуманный дизайн',
      back_title: 'Чистые кабели.\nЧистый стол.',
      back_body: 'Задняя панель Matrix организует все подключения — HDMI, USB-A, USB-C и аудио — аккуратно и доступно, поддерживая порядок на рабочем месте.',

      apps_eyebrow: 'Создан для Windows',
      apps_title: 'Windows 11.\nГотов с первого дня.',
      apps_body: 'Matrix поставляется с предустановленной Windows 11 Pro — Word, Excel, Teams и тысячи других приложений работают на дисплее 24" или 27" IPS.',

      bento_eyebrow: 'Ключевые функции',
      bento_title: 'ТЕХНОЛОГИИ MATRIX ALL-IN-ONE',

      connectivity_eyebrow: 'Подключение',
      connectivity_title: 'Все порты,\nкоторые нужны.',
      connectivity_body: 'Matrix обеспечивает подключение через HDMI 2.0, USB-C, USB-A, Wi-Fi 6 и Bluetooth 5.0.',

      cam_eyebrow: 'Встроенные возможности',
      cam_title: 'Видьте чётко.\nСлышьте всё.',
      cam_body: 'Встроенная Full HD веб-камера и стереодинамики — чёткие видеозвонки и объёмный звук без лишнего оборудования.',
    },

    optima: {
      hero_eyebrow: 'Bikon Optima',
      hero_title: 'Надёжная мощь.\nГотов к работе.',
      hero_subtitle: 'Optima обеспечивает проверенную производительность Intel Core, память DDR3 и IPS-дисплей 24" или 27" — надёжные вычисления по доступной цене.',
      hero_cta_primary: 'Изучить Optima',
      hero_cta_secondary: 'Характеристики',

      lineup_eyebrow: 'Линейка моделей',
      lineup_title: 'Знакомьтесь:\nBikon Optima.',
      lineup_name: 'Bikon Optima',
      lineup_tag: 'Моноблок всё-в-одном',
      lineup_desc: 'Дисплей 24" или 27" IPS, Intel Core i3/i5/i7 (2–3 пок.), DDR3 до 16 ГБ — надёжная работа по отличной цене.',
      lineup_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR3 до 16 ГБ', 'Чипсет H61'],
      lineup_learn: 'В магазин',

      specs_eyebrow: 'Характеристики',
      specs_title: 'Технические характеристики',
      specs_label: 'Bikon Optima',
      specs_categories: [
        {
          name: 'Дисплей',
          rows: [
            ['Размер',        '24" / 27"',                   '—'],
            ['Разрешение',    '1920×1080 / 2560×1440',       '—'],
            ['Тип панели',    'IPS',                         '—'],
            ['Частота',       '75 Гц',                       '—'],
            ['Яркость',       '300–350 нит',                 '—'],
            ['Угол обзора',   '178°',                        '—'],
          ],
        },
        {
          name: 'Производительность',
          rows: [
            ['Процессор',          'Intel Core i3 / i5 / i7 (2–3 пок.)',  '—'],
            ['Материнская плата',  'H61 · Socket LGA 1155',                '—'],
            ['ОЗУ',                'DDR3  4 / 8 / 16 ГБ',                  '—'],
            ['Хранилище',          '128 / 256 / 512 / 1024 ГБ SSD',        '—'],
            ['Графика',            'Intel HD Graphics 2000 / 4000',        '—'],
          ],
        },
        {
          name: 'Подключение',
          rows: [
            ['Wi-Fi',      'Wi-Fi (802.11n)',       '—'],
            ['Bluetooth',  'BT 4.0',               '—'],
            ['USB',        '4× USB-A, 1× USB-C',   '—'],
            ['HDMI',       '1× HDMI 1.4',          '—'],
            ['Веб-камера', 'Full HD 1080p',         '—'],
            ['Аудио',      '3.5 мм + динамики',    '—'],
          ],
        },
        {
          name: 'Дизайн',
          rows: [
            ['ОС',           'Windows 10 / 11 Pro',     '—'],
            ['Гарантия',     '12 месяцев',              '—'],
            ['Производство', 'Сделано в Узбекистане',   '—'],
          ],
        },
      ],

      cta_title: 'Умный выбор.\nBikon Optima.',
      cta_body: 'Optima. Собрано в Узбекистане. Надёжные вычисления, проверенные временем.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',

      display_eyebrow: 'IPS-дисплей',
      display_title: '27" QHD IPS.\nРасширьте горизонты.',
      display_body: 'IPS-панель Optima 27" QHD обеспечивает разрешение 2560×1440 при 75 Гц — чёткое и яркое изображение для работы и отдыха.',
      display_title_24: '24" FHD IPS.\nТочно и чётко.',
      display_body_24: 'IPS-панель Optima 24" Full HD обеспечивает чёткое изображение 1920×1080 при 75 Гц — надёжная чёткость для любых задач.',

      back_eyebrow: 'Удобный дизайн',
      back_title: 'Всё\nпод рукой.',
      back_body: 'Задняя панель Optima размещает все порты — HDMI, USB-A и аудио — именно там, где они нужны, делая установку и ежедневное использование простым.',

      apps_eyebrow: 'Создан для Windows',
      apps_title: 'Windows 11.\nПривычно и готово.',
      apps_body: 'Optima поставляется с предустановленной Windows 11 Pro — совместим с вашими привычными приложениями и готов к работе сразу.',

      bento_eyebrow: 'Ключевые функции',
      bento_title: 'ТЕХНОЛОГИИ OPTIMA ALL-IN-ONE',

      connectivity_eyebrow: 'Подключение',
      connectivity_title: 'Все порты,\nкоторые нужны.',
      connectivity_body: 'Optima обеспечивает подключение через HDMI 1.4, VGA, USB-A, Wi-Fi и Bluetooth.',

      cam_eyebrow: 'Встроенные возможности',
      cam_title: 'Видьте чётко.\nСлышьте всё.',
      cam_body: 'Встроенная Full HD веб-камера и стереодинамики — готовы к видеозвонкам и повседневному аудио без лишнего оборудования.',
    },

    blog: {
      hero_eyebrow: 'Блог и полезное',
      hero_title: 'Новости и\nполезные советы',
      hero_subtitle: 'Обновления продуктов, технические руководства и советы от команды Bikon.',
      all_label: 'Все',
      read_more: 'Читать статью',
      min_read: 'мин чтения',
      featured_badge: 'Главная',
      categories: ['Все', 'Новости', 'Руководство', 'Советы', 'Обзор'],
      posts: [
        {
          id: 'nova-2026',
          category: 'Новости',
          date: '10 мая 2026',
          title: 'NOVA AIO: создан для современного рабочего места',
          excerpt: 'Представляем NOVA All-in-One — стильный и мощный моноблок для профессионалов, которым нужны и элегантность, и производительность.',
          read_time: '4',
          featured: true,
        },
        {
          id: 'matrix-vs-optima',
          category: 'Руководство',
          date: '28 апр 2026',
          title: 'Matrix vs Optima: какой моноблок подходит вам?',
          excerpt: 'Оба — мощные моноблоки от Bikon, но для разных пользователей. Подробное сравнение, чтобы выбрать подходящую модель.',
          read_time: '6',
          featured: false,
        },
        {
          id: 'smartbook-review',
          category: 'Обзор',
          date: '15 апр 2026',
          title: 'Smartbook: мощность встречает портативность',
          excerpt: 'После месяцев реального тестирования — наш честный обзор Bikon Smartbook и чем он выделяется в среднем ценовом сегменте.',
          read_time: '7',
          featured: false,
        },
        {
          id: 'catalog-2026',
          category: 'Новости',
          date: '1 апр 2026',
          title: 'Полный каталог Bikon 2026 уже доступен',
          excerpt: 'Скачайте полный каталог 2026 года со всеми продуктами Bikon — характеристики, цены и варианты конфигураций для B2B и B2C.',
          read_time: '2',
          featured: false,
        },
        {
          id: 'office-setup',
          category: 'Советы',
          date: '20 мар 2026',
          title: '5 советов для идеального офиса с Bikon',
          excerpt: 'От управления кабелями до высоты монитора — небольшие изменения, которые значительно улучшают комфорт и продуктивность в течение дня.',
          read_time: '5',
          featured: false,
        },
        {
          id: 'pc-maintenance',
          category: 'Советы',
          date: '5 мар 2026',
          title: 'Как поддерживать ПК в рабочем состоянии',
          excerpt: 'Пыль, перегрев и лишние программы — три главных врага производительности. Практические советы по обслуживанию компьютера.',
          read_time: '5',
          featured: false,
        },
      ],
    },

    footer: {
      tagline: 'Премиальные технологии, произведённые в Узбекистане. Строим будущее вместе.',
      copyright: '© 2026 Bikon.uz. Сделано с любовью в UZ.',
      cols: [
        {
          heading: 'Продукты',
          links: ['Ноутбуки', 'Моноблок', 'Корпуса', 'Мониторы'],
        },
        {
          heading: 'О компании',
          links: ['О нас', 'Карьера', 'Новости', 'Контакты'],
        },
        {
          heading: 'Поддержка',
          links: ['Как купить', 'Доставка', 'Гарантия', 'Сервисные центры'],
        },
      ],
      legal: ['Конфиденциальность', 'Условия', 'Карта сайта'],
    },
  },

  /* ════════════════════════════════════════════════════════════════════
     UZBEK
  ════════════════════════════════════════════════════════════════════ */
  uz: {
    nav: {
      home: 'Bosh sahifa',
      laptops: 'Noutbuklar',
      aios: 'Monoblok',
      cases: 'Korpuslar',
      monitors: 'Monitorlar',
      contact: 'Aloqa',
      blog: 'Blog',
      about: 'Biz haqimizda',
    },

    about: {
      badge: 'Biz haqimizda · 2015 yildan',
      hero_sub: "O'zbekistondagi zamonaviy va ishonchli texnologiya brendi, 2015 yilda Toshkentda tashkil etilgan.",
      story_label: 'Bizning tarix',
      story_title: "O'zbekiston texnologiya kelajagini quramiz",
      story_body: "2015 yilda Toshkentda tashkil etilgan BIKON jismoniy shaxslar, korxonalar va davlat muassasalari uchun yuqori sifatli va arzon kompyuter uskunalarini taqdim etadi. Mahsulotlarimiz global standartlarga rioya qilgan holda mahalliy real ehtiyojlarni qondirish uchun mo'ljallangan.",
      stat1_n: '10+',               stat1_label: 'Yillik tajriba',
      stat2_n: 'B2B · B2G · B2C',  stat2_label: 'Bozor segmentlari',
      stat3_n: '1–3 yil',           stat3_label: 'Kafolat muddati',
      mission_label: '🚀 Bizning missiyamiz',
      mission_quote: '"Bizning missiyamiz — har bir foydalanuvchi va biznes uchun ishonchli, qulay va tejamkor texnologik yechimlar taqdim etishdir. Sifat, xizmat va qulaylikni birlashtirib, O\'zbekistonning eng ishonchli texnologiya brendiga aylanishga intilamiz."',
      what_label: '💡 Biz nima qilamiz',
      what_title: 'To\'liq texnologik yechimlar',
      what_summary: "Biz global komponentlarni mahalliy ishlab chiqarish tajribasi bilan birlashtirib, kuchli, samarali va ishonchli texnologik yechimlar taqdim etamiz.",
      what_cards: [
        { icon: '🏭', title: 'Ishlab chiqarish',    body: "Kompyuter va noutbuklarni ishlab chiqarish va mahalliylashtirish." },
        { icon: '🏢', title: 'Korporativ savdo',    body: 'Korporativ savdo (B2B va B2G segmentlari).' },
        { icon: '🛒', title: 'Chakana savdo',       body: "Chakana savdo (bozorlar va rasmiy sayt orqali B2C)."},
        { icon: '🛠', title: 'Xizmat va qo\'llab-quvvatlash', body: "Xizmat va kafolat qo'llab-quvvatlash (1 yildan 3 yilgacha kafolat)." },
      ],
      why_label: '⭐ Nima uchun BIKON?',
      why_title: "Ishonchning olti ustuni",
      why_items: [
        "2015 yildan beri tajriba va kuchli bozor obro'si",
        'Shaffof biznes jarayonlar',
        'Samarali va ishonchli logistika',
        'Malakali va tajribali jamoa',
        'Raqamli jarayonlar (CRM, ERP, avtomatlashtirish tizimlari)',
        "Rasmiy servis markazlari va texnik qo'llab-quvvatlash",
      ],
      values_label: 'Bizning qadriyatlarimiz',
      values: ['Ishonchlilik', 'Hamkorlik', 'Shaffoflik', 'Rivojlanish', 'Mas\'uliyat'],
      future_label: 'Kelajak maqsadlarimiz',
      future_title: "Biz qayerga ketmoqdamiz",
      future_goals: [
        "Mahalliy ishlab chiqarish imkoniyatlarini kengaytirish",
        "Servis markazlari sonini ko'paytirish",
        "Markaziy Osiyo va jahon bozorlariga chiqish",
        '"O\'zbekistonda ishlab chiqarilgan" brendini rivojlantirish',
      ],
      global_title: "Global qamrov, mahalliy ildizlar",
      global_body: "Toshkent ko'chalaridan Markaziy Osiyo va undan tashqariga — biz har bir foydalanuvchi, biznes va muassasa uchun texnologik infratuzilma quramiz.",
      global_tags: ["🇺🇿 O'zbekiston", '🌐 Markaziy Osiyo', '🚀 Jahon bozorlari'],
      final_quote: "BIKON faqat kompyuter uskunalari ishlab chiqaruvchisi emas. Bu O'zbekistonning raqamli rivojlanishiga hissa qo'shuvchi, yangi ish o'rinlari yaratar va innovatsion ekotizim shakllantiruvchi texnologiya brendidir.",
    },
    hero: {
      eyebrow: 'Milliy Brend',
      title1: 'BIKON',
      title2: 'Kelajak uchun',
      title3: 'yaratilgan.',
      subtitle: 'Dunyo standartlariga mos qurilmalar — unumdorlik va ilhom uchun mo\'ljallangan.',
      cta_primary: 'Batafsil',
      cta_secondary: 'Mahsulotlar',
      badge1: '12 oy kafolat',
      badge2: 'Bepul yetkazish',
      badge3: "O'zbekistonda #1",
    },
    categories: {
      eyebrow: 'Mahsulotlar',
      title_light: 'Kategoriyalarni ',
      title_bold: 'ko\'ring',
      learn_more: 'Ko\'proq',
      footer_note: 'Barcha mahsulotlar O\'zbekistonda yig\'ilgan · 12 oy rasmiy kafolat',
      items: [
        { series: 'SMARTBOOK SERIYASI', title: 'Noutbuklar' },
        { series: 'MATRIX SERIYASI', title: 'Monoblok' },
        { series: 'VISION PRO SERIYASI', title: 'Monitorlar' },
        { series: 'PHANTOM SERIYASI', title: 'Korpuslar' },
      ],
    },
    catalog: {
      eyebrow: 'Resurslar',
      title_light: 'Bizning ',
      title_bold: '2026 katalogni yuklab oling',
      body: 'To\'liq Bikon mahsulot liniyasini ko\'ring — batafsil texnik xususiyatlar, narxlar va konfiguratsiya variantlari.',
      button: 'PDF yuklab olish',
    },
    trust: {
      eyebrow: 'Nima uchun biz',
      title_light: 'Nega ',
      title_bold: 'Bikon?',
      subtitle: 'Sifat va ishonch — bizning asosiy vazifamiz. Har bir qurilma ortida katta mehnat va innovatsiyalar yotadi.',
      features: [
        { title: 'Lokal yig\'uv va servis', desc: 'O\'zbekistonda mahalliy yig\'ilgan va xizmat ko\'rsatiladigan sifatli qurilmalar.' },
        { title: 'Narx va sifatning maqbul mutanosibligi', desc: 'Dunyo miqyosidagi xususiyatlar va raqobatbardosh narxlarning mukammal muvozanati.' },
        { title: '12 oylik kafolat va butun respublika bo\'ylab servis markazlari', desc: '12 oylik kafolat va respublika bo\'ylab servis markazlari tarmog\'i.' },
        { title: 'Barqaror logistika va tezkor yetkazib berish', desc: 'Ishonchli ta\'minot zanjiri va tez yetkazib berish — buyurtmangiz o\'z vaqtida yetib keladi.' },
      ],
    },
    products: {
      eyebrow: 'Katalog',
      buy_now: 'Sotib olish',
      learn_more: 'Batafsil',
      data: [
        {
          title: 'Noutbuklar',
          description: "Yengil, tez va ishonchli qurilmalar. Talaba va mutaxassislar uchun yaratilgan — silliq ishlash va kun bo'yi quvvat.",
        },
        {
          title: 'Monoblok',
          description: "Unumdorlik va qulaylik uchun zamonaviy kompyuterlar. Intel protsessorlari va yorqin IPS displeylar — ish va kundalik foydalanish uchun ideal.",
        },
        {
          title: 'Korpuslar',
          description: "Zamonaviy yig'ilmalar uchun yaratilgan — chidamlilik, havo aylanishi va chiroyli dizayn. O'yin va professional ish uchun ideal.",
        },
        {
          title: 'Monitorlar',
          description: "Aniq tasvir va to'g'ri ranglar. Aniqlik va ishonchlilikni qadrlaydigan professional va oddiy foydalanuvchilar uchun.",
        },
      ],
    },
    cta: {
      badge: 'Eng ko\'p sotilgan',
      title1: 'Bizning',
      title2: 'bestsellerlari.',
      body: 'Minglab foydalanuvchilar Bikonni tanladi. O\'zbekiston uchun professional quvvat.',
      shop_now: 'Do\'konga o\'tish',
      view_all: 'Hammasini ko\'rish →',
    },
    monitors: {
      hero_eyebrow: 'Vision Seriyasi',
      hero_title: 'Hamma narsani\nboshqacha ko\'ring.',
      hero_subtitle: 'Aniqlik uchun yaratilgan. Har bir pikseldan eng yaxshisini talab qiladiganlar uchun.',
      hero_cta_primary: 'Modellarni ko\'rish',
      hero_cta_secondary: 'Xususiyatlar',
      hero_scroll: 'Aylantiring',

      lineup_eyebrow: 'Model qatori',
      lineup_title: 'O\'z Vision-ingizni tanlang',
      lineup_vision_name: 'Bikon Vision',
      lineup_vision_tag: 'Asosiy unumdorlik',
      lineup_vision_desc: 'Aniq ranglar va ingichka dizayn bilan IPS panel — zamonaviy ish joyi uchun ideal displey.',
      lineup_pro_name: 'Bikon Vision Pro',
      lineup_pro_tag: 'Professional daraja',
      lineup_pro_desc: 'Ultra-ingichka ramkalar, V-shaklidagi metall shtativ va professional foydalanuvchilar uchun tez javob vaqti.',
      lineup_badge_pro: 'PRO',
      lineup_learn: 'Batafsil',

      features_eyebrow: 'Xususiyatlar',
      features_title: 'Har bir detal\nmukammal.',
      features: [
        {
          label: 'IPS Displey',
          title: 'Kristall toza IPS panel',
          desc: 'Zavodda kalibrlangan IPS panellar har qanday burchakdan aniq va yorqin ranglarni ta\'minlaydi — dizayn, montaj va kundalik ish uchun ideal.',
        },
        {
          label: '75 Gts',
          title: 'Silliq 75 Gts yangilanish tezligi',
          desc: "Jadvallarni aylantirishda yoki yuqori aniqlikdagi video ko'rishda uzilishsiz silliq tasvir.",
        },
        {
          label: '2.3 mm ramka',
          title: 'Ultra-ingichka ramkalar',
          desc: 'Atigi 2.3 mm ramka tasvirni birinchi o\'ringa qo\'yadi — hududsiz ko\'rishni ta\'minlaydi.',
        },
        {
          label: 'Ergonomika',
          title: 'Ergonomik qiyalik va shtativ',
          desc: "-5°...+20° qiyalik diapazoni va Vision Pro ning V-shaklidagi metall shtativ ideal ko'rish burchagini sozlash imkonini beradi.",
        },
      ],

      specs_eyebrow: 'Xususiyatlar',
      specs_title: 'Texnik xususiyatlar',
      specs_vision_label: 'Bikon Vision',
      specs_pro_label: 'Bikon Vision Pro',
      specs_categories: [
        {
          name: 'Displey',
          rows: [
            ['Panel turi',          'IPS',                 'IPS'],
            ["Ekran o'lchami",      '22" / 24"',           '24" / 27"'],
            ['Ruxsor',              '1920×1080',           '1920×1080'],
            ['Yangilanish',         '75 Gts',              '75 Gts'],
            ['Javob vaqti',         '0.5 ms',              '5 ms (GtG)'],
            ['Yorqinlik',           '250 cd/m²',           '250 cd/m²'],
            ['Ramkalar',            'Standart',            '2.3mm ultra-ingichka'],
          ],
        },
        {
          name: 'Unumdorlik',
          rows: [
            ['Adaptiv sinxron.',    'FreeSync',            'FreeSync'],
            ["Ko'k yorug' filtri",  '✓',                   '✓'],
            ['Flicker-Free',        '✓',                   '✓'],
            ['Tomonlar nisbati',    '16:9',                '16:9'],
            ["Ko'rish burchagi",    '178° / 178°',         '178° / 178°'],
          ],
        },
        {
          name: 'Ergonomika',
          rows: [
            ['Qiyalik',             '-5° / +15°',          '-5° / +20°'],
            ['Shtativ turi',        'Standart',            'V-shaklidagi metall'],
            ['VESA kreplan.',       '100×100 mm',          '100×100 mm'],
            ['Kabel boshqaruvi',    '—',                   'Ichki'],
          ],
        },
        {
          name: 'Ulanish',
          rows: [
            ['HDMI',                '1× HDMI 1.4',         '1× HDMI 1.4'],
            ['VGA',                 '1× VGA',              '1× VGA'],
            ['Audio chiqishi',      '3.5 mm AUX',          '3.5 mm AUX'],
            ['Quvvat',              'AC 100–240V',         'AC 100–240V'],
          ],
        },
      ],

      color_eyebrow: 'Displey',
      color_title: 'Cheksiz Rang',
      color_body: 'Zavod kalibrlangan IPS panellar sRGB rang fazosining 99% ini ajoyib aniqlik bilan uzatadi — har bir tasvir xuddi mo\'ljallangandek ko\'rinadi.',
      color_stats: [
        { value: '99%',   label: 'sRGB' },
        { value: '250',   label: 'kd/m²' },
        { value: '16.7M', label: 'Rang' },
      ],

      stand_eyebrow: 'Dizayn',
      stand_title: 'Ikonik\nV-Stend',
      stand_body: 'Aviatsiya alyuminiyidan yasalgan, firma V-shaklidagi stend har bir ish stolingizni ko\'rinishga aylantiradi.',
      stand_pills: ['Alyuminiy qotishma', '-5° / +20° qiyalik'],

      cta_title: 'Displeyingizni\nyangilashga tayyormisiz?',
      cta_body: 'Minglab professional va o\'yinchilar Bikon Vision-ga o\'tishdi.',
      cta_shop: 'Do\'konga o\'tish',
      cta_catalog: 'Katalog yuklab olish',
      bento_eyebrow: 'Asosiy xususiyatlar',
      bento_title: 'VISION SERIYASI DISPLEY TEXNOLOGIYASI',
      ports_eyebrow: 'Ulanish',
      ports_title: 'Kerakli barcha\nulanishlar.',
      ports_body: "Vision seriyali monitorlar tayyor holda keladi — HDMI, D-SUB va 3.5mm AUX chiqishi o'rnatilgan, bir necha soniyada ulaning.",
    },
    laptops: {
      hero_eyebrow: 'Smartbook va Workbook Seriyasi',
      hero_title: 'Siz bilan\nyuradigan quvvat.',
      hero_subtitle: "Talabalar, professional va ijodkorlar uchun yaratilgan. Dizayni bilan yengil, tabiatan kuchli.",
      hero_cta_primary: "Modellarni ko'rish",
      hero_cta_secondary: 'Xususiyatlar',
      hero_scroll: 'Pastga aylantiring',

      built_eyebrow: 'Dizayn',
      built_title: 'Boshqacha yaratilgan.',
      built_body: "Ajoyib ingichka va yengil bo'lishi uchun aniq ishlab chiqilgan — kerakli unumdorlikka putur etkazmagan holda.",
      built_stats: [
        { value: '1.8kg', label: "Boshlang'ich og'irlik" },
        { value: '18mm', label: 'Ingichka profil' },
        { value: '8soat', label: 'Batareya' },
      ],

      features_eyebrow: 'Xususiyatlar',
      features_title: "Har bir xususiyat,\nbatafsil o'ylangan.",
      features: [
        {
          label: 'IPS Displey',
          title: '15.6" Full HD\nIPS Displey',
          desc: "Zavod kalibrlangan 15.6\" Full HD IPS panel yorqin ranglar va aniq matn taqdim etadi — har kuni qulay.",
        },
        {
          label: 'Intel Core',
          title: 'Intel Core\nUnumdorligi',
          desc: "Intel Celeron dan Core i-seriyasigacha — har doim vazifa uchun to'g'ri dvigatel.",
        },
        {
          label: "Kun bo'yi",
          title: '8 soatgacha\nbatareya quvvati',
          desc: "Ishingizni istalgan joyga olib boring. 8 soatgacha batareya — Bikon noutbuklari sizning kuningizga mos keladi.",
        },
        {
          label: 'Ulanish',
          title: 'Hamma narsa\nulangan',
          desc: "O'rnatilgan Wi-Fi, Bluetooth, keng portlar va Full HD veb-kamera — doim aloqada bo'ling.",
        },
      ],

      lineup_eyebrow: 'Model qatori',
      lineup_title: "O'zingizning\nmukammal noutbukingizni tanlang",
      lineup_smartbook_name: 'Bikon Smartbook',
      lineup_smartbook_tag: 'Kundalik mukammallik',
      lineup_smartbook_desc: "Kundalik foydalanish uchun ideal noutbuk — yengil, ishonchli, talabalar va mutaxassislar uchun.",
      lineup_workbook_name: 'Bikon Workbook',
      lineup_workbook_tag: 'Professional quvvat',
      lineup_workbook_desc: "Ko'proq talab qiladigan professionallar uchun — kuchli protsessor, ko'proq RAM va kengaytirilgan ulanish.",
      lineup_badge_pro: 'PRO',
      lineup_learn: "Do'konga o'tish",

      specs_eyebrow: 'Xususiyatlar',
      specs_title: 'Texnik xususiyatlar',
      specs_smartbook_label: 'Smartbook',
      specs_workbook_label: 'Workbook',
      specs_categories: [
        {
          name: 'Displey',
          rows: [
            ["Ekran o'lchami",  '15.6"',              '15.6"'],
            ['Ruxsor',          '1920×1080',          '1920×1080'],
            ['Panel turi',      'IPS',                'IPS'],
            ['Yangilanish',     '60 Gts',             '60 Gts'],
            ['Yorqinlik',       '220 nit',            '250 nit'],
          ],
        },
        {
          name: 'Unumdorlik',
          rows: [
            ['Protsessor',      'Intel Celeron N5095', 'Intel Core i5 / i7'],
            ['RAM',             '8GB DDR4',            '16GB DDR4'],
            ['Saqlash',         '256GB SSD',           '512GB NVMe SSD'],
            ['Grafika',         'Intel UHD',           'Intel Iris Xe'],
            ['OS',              'Windows 11',          'Windows 11 Pro'],
          ],
        },
        {
          name: 'Batareya va tana',
          rows: [
            ['Batareya',        '5000 mAh',           '6000 mAh'],
            ['Ishlash vaqti',   '7 soatgacha',        '8 soatgacha'],
            ["Og'irlik",        '1.8 kg',             '1.9 kg'],
            ['Qalinlik',        '18mm',               '18mm'],
            ['Material',        'Plastik',            'Alyuminiy qotishma'],
          ],
        },
        {
          name: 'Ulanish',
          rows: [
            ['Wi-Fi',           'Wi-Fi 5',             'Wi-Fi 6'],
            ['Bluetooth',       'BT 5.0',              'BT 5.2'],
            ['USB portlar',     '2× USB-A, 1× USB-C',  '2× USB-A, 2× USB-C'],
            ['HDMI',            '1× HDMI 1.4',         '1× HDMI 2.0'],
            ['Veb-kamera',      'Full HD 1080p',       'Full HD 1080p'],
            ['Audio',           '3.5mm Jack',          '3.5mm Jack'],
          ],
        },
      ],

      cta_title: "Noutbukingizni\ntopishga tayyormisiz?",
      cta_body: "Smartbook yoki Workbook — ikkalasi ham O'zbekistonda yaratilgan va yig'ilgan.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',
    },

    aios: {
      hero_eyebrow: 'Matrix va Optima Seriyasi',
      hero_title: 'Yaxlit\nish stantsiyasi.',
      hero_subtitle: "Tartibli va samarali ish joyi uchun. Butun kompyuter — bitta chiroyli korpusda.",
      hero_cta_primary: "Modellarni ko'rish",
      hero_cta_secondary: 'Xususiyatlar',
      hero_scroll: 'Pastga aylantiring',

      built_eyebrow: 'Dizayn',
      built_title: 'Boshqacha yig\'ilgan.',
      built_body: "Barcha komponentlar bitta ingichka ramkaga joylashtirilgan — simlar yo'q, tartib bor.",
      built_stats: [
        { value: '23.8"', label: 'IPS displey' },
        { value: 'Intel', label: '12-avlod Core' },
        { value: 'Slim', label: 'Ingichka dizayn' },
      ],

      features_eyebrow: 'Xususiyatlar',
      features_title: "Har bir detal,\nbatafsil o'ylangan.",
      features: [
        {
          label: 'IPS Displey',
          title: '23.8" Full HD\nIPS Displey',
          desc: "Keng 23.8\" ekran va kristall toza IPS panel — ko'p vazifali ish va multimedia uchun.",
        },
        {
          label: 'Intel Core',
          title: 'Intel Core\nUnumdorligi',
          desc: "Intel Core i3 dan i7 gacha — ofis ishlaridan ilg'or grafik dasturlargacha bardosh beradi.",
        },
        {
          label: 'Dizayn',
          title: 'Ingichka va\nchiroyli tana',
          desc: "Ultra-ingichka profil va minimal ramkalar — ish stolingizni tartibli va zamonaviy saqlaydi.",
        },
        {
          label: 'Ulanish',
          title: "To'liq\nulanish",
          desc: "HDMI, USB, Wi-Fi va Bluetooth — ish uchun zarur hamma narsa qurilmaga o'rnatilgan.",
        },
      ],

      compare_eyebrow: 'Qiyoslash',
      compare_title: 'Matrix va Optima:\nqaysi biri siz uchun?',
      compare_matrix_name: 'Bikon Matrix',
      compare_matrix_tag: 'Kundalik unumdorlik',
      compare_optima_name: 'Bikon Optima',
      compare_optima_tag: 'Professional daraja',
      compare_rows: [
        { spec: 'Protsessor',     matrix: 'Intel Core i3',    optima: 'Intel Core i5/i7' },
        { spec: 'RAM',            matrix: '8 GB',             optima: '16 GB' },
        { spec: 'Saqlash',        matrix: '256 GB SSD',       optima: '512 GB NVMe' },
        { spec: 'Displey',        matrix: '21.5" FHD',        optima: '23.8" FHD' },
        { spec: 'Grafika',        matrix: "O'rnatilgan",      optima: 'Dedicated' },
        { spec: 'Wi-Fi',          matrix: 'Wi-Fi 5',          optima: 'Wi-Fi 6' },
        { spec: 'Bluetooth',      matrix: 'BT 5.0',           optima: 'BT 5.2' },
        { spec: 'OS',             matrix: 'Windows 11',       optima: 'Windows 11 Pro' },
        { spec: 'Kafolat',        matrix: '1 yil',            optima: '2 yil' },
      ],

      specs_eyebrow: 'Xususiyatlar',
      specs_title: 'Texnik xususiyatlar',
      specs_matrix_label: 'Matrix',
      specs_optima_label: 'Optima',
      specs_categories: [
        {
          name: 'Displey',
          rows: [
            ['Panel turi',        'IPS',                    'IPS'],
            ["Ekran o'lchami",    '21.5" FHD',              '23.8" FHD'],
            ['Ruxsor',            '1920×1080',              '1920×1080'],
            ['Yangilanish',       '60 Gts',                 '75 Gts'],
            ['Yorqinlik',         '250 cd/m²',              '300 cd/m²'],
          ],
        },
        {
          name: 'Unumdorlik',
          rows: [
            ['Protsessor',        'Intel Core i3 (12-avlod)', 'Intel Core i5/i7 (12-avlod)'],
            ['RAM',               '8 GB DDR4',              '16 GB DDR4'],
            ['Saqlash',           '256 GB SSD',             '512 GB NVMe'],
            ['Grafika',           "Intel UHD (o'rnatilgan)", 'Intel Iris Xe / Dedicated'],
          ],
        },
        {
          name: 'Ulanish',
          rows: [
            ['Wi-Fi',             'Wi-Fi 5',                'Wi-Fi 6'],
            ['Bluetooth',         'BT 5.0',                 'BT 5.2'],
            ['USB portlar',       '3× USB-A, 1× USB-C',     '4× USB-A, 2× USB-C'],
            ['HDMI chiqishi',     '1× HDMI',                '1× HDMI'],
            ['Veb-kamera',        'Full HD 1080p',          'Full HD 1080p + IR'],
          ],
        },
        {
          name: 'Tana va Kafolat',
          rows: [
            ["Og'irlik",          '4.5 kg',                 '4.8 kg'],
            ['VESA kreplan.',     '75×75 mm',               '100×100 mm'],
            ['OS',                'Windows 11',             'Windows 11 Pro'],
            ['Kafolat',           '1 yil',                  '2 yil'],
            ['Ishlab chiqarish',  "O'zbekistonda yig'ilgan", "O'zbekistonda yig'ilgan"],
          ],
        },
      ],

      cta_title: "Ish joyingizni\nyangilashga tayyormisiz?",
      cta_body: "Matrix yoki Optima — ikkalasi ham O'zbekistonda yaratilgan va yig'ilgan.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',

      nova_teaser_eyebrow: 'Bikon NOVA',
      nova_teaser_title:   "Tanishing:\nBikon NOVA.",
      nova_teaser_body:    "NOVA ni kashf eting — 24\" va 27\" IPS displey, Intel Core i3/i5/i7 (12–14-avlod) va 20mm yupqa korpusli monoblogimiz.",
      nova_teaser_cta:     "NOVA ni Ko'rish",

      models_eyebrow: "Bizning AIO qatorimiz",
      models_title: "Ideal modelingizni\ntanlang.",
      models_matrix_name: 'Matrix',
      models_matrix_tag: "Zamonaviy unumdorlik",
      models_matrix_desc: "Intel 12–14-avlod, DDR4, H610 chipseti — zamonaviy ish joyi uchun yaratilgan.",
      models_optima_name: 'Optima',
      models_optima_tag: "Ishonchli imkoniyat",
      models_optima_desc: "Intel 2–3-avlod, DDR3, H61 chipseti — qulay narxda barqaror unumdorlik.",
      models_nova_name: 'NOVA',
      models_nova_tag: "Premium flagman",
      models_nova_desc: "20mm alyuminiy, Wi-Fi 6, Intel 12–14-avlod — Bikonning eng nafis monoklogi.",
      models_explore: "Ko'rish",
    },

    nova: {
      hero_eyebrow: 'NOVA Seriyasi',
      hero_title: 'Zamonaviy\nish joyi uchun.',
      hero_subtitle: "Ofis va ijodkorlar uchun yaratilgan. Professional unumdorlik — nafis va elegant dizayn.",
      hero_cta_primary: 'NOVA-ni ko\'rish',
      hero_cta_secondary: 'Xususiyatlar',

      lineup_eyebrow: 'Model qatori',
      lineup_title: "Tanishing:\nBikon NOVA.",
      lineup_nova_name: 'Bikon NOVA',
      lineup_nova_tag: 'All-in-One kompyuter',
      lineup_nova_desc: "24\" yoki 27\" IPS displey, Intel Core i3/i5/i7 (12–14-avlod), DDR4 16 GB gacha va 20 mm CNC-alyuminiy korpus — NOVA har qanday ehtiyojga moslashadi.",
      lineup_nova_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', "DDR4 16 GB gacha", '20 mm'],
      lineup_learn: "Do'konga o'tish",

      specs_eyebrow: 'Xususiyatlar',
      specs_title: 'NOVA texnik xususiyatlari',
      specs_label: 'Bikon NOVA',
      specs_categories: [
        {
          name: 'Displey',
          rows: [
            ["Ekran o'lchami",    '24" / 27"',                      '—'],
            ['Ruxsor',            '1920×1080 / 2560×1440',          '—'],
            ['Panel turi',        'IPS',                            '—'],
            ['Yangilanish tezligi','75 Gts',                        '—'],
            ['Yorqinlik',         '300–350 cd/m²',                  '—'],
            ['Ko\'rish burchagi', '178°',                           '—'],
          ],
        },
        {
          name: 'Unumdorlik',
          rows: [
            ['Protsessor',        'Intel Core i3 / i5 / i7 (12–14-avlod)', '—'],
            ['Ona plata',         'H610 · Socket LGA 1700',                '—'],
            ['RAM',               'DDR4  4 / 8 / 16 GB',                   '—'],
            ['Saqlash',           '128 / 256 / 512 / 1024 GB NVMe SSD',    '—'],
            ['Grafika',           'Intel UHD 730 / 770',                   '—'],
          ],
        },
        {
          name: 'Ulanish',
          rows: [
            ['Wi-Fi',             'Wi-Fi 6 (802.11ax)',   '—'],
            ['Bluetooth',         'BT 5.2',              '—'],
            ['USB portlar',       '4× USB-A, 2× USB-C',  '—'],
            ['HDMI chiqishi',     '1× HDMI 2.0',         '—'],
            ['Veb-kamera',        'Full HD 1080p',        '—'],
            ['Audio',             '3.5mm Jack + Karnay',  '—'],
          ],
        },
        {
          name: 'Tana va Kafolat',
          rows: [
            ['Korpus',            'CNC Alyuminiy',               '—'],
            ['Qalinlik',          '20 mm',                       '—'],
            ['OS',                'Windows 11 Pro',              '—'],
            ['Kafolat',           '12 oy',                       '—'],
            ['Ishlab chiqarish',  "O'zbekistonda yig'ilgan",     '—'],
          ],
        },
      ],

      cta_title: "Ish stolingizni\no'zgartirishga tayyormisiz?",
      cta_body: "NOVA. O'zbekistonda yig'ilgan. Sizning ishingiz uchun yaratilgan.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',

      display_eyebrow: 'Aniq Displey',
      display_title: "27\" QHD IPS.\nHar bir detal — yorqin.",
      display_body: "NOVA 27 dyuymli QHD IPS paneli bilan keladi: 2560×1440 piksel, 99% sRGB rang aniqligi va 75 Gts yangilanish tezligi — har bir piksel ahamiyatli.",
      display_title_24: "24\" FHD IPS.\nHar ish joyi uchun ideal.",
      display_body_24: "NOVA 24 modeli 1920×1080 Full HD IPS paneli, 99% sRGB rang aniqligi va 75 Gts yangilanish tezligi bilan keladi — ixcham va yorqin ekran.",

      back_eyebrow: 'Puxta Muhandislik',
      back_title: "Mukammal.\nHar tomondan.",
      back_body: "NOVAning orqa qismi old qismi kabi puxta ishlab chiqilgan. 20 mm qalinlikdagi alyuminiy korpus barcha ulanishlarni — HDMI, USB-A, USB-C va audio — tartibli joylashtirishni ta'minlaydi.",

      vertical_eyebrow: 'Portret rejimi',
      vertical_title: "Buriting.\nBoshqacha ishlang.",
      vertical_body: "NOVA stendi to'liq 90° portret burilishini qo'llab-quvvatlaydi — kod yozish, uzun hujjatlarni o'qish yoki vertikal maketlar bilan ishlash uchun ideal. Bir tekis burilish butun ish oqimingizni o'zgartiradi.",

      apps_eyebrow: "Windows uchun yaratilgan",
      apps_title: "Windows 11.\nIlovalaringiz\nuchib ketsin.",
      apps_body: "NOVA oldindan o'rnatilgan Windows 11 Pro bilan keladi — Word, Excel, PowerPoint, Teams va minglab ilovalar 24\" yoki 27\" IPS ekranda mukammal ishlaydi.",

      bento_eyebrow: "Asosiy xususiyatlar",
      bento_title: "NOVA TEXNOLOGIYALARI",
      connectivity_eyebrow: "Ulanish",
      connectivity_title: "Kerakli barcha\nportlar.",
      connectivity_body: "NOVA 20mm ingichka tanasida hamma narsani joylashtirgan — yuqori tezlikli USB-C, HDMI 2.0 video chiqish va Bluetooth 5.0.",
      cam_eyebrow: "O'rnatilgan imkoniyatlar",
      cam_title: "Aniq ko'ring.\nHamma narsani eshiting.",
      cam_body: "Full HD veb-kamera va stereo karnaylar ichiga o'rnatilgan — qo'shimcha uskuna kerak emas, sifatli video qo'ng'iroqlar va boy ovoz.",
    },

    matrix: {
      hero_eyebrow: 'Bikon Matrix',
      hero_title: "Unumdorlik —\nhar kim uchun.",
      hero_subtitle: "Matrix Intel 12–14-avlod kuchi, DDR4 xotira va 24\" yoki 27\" IPS displeyni bitta kompakt monoblokga birlashtiradi.",
      hero_cta_primary: "Matrix ni ko'rish",
      hero_cta_secondary: 'Xususiyatlar',

      lineup_eyebrow: 'Model qatori',
      lineup_title: "Tanishing:\nBikon Matrix.",
      lineup_name: 'Bikon Matrix',
      lineup_tag: 'All-in-One kompyuter',
      lineup_desc: "24\" yoki 27\" IPS displey, Intel Core i3/i5/i7 (12–14-avlod), DDR4 16 GB gacha — bir ixcham qurilmada ishonchli unumdorlik.",
      lineup_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', "DDR4 16 GB gacha", 'H610 Chipseti'],
      lineup_learn: "Do'konga o'tish",

      specs_eyebrow: 'Xususiyatlar',
      specs_title: 'Matrix texnik xususiyatlari',
      specs_label: 'Bikon Matrix',
      specs_categories: [
        {
          name: 'Displey',
          rows: [
            ["Ekran o'lchami",    '24" / 27"',                      '—'],
            ['Ruxsor',            '1920×1080 / 2560×1440',          '—'],
            ['Panel turi',        'IPS',                            '—'],
            ['Yangilanish tezligi','75 Gts',                        '—'],
            ['Yorqinlik',         '300–350 cd/m²',                  '—'],
            ["Ko'rish burchagi",  '178°',                           '—'],
          ],
        },
        {
          name: 'Unumdorlik',
          rows: [
            ['Protsessor',  'Intel Core i3 / i5 / i7 (12–14-avlod)', '—'],
            ['Ona plata',   'H610 · Socket LGA 1700',                '—'],
            ['RAM',         'DDR4  4 / 8 / 16 GB',                   '—'],
            ['Saqlash',     '128 / 256 / 512 / 1024 GB NVMe SSD',    '—'],
            ['Grafika',     'Intel UHD 730 / 770',                   '—'],
          ],
        },
        {
          name: 'Ulanish',
          rows: [
            ['Wi-Fi',         'Wi-Fi 6 (802.11ax)',  '—'],
            ['Bluetooth',     'BT 5.0',              '—'],
            ['USB portlar',   '4× USB-A, 1× USB-C',  '—'],
            ['HDMI chiqishi', '1× HDMI 2.0',         '—'],
            ['Veb-kamera',    'Full HD 1080p',        '—'],
            ['Audio',         '3.5mm Jack + Karnay',  '—'],
          ],
        },
        {
          name: 'Tana va Kafolat',
          rows: [
            ['OS',               'Windows 11 Pro',              '—'],
            ['Kafolat',          '12 oy',                       '—'],
            ['Ishlab chiqarish', "O'zbekistonda yig'ilgan",     '—'],
          ],
        },
      ],

      cta_title: "Ishga tayyormisiz?\nBu Matrix.",
      cta_body: "Matrix. O'zbekistonda yig'ilgan. Kundalik unumdorlik uchun yaratilgan.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',

      display_eyebrow: 'IPS Displey',
      display_title: "27\" QHD IPS.\nKo'rishingizni kengaytiring.",
      display_body: "Matrix 27\" QHD IPS paneli 2560×1440 piksel va 75 Gts yangilanish tezligini taqdim etadi — har qanday vazifa uchun kristall toza tasvir.",
      display_title_24: "24\" FHD IPS.\nAniq va diqqatni jamlagan.",
      display_body_24: "Matrix 24\" Full HD IPS paneli 1920×1080 piksel va 75 Gts yangilanish tezligini ta'minlaydi — har qanday ish joyi uchun yorqin va aniq tasvir.",

      back_eyebrow: 'Puxta Dizayn',
      back_title: "Toza kabellar.\nToza ish stoli.",
      back_body: "Matrix orqa paneli barcha ulanishlarni — HDMI, USB-A, USB-C va audioʼni — tartibli va qulay joylashtiradi, ish joyingizni ozoda saqlaydi.",

      apps_eyebrow: "Windows uchun yaratilgan",
      apps_title: "Windows 11.\nBirinchi kundan tayyor.",
      apps_body: "Matrix oldindan o'rnatilgan Windows 11 Pro bilan keladi — Word, Excel, Teams va minglab ilovalar 24\" yoki 27\" IPS ekranda mukammal ishlaydi.",

      bento_eyebrow: "Asosiy xususiyatlar",
      bento_title: "MATRIX TEXNOLOGIYALARI",

      connectivity_eyebrow: "Ulanish",
      connectivity_title: "Kerakli barcha\nportlar.",
      connectivity_body: "Matrix HDMI 2.0, USB-C, USB-A, Wi-Fi 6 va Bluetooth 5.0 orqali ulanishni ta'minlaydi.",

      cam_eyebrow: "O'rnatilgan imkoniyatlar",
      cam_title: "Aniq ko'ring.\nHamma narsani eshiting.",
      cam_body: "Full HD veb-kamera va stereo karnaylar ichiga o'rnatilgan — qo'shimcha uskuna kerak emas, sifatli video qo'ng'iroqlar va boy ovoz.",
    },

    optima: {
      hero_eyebrow: 'Bikon Optima',
      hero_title: "Ishonchli kuch.\nHar kuni tayyor.",
      hero_subtitle: "Optima Intel Core ning isbotlangan unumdorligi, DDR3 xotira va 24\" yoki 27\" IPS displeyni qulay narxda taqdim etadi.",
      hero_cta_primary: "Optima ni ko'rish",
      hero_cta_secondary: 'Xususiyatlar',

      lineup_eyebrow: 'Model qatori',
      lineup_title: "Tanishing:\nBikon Optima.",
      lineup_name: 'Bikon Optima',
      lineup_tag: 'All-in-One kompyuter',
      lineup_desc: "24\" yoki 27\" IPS displey, Intel Core i3/i5/i7 (2–3-avlod), DDR3 16 GB gacha — ajoyib narxda mustahkam kundalik hisoblash.",
      lineup_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', "DDR3 16 GB gacha", 'H61 Chipseti'],
      lineup_learn: "Do'konga o'tish",

      specs_eyebrow: 'Xususiyatlar',
      specs_title: 'Optima texnik xususiyatlari',
      specs_label: 'Bikon Optima',
      specs_categories: [
        {
          name: 'Displey',
          rows: [
            ["Ekran o'lchami",    '24" / 27"',                      '—'],
            ['Ruxsor',            '1920×1080 / 2560×1440',          '—'],
            ['Panel turi',        'IPS',                            '—'],
            ['Yangilanish tezligi','75 Gts',                        '—'],
            ['Yorqinlik',         '300–350 cd/m²',                  '—'],
            ["Ko'rish burchagi",  '178°',                           '—'],
          ],
        },
        {
          name: 'Unumdorlik',
          rows: [
            ['Protsessor',  'Intel Core i3 / i5 / i7 (2–3-avlod)',  '—'],
            ['Ona plata',   'H61 · Socket LGA 1155',                 '—'],
            ['RAM',         'DDR3  4 / 8 / 16 GB',                   '—'],
            ['Saqlash',     '128 / 256 / 512 / 1024 GB SSD',         '—'],
            ['Grafika',     'Intel HD Graphics 2000 / 4000',         '—'],
          ],
        },
        {
          name: 'Ulanish',
          rows: [
            ['Wi-Fi',         'Wi-Fi (802.11n)',      '—'],
            ['Bluetooth',     'BT 4.0',              '—'],
            ['USB portlar',   '4× USB-A, 1× USB-C',  '—'],
            ['HDMI chiqishi', '1× HDMI 1.4',         '—'],
            ['Veb-kamera',    'Full HD 1080p',        '—'],
            ['Audio',         '3.5mm Jack + Karnay',  '—'],
          ],
        },
        {
          name: 'Tana va Kafolat',
          rows: [
            ['OS',               'Windows 10 / 11 Pro',         '—'],
            ['Kafolat',          '12 oy',                       '—'],
            ['Ishlab chiqarish', "O'zbekistonda yig'ilgan",     '—'],
          ],
        },
      ],

      cta_title: "Aqlli tanlov.\nBikon Optima.",
      cta_body: "Optima. O'zbekistonda yig'ilgan. Sinovdan o'tgan ishonchli hisoblash.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',

      display_eyebrow: 'IPS Displey',
      display_title: "27\" QHD IPS.\nKo'rishingizni kengaytiring.",
      display_body: "Optima 27\" QHD IPS paneli 75 Gts da aniq 2560×1440 ruxsorni taqdim etadi — ish va kundalik foydalanish uchun yorqin tasvir.",
      display_title_24: "24\" FHD IPS.\nAniq va ravshan.",
      display_body_24: "Optima 24\" Full HD IPS paneli 75 Gts da 1920×1080 kristall toza tasvirni ta'minlaydi — har qanday vazifa uchun ishonchli aniqlik.",

      back_eyebrow: 'Qulay Dizayn',
      back_title: "Hamma narsa\no'z joyida.",
      back_body: "Optima orqa paneli barcha portlarni — HDMI, USB-A va audioʼni — aynan kerakli joyga joylashtiradi, sozlash va kundalik foydalanishni oson qiladi.",

      apps_eyebrow: "Windows uchun yaratilgan",
      apps_title: "Windows 11.\nTanish va tayyor.",
      apps_body: "Optima oldindan o'rnatilgan Windows 11 Pro bilan keladi — barcha zarur ilovalar bilan mos va darhol ishlashga tayyor.",

      bento_eyebrow: "Asosiy xususiyatlar",
      bento_title: "OPTIMA TEXNOLOGIYALARI",

      connectivity_eyebrow: "Ulanish",
      connectivity_title: "Kerakli barcha\nportlar.",
      connectivity_body: "Optima HDMI 1.4, VGA, USB-A, Wi-Fi va Bluetooth orqali ulanishni ta'minlaydi.",

      cam_eyebrow: "O'rnatilgan imkoniyatlar",
      cam_title: "Aniq ko'ring.\nHamma narsani eshiting.",
      cam_body: "Full HD veb-kamera va stereo karnaylar ichiga o'rnatilgan — qo'shimcha uskuna kerak emas, video qo'ng'iroqlar va kundalik ovoz uchun tayyor.",
    },

    blog: {
      hero_eyebrow: 'Blog va foydali ma\'lumotlar',
      hero_title: 'Yangiliklar va\nfoydali maslahatlar',
      hero_subtitle: 'Mahsulot yangiliklari, texnik qo\'llanmalar va Bikon jamoasidan maslahatlar.',
      all_label: 'Barchasi',
      read_more: 'Maqolani o\'qish',
      min_read: 'daqiqa o\'qish',
      featured_badge: 'Asosiy',
      categories: ['Barchasi', 'Yangilik', 'Qo\'llanma', 'Maslahat', 'Sharh'],
      posts: [
        {
          id: 'nova-2026',
          category: 'Yangilik',
          date: '10 may 2026',
          title: 'NOVA AIO: zamonaviy ish joyi uchun yaratilgan',
          excerpt: 'NOVA All-in-One — chiroyli va kuchli monoblock, ish stolidagi eleganlik va unumdorlikni birlashtiradigan professional mahsulot.',
          read_time: '4',
          featured: true,
        },
        {
          id: 'matrix-vs-optima',
          category: 'Qo\'llanma',
          date: '28 apr 2026',
          title: 'Matrix va Optima: qaysi monoblock siz uchun to\'g\'ri?',
          excerpt: 'Ikkalasi ham Bikonning kuchli monobloklari, lekin turli foydalanuvchilar uchun. Qaysi modelni tanlashni aniqlashga yordam beradigan batafsil taqqoslash.',
          read_time: '6',
          featured: false,
        },
        {
          id: 'smartbook-review',
          category: 'Sharh',
          date: '15 apr 2026',
          title: 'Smartbook seriyasi: quvvat va yengillik birgalikda',
          excerpt: 'Oylik sinovdan keyin Bikon Smartbook haqidagi halol fikrimiz — bu noutbukni o\'rta segmentda nima ajratib turadi.',
          read_time: '7',
          featured: false,
        },
        {
          id: 'catalog-2026',
          category: 'Yangilik',
          date: '1 apr 2026',
          title: 'Bikon 2026 to\'liq mahsulot katalogi tayyorlandi',
          excerpt: 'Barcha Bikon mahsulot liniyalarini qamrab olgan 2026 katalogini yuklab oling — xususiyatlar, narxlar va konfiguratsiya variantlari.',
          read_time: '2',
          featured: false,
        },
        {
          id: 'office-setup',
          category: 'Maslahat',
          date: '20 mar 2026',
          title: 'Bikon bilan ideal ofis joylashuvini yaratishning 5 usuli',
          excerpt: 'Kabel boshqaruvidan tortib monitor balandigacha — kichik o\'zgarishlar ish kuniga katta foyda keltiradi.',
          read_time: '5',
          featured: false,
        },
        {
          id: 'pc-maintenance',
          category: 'Maslahat',
          date: '5 mar 2026',
          title: 'Kompyuteringizni yangiday saqlash usullari',
          excerpt: 'Chang, qizish va keraksiz dasturlar — unumdorlikning uch asosiy dushmani. Qurilmangizni parvarish qilish va xizmat muddatini uzaytirish bo\'yicha amaliy maslahatlar.',
          read_time: '5',
          featured: false,
        },
      ],
    },

    footer: {
      tagline: 'O\'zbekistonda ishlab chiqarilgan sifatli texnologiyalar. Kelajakni birgalikda quramiz.',
      copyright: '© 2026 Bikon.uz. O\'zbekistonda yaratilgan.',
      cols: [
        {
          heading: 'Mahsulotlar',
          links: ['Noutbuklar', 'Monoblok', 'Korpuslar', 'Monitorlar'],
        },
        {
          heading: 'Bikon haqida',
          links: ['Kompaniya', 'Karyera', 'Yangiliklar', 'Aloqa'],
        },
        {
          heading: 'Yordam',
          links: ['Xarid qilish', 'Yetkazib berish', 'Kafolat', 'Servis markazlari'],
        },
      ],
      legal: ['Maxfiylik', 'Shartlar', 'Sayt xaritasi'],
    },
  },
} as const;

export default t;
