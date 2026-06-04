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

/* ── Russian translations ─────────────────────────────────────────────── */
const SEED_PAGES_RU = [
  {
    slug: 'laptops',
    hero_eyebrow: 'Серия Smartbook и Workbook',
    hero_title: 'Мощность,\nКоторая С Тобой.',
    hero_subtitle: 'Создан для студентов, профессионалов и творческих людей. Лёгкий по дизайну, мощный по сути.',
    hero_cta_primary: 'Смотреть модели',
    hero_cta_secondary: 'Характеристики',
    lineup_eyebrow: 'Линейка моделей',
    lineup_title: 'Выбери Свой\nИдеальный Ноутбук',
    models: [
      { name: 'Bikon Smartbook', tag: 'Высокая эффективность', badge: 'PRO',
        description: 'Intel Celeron N5095, 8 ГБ DDR4, 256 ГБ SSD, сканер отпечатков — умная производительность для студентов и профессионалов.',
        specs: ['Intel Celeron N5095', '8 ГБ DDR4', '256 ГБ SSD', 'Сканер отпечатков'] },
      { name: 'Bikon Workbook', tag: 'Надёжный для каждого дня',
        description: 'Intel Celeron N4000, 8 ГБ DDR4, 256 ГБ SSD — надёжный и стабильный, создан для повседневных задач.',
        specs: ['Intel Celeron N4000', '8 ГБ DDR4', '256 ГБ SSD'] },
    ],
    specs_eyebrow: 'Характеристики',
    specs_title: 'Технические характеристики',
    specs_label: 'Smartbook',
    spec_categories: [
      { name: 'Дисплей', rows: [
        { col1: 'Размер экрана',      col2: '15.6"',       col3: '15.6"' },
        { col1: 'Разрешение',         col2: '1920×1080',   col3: '1920×1080' },
        { col1: 'Тип матрицы',        col2: 'IPS',         col3: 'IPS' },
        { col1: 'Частота обновления', col2: '60 Гц',       col3: '60 Гц' },
        { col1: 'Яркость',            col2: '220 кд/м²',   col3: '220 кд/м²' },
      ]},
      { name: 'Производительность', rows: [
        { col1: 'Процессор',  col2: 'Intel Celeron N5095', col3: 'Intel Celeron N4000' },
        { col1: 'ОЗУ',        col2: '8 ГБ DDR4',           col3: '8 ГБ DDR4' },
        { col1: 'Накопитель', col2: '256 ГБ SSD / NVMe',   col3: '256 ГБ SSD / NVMe' },
        { col1: 'Графика',    col2: 'Intel UHD',            col3: 'Intel UHD 600' },
        { col1: 'ОС',         col2: 'Windows 10 Pro',       col3: 'Windows 10 Pro' },
      ]},
      { name: 'Батарея и корпус', rows: [
        { col1: 'Время работы',        col2: 'Долгое',  col3: 'Долгое' },
        { col1: 'Вес',                 col2: 'Лёгкий',  col3: 'Лёгкий' },
        { col1: 'Сканер отпечатков',   col2: 'Да',      col3: '—' },
      ]},
      { name: 'Подключение', rows: [
        { col1: 'Wi-Fi',      col2: 'Wi-Fi 5',       col3: 'Wi-Fi 5' },
        { col1: 'Bluetooth',  col2: 'BT 5.0',        col3: 'BT 5.0' },
        { col1: 'USB',        col2: '2× USB-A',      col3: '2× USB-A' },
        { col1: 'HDMI',       col2: '1× HDMI 1.4',  col3: '1× HDMI 1.4' },
        { col1: 'Веб-камера', col2: 'Full HD 1080p', col3: 'Full HD 1080p' },
      ]},
    ],
  },
  {
    slug: 'monitors',
    hero_eyebrow: 'Серия Vision',
    hero_title: 'Видь Всё\nПо-Другому.',
    hero_subtitle: 'Создан для чёткости. Для тех, кто требует лучшего от каждого пикселя.',
    hero_cta_primary: 'Купить сейчас',
    hero_cta_secondary: 'Смотреть характеристики',
    lineup_eyebrow: 'Линейка моделей',
    lineup_title: 'Выбери Свой Vision',
    models: [
      { name: 'Bikon Vision', tag: 'Базовая производительность',
        description: 'IPS-панель с точной цветопередачей и тонким корпусом — идеальный дисплей для современного рабочего места.',
        specs: ['22" / 24" IPS', '75 Гц', 'HDMI + VGA', '5 мс'] },
      { name: 'Bikon Vision Pro', tag: 'Профессиональный уровень', badge: 'PRO',
        description: 'Тонкие рамки, фирменная V-образная металлическая подставка и быстрое время отклика для профессионалов.',
        specs: ['27" IPS', '75 Гц', 'HDMI + VGA + AUX', '5 мс'] },
    ],
    specs_eyebrow: 'Характеристики',
    specs_title: 'Технические характеристики',
    specs_label: 'Vision',
    spec_categories: [
      { name: 'Дисплей', rows: [
        { col1: 'Размер экрана',      col2: '22" / 24"', col3: '27"' },
        { col1: 'Разрешение',         col2: '1920×1080', col3: '1920×1080' },
        { col1: 'Тип матрицы',        col2: 'IPS',       col3: 'IPS' },
        { col1: 'Частота обновления', col2: '75 Гц',     col3: '75 Гц' },
        { col1: 'Время отклика',      col2: '5 мс',      col3: '5 мс' },
        { col1: 'Яркость',            col2: '250 кд/м²', col3: '300 кд/м²' },
      ]},
      { name: 'Подключение', rows: [
        { col1: 'HDMI',  col2: '1× HDMI',    col3: '1× HDMI' },
        { col1: 'VGA',   col2: '1× VGA',     col3: '1× VGA' },
        { col1: 'Аудио', col2: '3.5 мм AUX', col3: '3.5 мм AUX' },
      ]},
    ],
  },
  {
    slug: 'aios',
    hero_eyebrow: 'Серия Matrix',
    hero_title: 'Всё в одном.\nВсё Необходимое.',
    hero_subtitle: 'Мощные процессоры Intel, яркие IPS-дисплеи и изящный дизайн «всё в одном» — создан для современного рабочего места.',
    hero_cta_primary: 'Смотреть модели',
    hero_cta_secondary: 'Характеристики',
    lineup_eyebrow: 'Наша линейка',
    lineup_title: 'Найди Свой\nИдеальный AiO',
    models: [
      { name: 'Bikon Matrix', tag: 'Умный выбор для офиса',
        description: 'Intel Core i3, 8 ГБ DDR4, 256 ГБ SSD, 21.5" FHD IPS — моноблок для повседневной офисной работы.',
        specs: ['21.5" FHD IPS', 'Core i3', '8 ГБ DDR4', '256 ГБ SSD'] },
      { name: 'Bikon Optima', tag: 'Проверенная надёжность',
        description: 'Intel 2–3 поколения, DDR3, чипсет H61 — стабильная производительность по доступной цене.',
        specs: ['23.8" FHD IPS', 'Core i5/i7', '16 ГБ DDR3', '512 ГБ SSD'] },
      { name: 'Bikon NOVA', tag: 'Флагман нового поколения',
        description: '20 мм алюминий, Wi-Fi 6, Intel 12–14 поколения — самый совершенный моноблок от Bikon.',
        specs: ['24" / 27" IPS', 'Core i3/i5/i7', 'DDR4 до 16 ГБ', '20 мм тонкий'] },
    ],
  },
  {
    slug: 'nova',
    hero_eyebrow: 'Bikon NOVA',
    hero_title: 'Создан для\nСовременного Рабочего Места.',
    hero_subtitle: 'NOVA переосмысляет возможности моноблока — изящный, мощный настольный ПК для профессионалов.',
    hero_cta_primary: 'Изучить NOVA',
    hero_cta_secondary: 'Характеристики',
    lineup_eyebrow: 'Линейка моделей',
    lineup_title: 'Знакомься с\nBikon NOVA.',
    models: [
      { name: 'Bikon NOVA', tag: 'Моноблочный ПК',
        description: 'Дисплей 24" или 27" IPS, Intel Core i3/i5/i7 (12–14 поколение), DDR4 до 16 ГБ, корпус CNC-алюминий 20 мм.',
        specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 до 16 ГБ', '20 мм тонкий'] },
    ],
    specs_eyebrow: 'Характеристики',
    specs_title: 'Технические характеристики',
    specs_label: 'NOVA',
    spec_categories: [
      { name: 'Дисплей', rows: [
        { col1: 'Размер экрана',      col2: '24" или 27"', col3: '' },
        { col1: 'Тип матрицы',        col2: 'IPS FHD',     col3: '' },
        { col1: 'Частота обновления', col2: '75 Гц',       col3: '' },
      ]},
      { name: 'Производительность', rows: [
        { col1: 'Процессор',  col2: 'Intel Core i3/i5/i7 (12–14 поколение)', col3: '' },
        { col1: 'ОЗУ',        col2: 'DDR4, до 16 ГБ',                         col3: '' },
        { col1: 'Накопитель', col2: 'NVMe SSD',                                col3: '' },
        { col1: 'ОС',         col2: 'Windows 11',                              col3: '' },
      ]},
      { name: 'Дизайн', rows: [
        { col1: 'Корпус',     col2: 'CNC-алюминий',   col3: '' },
        { col1: 'Толщина',    col2: '20 мм',           col3: '' },
        { col1: 'Wi-Fi',      col2: 'Wi-Fi 6',         col3: '' },
        { col1: 'Веб-камера', col2: 'Full HD 1080p',   col3: '' },
      ]},
    ],
  },
  {
    slug: 'matrix',
    hero_eyebrow: 'Bikon Matrix',
    hero_title: 'Мощный. Точный.\nВсё в Одном.',
    hero_subtitle: 'Matrix объединяет мощь Intel 12–14 поколения, DDR4-память и дисплей IPS 24" или 27" в одном устройстве.',
    hero_cta_primary: 'Изучить Matrix',
    hero_cta_secondary: 'Характеристики',
    lineup_eyebrow: 'Линейка моделей',
    lineup_title: 'Знакомься с\nBikon Matrix.',
    models: [
      { name: 'Bikon Matrix', tag: 'Моноблочный ПК',
        description: 'Дисплей 24" или 27" IPS, Intel Core i3/i5/i7 (12–14 поколение), DDR4, тонкий корпус для современного офиса.',
        specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4', 'Тонкий дизайн'] },
    ],
    specs_eyebrow: 'Характеристики',
    specs_title: 'Технические характеристики',
    specs_label: 'Matrix',
    spec_categories: [
      { name: 'Дисплей', rows: [
        { col1: 'Размер экрана',      col2: '24" или 27"', col3: '' },
        { col1: 'Тип матрицы',        col2: 'IPS FHD',     col3: '' },
        { col1: 'Частота обновления', col2: '75 Гц',       col3: '' },
      ]},
      { name: 'Производительность', rows: [
        { col1: 'Процессор',  col2: 'Intel Core i3/i5/i7 (12–14 поколение)', col3: '' },
        { col1: 'ОЗУ',        col2: '8–16 ГБ DDR4',                          col3: '' },
        { col1: 'Накопитель', col2: '256 ГБ – 1 ТБ NVMe',                    col3: '' },
        { col1: 'ОС',         col2: 'Windows 11',                             col3: '' },
      ]},
    ],
  },
  {
    slug: 'optima',
    hero_eyebrow: 'Bikon Optima',
    hero_title: 'Проверенная производительность.\nДоступная цена.',
    hero_subtitle: 'Optima предлагает надёжную производительность Intel Core, DDR3-память и дисплей IPS 24" или 27" по доступной цене.',
    hero_cta_primary: 'Изучить Optima',
    hero_cta_secondary: 'Характеристики',
    lineup_eyebrow: 'Линейка моделей',
    lineup_title: 'Знакомься с\nBikon Optima.',
    models: [
      { name: 'Bikon Optima', tag: 'Моноблочный ПК',
        description: 'Дисплей 24" или 27" IPS, Intel Core i5/i7 (2–3 поколение), DDR3 — надёжная производительность по доступной цене.',
        specs: ['24" / 27" IPS', 'Core i5 / i7', 'DDR3', 'Чипсет H61'] },
    ],
    specs_eyebrow: 'Характеристики',
    specs_title: 'Технические характеристики',
    specs_label: 'Optima',
    spec_categories: [
      { name: 'Дисплей', rows: [
        { col1: 'Размер экрана',      col2: '24" или 27"', col3: '' },
        { col1: 'Тип матрицы',        col2: 'IPS FHD',     col3: '' },
        { col1: 'Частота обновления', col2: '75 Гц',       col3: '' },
      ]},
      { name: 'Производительность', rows: [
        { col1: 'Процессор',  col2: 'Intel Core i5/i7 (2–3 поколение)', col3: '' },
        { col1: 'ОЗУ',        col2: '4–16 ГБ DDR3',                     col3: '' },
        { col1: 'Накопитель', col2: '128–512 ГБ SSD',                    col3: '' },
        { col1: 'ОС',         col2: 'Windows 10 / 11',                   col3: '' },
      ]},
    ],
  },
  {
    slug: 'cases',
    hero_eyebrow: 'Bikon Cases',
    hero_title: 'Создан для\nПобедителей.',
    hero_subtitle: 'Закалённое стекло, точная система охлаждения и полная поддержка RGB — инженерия для тех, кто хочет, чтобы сборка выглядела так же мощно, как работает.',
    hero_cta_primary: 'Смотреть корпуса',
    hero_cta_secondary: 'Характеристики',
    lineup_eyebrow: 'Линейка моделей',
    lineup_title: 'Выбери Свою\nБоевую Станцию.',
    models: [
      { name: 'Bikon Phantom', tag: 'RGB Mid-Tower',
        description: 'Агрессивный дизайн из закалённого стекла с полной поддержкой RGB и оптимизированным охлаждением — для геймеров.',
        specs: ['ATX Mid-Tower', 'Закалённое стекло', 'Поддержка RGB', 'Жидкостное охлаждение 360 мм'] },
      { name: 'Bikon Prisma', tag: 'Стеклянная витрина',
        description: 'Закалённое стекло с трёх сторон — покажи свою сборку в лучшем виде, не жертвуя охлаждением.',
        specs: ['ATX Mid-Tower', 'Стекло с 3 сторон', 'Высокий воздушный поток', 'Жидкостное охлаждение 280 мм'] },
      { name: 'Bikon Compact', tag: 'Micro-ATX',
        description: 'Компактный корпус, большая производительность. Compact вписывается в любое пространство без ущерба для охлаждения.',
        specs: ['Micro-ATX Tower', 'Сталь + стекло', 'Поддержка двух вентиляторов', 'Жидкостное охлаждение 240 мм'] },
    ],
    specs_eyebrow: 'Характеристики',
    specs_title: 'Технические характеристики',
    specs_label: 'Bikon Cases',
    spec_categories: [
      { name: 'Конструкция', rows: [
        { col1: 'Форм-фактор',     col2: 'ATX / Micro-ATX / Mini-ITX',       col3: '—' },
        { col1: 'Материал',        col2: 'Сталь SPCC + закалённое стекло',    col3: '—' },
        { col1: 'Боковая панель',  col2: '4 мм закалённое стекло',            col3: '—' },
        { col1: 'Габариты',        col2: '450 × 210 × 480 мм',               col3: '—' },
      ]},
      { name: 'Охлаждение', rows: [
        { col1: 'Передние вентиляторы', col2: '3× 120 мм / 2× 140 мм (вкл.)', col3: '—' },
        { col1: 'Задний вентилятор',    col2: '1× 120 мм (вкл.)',              col3: '—' },
        { col1: 'Верхние вентиляторы',  col2: '2× 120 мм / 2× 140 мм',        col3: '—' },
        { col1: 'Жидкостное охлаждение', col2: 'Радиатор до 360 мм',           col3: '—' },
        { col1: 'Макс. высота кулера',  col2: '165 мм',                        col3: '—' },
      ]},
      { name: 'Передние разъёмы', rows: [
        { col1: 'USB',             col2: '2× USB 2.0',            col3: '—' },
        { col1: 'Видео',           col2: 'HDMI + VGA',             col3: '—' },
        { col1: 'Аудио',           col2: '3.5 мм вход + выход',   col3: '—' },
        { col1: 'Кнопка питания',  col2: 'С подсветкой',          col3: '—' },
      ]},
      { name: 'Совместимость', rows: [
        { col1: 'Материнская плата',    col2: 'ATX / Micro-ATX / Mini-ITX',    col3: '—' },
        { col1: 'Длина GPU',            col2: 'До 380 мм',                     col3: '—' },
        { col1: 'Отсеки накопителей',   col2: '2× 3.5" HDD / 3× 2.5" SSD',   col3: '—' },
        { col1: 'Блок питания',         col2: 'ATX (нижнее крепление)',        col3: '—' },
      ]},
    ],
  },
];

/* ── Uzbek translations ───────────────────────────────────────────────── */
const SEED_PAGES_UZ = [
  {
    slug: 'laptops',
    hero_eyebrow: 'Smartbook va Workbook seriyasi',
    hero_title: 'Siz bilan\nBirga Kuchli.',
    hero_subtitle: 'Talabalar, mutaxassislar va ijodkorlar uchun yaratilgan. Dizayn jihatdan engil, mohiyatan kuchli.',
    hero_cta_primary: "Modellarni ko'rish",
    hero_cta_secondary: 'Xususiyatlar',
    lineup_eyebrow: 'Model qatori',
    lineup_title: "O'zingizga Mos\nNoutbukni Tanlang",
    models: [
      { name: 'Bikon Smartbook', tag: 'Yuqori samaradorlik', badge: 'PRO',
        description: "Intel Celeron N5095, 8 GB DDR4, 256 GB SSD, barmoq izi skaneri — talabalar va mutaxassislar uchun aqlli unumdorlik.",
        specs: ['Intel Celeron N5095', '8 GB DDR4', '256 GB SSD', 'Barmoq izi'] },
      { name: 'Bikon Workbook', tag: "Har kungi ishonchli yordamchi",
        description: "Intel Celeron N4000, 8 GB DDR4, 256 GB SSD — kundalik vazifalar uchun ishonchli va barqaror.",
        specs: ['Intel Celeron N4000', '8 GB DDR4', '256 GB SSD'] },
    ],
    specs_eyebrow: 'Xususiyatlar',
    specs_title: 'Texnik xususiyatlar',
    specs_label: 'Smartbook',
    spec_categories: [
      { name: 'Ekran', rows: [
        { col1: "Ekran o'lchami",      col2: '15.6"',      col3: '15.6"' },
        { col1: 'Ruxsat',              col2: '1920×1080',  col3: '1920×1080' },
        { col1: 'Panel turi',          col2: 'IPS',        col3: 'IPS' },
        { col1: 'Yangilanish tezligi', col2: '60 Gts',     col3: '60 Gts' },
        { col1: 'Yorqinlik',           col2: '220 nit',    col3: '220 nit' },
      ]},
      { name: 'Unumdorlik', rows: [
        { col1: 'Protsessor', col2: 'Intel Celeron N5095', col3: 'Intel Celeron N4000' },
        { col1: 'RAM',        col2: '8 GB DDR4',            col3: '8 GB DDR4' },
        { col1: 'Xotira',     col2: '256 GB SSD / NVMe',    col3: '256 GB SSD / NVMe' },
        { col1: 'Grafika',    col2: 'Intel UHD',             col3: 'Intel UHD 600' },
        { col1: 'OT',         col2: 'Windows 10 Pro',        col3: 'Windows 10 Pro' },
      ]},
      { name: 'Batareya va korpus', rows: [
        { col1: 'Ishlash vaqti',       col2: 'Uzoq',   col3: 'Uzoq' },
        { col1: "Og'irligi",           col2: 'Yengil', col3: 'Yengil' },
        { col1: 'Barmoq izi skaneri',  col2: 'Ha',     col3: '—' },
      ]},
      { name: 'Ulanish', rows: [
        { col1: 'Wi-Fi',      col2: 'Wi-Fi 5',       col3: 'Wi-Fi 5' },
        { col1: 'Bluetooth',  col2: 'BT 5.0',        col3: 'BT 5.0' },
        { col1: 'USB',        col2: '2× USB-A',      col3: '2× USB-A' },
        { col1: 'HDMI',       col2: '1× HDMI 1.4',  col3: '1× HDMI 1.4' },
        { col1: 'Veb-kamera', col2: 'Full HD 1080p', col3: 'Full HD 1080p' },
      ]},
    ],
  },
  {
    slug: 'monitors',
    hero_eyebrow: 'Vision seriyasi',
    hero_title: 'Hammasini\nBoshqacha Ko\'ring.',
    hero_subtitle: "Aniqlik uchun yaratilgan. Har bir pikseldan maksimum talab qiladiganlar uchun.",
    hero_cta_primary: 'Hozir sotib oling',
    hero_cta_secondary: "Xususiyatlarni ko'rish",
    lineup_eyebrow: 'Model qatori',
    lineup_title: "O'zingizga Mos Vision Tanlang",
    models: [
      { name: 'Bikon Vision', tag: 'Asosiy unumdorlik',
        description: "Aniq ranglarga ega IPS panel va nozik profil — zamonaviy ish joyi uchun ideal displey.",
        specs: ['22" / 24" IPS', '75 Gts', 'HDMI + VGA', '5 ms'] },
      { name: 'Bikon Vision Pro', tag: 'Professional daraja', badge: 'PRO',
        description: "Ingichka ramkalar, o'ziga xos V-shaklidagi metall taglik va mutaxassislar uchun tez javob vaqti.",
        specs: ['27" IPS', '75 Gts', 'HDMI + VGA + AUX', '5 ms'] },
    ],
    specs_eyebrow: 'Xususiyatlar',
    specs_title: 'Texnik xususiyatlar',
    specs_label: 'Vision',
    spec_categories: [
      { name: 'Ekran', rows: [
        { col1: "Ekran o'lchami",      col2: '22" / 24"', col3: '27"' },
        { col1: 'Ruxsat',              col2: '1920×1080', col3: '1920×1080' },
        { col1: 'Panel turi',          col2: 'IPS',       col3: 'IPS' },
        { col1: 'Yangilanish tezligi', col2: '75 Gts',    col3: '75 Gts' },
        { col1: 'Javob vaqti',         col2: '5 ms',      col3: '5 ms' },
        { col1: 'Yorqinlik',           col2: '250 nit',   col3: '300 nit' },
      ]},
      { name: 'Ulanish', rows: [
        { col1: 'HDMI',  col2: '1× HDMI',    col3: '1× HDMI' },
        { col1: 'VGA',   col2: '1× VGA',     col3: '1× VGA' },
        { col1: 'Audio', col2: '3.5 mm AUX', col3: '3.5 mm AUX' },
      ]},
    ],
  },
  {
    slug: 'aios',
    hero_eyebrow: 'Matrix seriyasi',
    hero_title: "Hammasi bitta.\nKerakli hamma narsa.",
    hero_subtitle: "Qudratli Intel protsessorlari, yorqin IPS displeylari va zarafil dizayndagi «hammasi bitta» — zamonaviy ish joyi uchun yaratilgan.",
    hero_cta_primary: "Modellarni ko'rish",
    hero_cta_secondary: 'Xususiyatlar',
    lineup_eyebrow: 'Bizning qatorimiz',
    lineup_title: "O'zingizga Mos\nAiO Toping",
    models: [
      { name: 'Bikon Matrix', tag: "Ofis uchun aqlli tanlov",
        description: "Intel Core i3, 8 GB DDR4, 256 GB SSD, 21.5\" FHD IPS — kundalik ofis ishi uchun monoblok.",
        specs: ['21.5" FHD IPS', 'Core i3', '8 GB DDR4', '256 GB SSD'] },
      { name: 'Bikon Optima', tag: "Tasdiqlangan ishonchlilik",
        description: "Intel 2-3 avlod, DDR3, H61 chipset — hamyonbop narxda mustahkam unumdorlik.",
        specs: ['23.8" FHD IPS', 'Core i5/i7', '16 GB DDR3', '512 GB SSD'] },
      { name: 'Bikon NOVA', tag: "Ilg'or flagman",
        description: "20 mm nozik alyuminiy, Wi-Fi 6, Intel 12-14 avlod — Bikonning eng mukammal monoblo'ki.",
        specs: ['24" / 27" IPS', 'Core i3/i5/i7', 'DDR4 16 GBgacha', '20 mm nozik'] },
    ],
  },
  {
    slug: 'nova',
    hero_eyebrow: 'Bikon NOVA',
    hero_title: 'Zamonaviy Ish Joyi\nUchun Yaratilgan.',
    hero_subtitle: "NOVA monoblo'kni qayta talqin etadi — eng yaxshini talab qiladigan mutaxassislar uchun mukammal, qudratli ish stoli kompyuteri.",
    hero_cta_primary: "NOVAni ko'rish",
    hero_cta_secondary: 'Xususiyatlar',
    lineup_eyebrow: 'Model qatori',
    lineup_title: 'Bikon NOVA\nbilan tanishing.',
    models: [
      { name: 'Bikon NOVA', tag: 'Hammasi bitta kompyuter',
        description: "24\" yoki 27\" IPS displey, Intel Core i3/i5/i7 (12-14 avlod), DDR4 xotira 16 GBgacha va 20 mm CNC-alyuminiy korpus.",
        specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 16 GBgacha', '20 mm nozik'] },
    ],
    specs_eyebrow: 'Xususiyatlar',
    specs_title: 'Texnik xususiyatlar',
    specs_label: 'NOVA',
    spec_categories: [
      { name: 'Ekran', rows: [
        { col1: "Ekran o'lchami",      col2: '24" yoki 27"', col3: '' },
        { col1: 'Panel turi',          col2: 'IPS FHD',      col3: '' },
        { col1: 'Yangilanish tezligi', col2: '75 Gts',       col3: '' },
      ]},
      { name: 'Unumdorlik', rows: [
        { col1: 'Protsessor', col2: 'Intel Core i3/i5/i7 (12-14 avlod)', col3: '' },
        { col1: 'RAM',        col2: 'DDR4, 16 GBgacha',                    col3: '' },
        { col1: 'Xotira',     col2: 'NVMe SSD',                             col3: '' },
        { col1: 'OT',         col2: 'Windows 11',                           col3: '' },
      ]},
      { name: 'Dizayn', rows: [
        { col1: 'Korpus',     col2: 'CNC alyuminiy',  col3: '' },
        { col1: 'Qalinligi',  col2: '20 mm',           col3: '' },
        { col1: 'Wi-Fi',      col2: 'Wi-Fi 6',         col3: '' },
        { col1: 'Veb-kamera', col2: 'Full HD 1080p',   col3: '' },
      ]},
    ],
  },
  {
    slug: 'matrix',
    hero_eyebrow: 'Bikon Matrix',
    hero_title: 'Qudratli. Aniq.\nHammasi Bitta.',
    hero_subtitle: "Matrix Intel 12-14 avlod quvvati, DDR4 xotira va 24\" yoki 27\" IPS displeyni bitta qurilmada birlashtiradi.",
    hero_cta_primary: "Matrixni ko'rish",
    hero_cta_secondary: 'Xususiyatlar',
    lineup_eyebrow: 'Model qatori',
    lineup_title: 'Bikon Matrix\nbilan tanishing.',
    models: [
      { name: 'Bikon Matrix', tag: 'Hammasi bitta kompyuter',
        description: "24\" yoki 27\" IPS displey, Intel Core i3/i5/i7 (12-14 avlod), DDR4 xotira va zamonaviy ofis uchun nozik korpus.",
        specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4', 'Nozik dizayn'] },
    ],
    specs_eyebrow: 'Xususiyatlar',
    specs_title: 'Texnik xususiyatlar',
    specs_label: 'Matrix',
    spec_categories: [
      { name: 'Ekran', rows: [
        { col1: "Ekran o'lchami",      col2: '24" yoki 27"', col3: '' },
        { col1: 'Panel turi',          col2: 'IPS FHD',      col3: '' },
        { col1: 'Yangilanish tezligi', col2: '75 Gts',       col3: '' },
      ]},
      { name: 'Unumdorlik', rows: [
        { col1: 'Protsessor', col2: 'Intel Core i3/i5/i7 (12-14 avlod)', col3: '' },
        { col1: 'RAM',        col2: '8–16 GB DDR4',                       col3: '' },
        { col1: 'Xotira',     col2: '256 GB – 1 TB NVMe',                 col3: '' },
        { col1: 'OT',         col2: 'Windows 11',                          col3: '' },
      ]},
    ],
  },
  {
    slug: 'optima',
    hero_eyebrow: 'Bikon Optima',
    hero_title: "Tasdiqlangan unumdorlik.\nHamyonbop narx.",
    hero_subtitle: "Optima Intel Core unumdorligi, DDR3 xotira va 24\" yoki 27\" IPS displeyni — hamyonbop narxda ishonchli hisoblashni taqdim etadi.",
    hero_cta_primary: "Optimani ko'rish",
    hero_cta_secondary: 'Xususiyatlar',
    lineup_eyebrow: 'Model qatori',
    lineup_title: 'Bikon Optima\nbilan tanishing.',
    models: [
      { name: 'Bikon Optima', tag: 'Hammasi bitta kompyuter',
        description: "24\" yoki 27\" IPS displey, Intel Core i5/i7 (2-3 avlod), DDR3 — hamyonbop narxda ishonchli unumdorlik.",
        specs: ['24" / 27" IPS', 'Core i5 / i7', 'DDR3', 'H61 chipset'] },
    ],
    specs_eyebrow: 'Xususiyatlar',
    specs_title: 'Texnik xususiyatlar',
    specs_label: 'Optima',
    spec_categories: [
      { name: 'Ekran', rows: [
        { col1: "Ekran o'lchami",      col2: '24" yoki 27"', col3: '' },
        { col1: 'Panel turi',          col2: 'IPS FHD',      col3: '' },
        { col1: 'Yangilanish tezligi', col2: '75 Gts',       col3: '' },
      ]},
      { name: 'Unumdorlik', rows: [
        { col1: 'Protsessor', col2: 'Intel Core i5/i7 (2-3 avlod)', col3: '' },
        { col1: 'RAM',        col2: '4–16 GB DDR3',                  col3: '' },
        { col1: 'Xotira',     col2: '128–512 GB SSD',                col3: '' },
        { col1: 'OT',         col2: 'Windows 10 / 11',               col3: '' },
      ]},
    ],
  },
  {
    slug: 'cases',
    hero_eyebrow: 'Bikon Cases',
    hero_title: "G'oliblar uchun\nYaratilgan.",
    hero_subtitle: "Toblangan shisha, aniq havo aylanishi va to'liq RGB qo'llab-quvvatlash — yig'ilmangiz uning ishlashidek kuchli ko'rinishi uchun yaratilgan.",
    hero_cta_primary: "Korpuslarni ko'rish",
    hero_cta_secondary: 'Xususiyatlar',
    lineup_eyebrow: 'Model qatori',
    lineup_title: "O'z Jangovar\nStantsiyangizni Tanlang.",
    models: [
      { name: 'Bikon Phantom', tag: 'RGB Mid-Tower',
        description: "To'liq RGB qo'llab-quvvatlash va optimallashtirilgan havo aylanishi bilan agressiv toblangan shisha dizayn — o'yinchilar uchun.",
        specs: ['ATX Mid-Tower', 'Toblangan shisha panel', "RGB qo'llab-quvvatlash", '360 mm suyuq sovutish'] },
      { name: 'Bikon Prisma', tag: 'Shisha vitrina',
        description: "Uch tomondan to'liq panoramik toblangan shisha — termal ko'rsatkichlarni saqlab qolgan holda yig'ilmangizni namoyish eting.",
        specs: ['ATX Mid-Tower', '3 tomonlama toblangan shisha', 'Yuqori havo oqimi', '280 mm suyuq sovutish'] },
      { name: 'Bikon Compact', tag: 'Micro-ATX',
        description: "Kichik yer izi, katta unumdorlik. Compact sovutish yoki kengaytirishdan voz kechmasdan har qanday joyga mos keladi.",
        specs: ["Micro-ATX Tower", "Po'lat + shisha", 'Ikki ventilator', '240 mm suyuq sovutish'] },
    ],
    specs_eyebrow: 'Xususiyatlar',
    specs_title: 'Texnik xususiyatlar',
    specs_label: 'Bikon Cases',
    spec_categories: [
      { name: 'Konstruktsiya', rows: [
        { col1: 'Form-faktor',   col2: 'ATX / Micro-ATX / Mini-ITX',      col3: '—' },
        { col1: 'Material',      col2: "SPCC po'lat + toblangan shisha",   col3: '—' },
        { col1: 'Yon panel',     col2: '4 mm toblangan shisha',            col3: '—' },
        { col1: "O'lchamlari",   col2: '450 × 210 × 480 mm',              col3: '—' },
      ]},
      { name: 'Sovutish', rows: [
        { col1: 'Oldingi ventilatorlar', col2: '3× 120 mm / 2× 140 mm (kiritilgan)', col3: '—' },
        { col1: 'Orqa ventilator',       col2: '1× 120 mm (kiritilgan)',               col3: '—' },
        { col1: 'Yuqori ventilatorlar',  col2: '2× 120 mm / 2× 140 mm',               col3: '—' },
        { col1: 'Suyuq sovutish',        col2: '360 mm radiatorga qadar',               col3: '—' },
        { col1: 'Maks. kuler balandligi', col2: '165 mm',                               col3: '—' },
      ]},
      { name: 'Oldingi I/O', rows: [
        { col1: 'USB',            col2: '2× USB 2.0',              col3: '—' },
        { col1: 'Video',          col2: 'HDMI + VGA',               col3: '—' },
        { col1: 'Audio',          col2: '3.5 mm kirish + chiqish',  col3: '—' },
        { col1: 'Quvvat tugmasi', col2: 'Yoritilgan',               col3: '—' },
      ]},
      { name: 'Moslik', rows: [
        { col1: 'Ona plata',       col2: 'ATX / Micro-ATX / Mini-ITX',    col3: '—' },
        { col1: 'GPU uzunligi',    col2: '380 mmgacha',                    col3: '—' },
        { col1: 'Xotira uyalari',  col2: '2× 3.5" HDD / 3× 2.5" SSD',   col3: '—' },
        { col1: 'Quvvat bloki',    col2: "ATX (pastdan o'rnatish)",       col3: '—' },
      ]},
    ],
  },
];

/* ── About page seed ──────────────────────────────────────────────────── */
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

const ABOUT_SEED_RU = {
  hero_eyebrow: 'О нас · С 2015 года',
  hero_subtitle: 'Современный и надёжный технологический бренд в Узбекистане, основанный в 2015 году в Ташкенте.',
  story_eyebrow: 'Наша история',
  story_title: 'Строим технологическое будущее Узбекистана',
  story_body: 'Основанная в 2015 году и базирующаяся в Ташкенте, BIKON предоставляет высококачественное и доступное компьютерное оборудование для частных лиц, предприятий и государственных организаций. Наши продукты созданы для удовлетворения реальных местных потребностей при соответствии мировым стандартам.',
  stats: [
    { number: '10+',             label: 'Лет опыта'                      },
    { number: 'B2B · B2G · B2C', label: 'Обслуживаемые сегменты рынка'  },
    { number: '1–3 года',        label: 'Гарантийное покрытие'           },
  ],
  values: ['Надёжность', 'Сотрудничество', 'Прозрачность', 'Развитие', 'Ответственность'],
  milestones: [
    { year: '2016', title: 'Сервисный бизнес',      desc: 'Начало работы как сервисного бизнеса под брендом COMPASS' },
    { year: '2019', title: 'Расширение ритейла',    desc: 'Открытие компьютерного магазина и сервисного центра' },
    { year: '2021', title: 'Бренд SOZLA',           desc: 'Продолжение деятельности под брендом SOZLA' },
    { year: '2024', title: 'Оптовые поставки',      desc: 'Начало оптовых поставок импортной продукции (бренд BIKON)' },
    { year: '2025', title: 'Местное производство',  desc: 'Запуск местного производства (бренд BIKON)' },
  ],
  final_quote: 'BIKON — это не просто производитель компьютерного оборудования. Это технологический бренд, вносящий вклад в цифровое развитие Узбекистана, создающий новые рабочие места и формирующий инновационную экосистему.',
};

const ABOUT_SEED_UZ = {
  hero_eyebrow: "Biz haqimizda · 2015 yildan buyon",
  hero_subtitle: "2015 yilda Toshkentda tashkil etilgan O'zbekistondagi zamonaviy va ishonchli texnologiya brendi.",
  story_eyebrow: 'Bizning tarix',
  story_title: "O'zbekistonning texnologik kelajagini quryapmiz",
  story_body: "2015 yilda asoslangan va Toshkentda joylashgan BIKON jismoniy shaxslar, korxonalar va davlat muassasalari uchun yuqori sifatli va hamyonbop kompyuter jihozlarini taqdim etadi. Bizning mahsulotlarimiz global standartlarga javob berib, mahalliy ehtiyojlarni qondirish uchun yaratilgan.",
  stats: [
    { number: '10+',              label: 'Yillik tajriba'                          },
    { number: 'B2B · B2G · B2C', label: "Xizmat ko'rsatiladigan bozor segmentlari" },
    { number: '1–3 yil',         label: 'Kafolat muddati'                         },
  ],
  values: ['Ishonchlilik', 'Hamkorlik', 'Shaffoflik', 'Rivojlanish', "Mas'uliyat"],
  milestones: [
    { year: '2016', title: 'Servis biznesi',           desc: 'COMPASS brendi ostida servis biznesi sifatida boshlandi' },
    { year: '2019', title: 'Chakana savdo kengayishi', desc: "Kompyuter do'koni va servis markazi ochildi" },
    { year: '2021', title: 'SOZLA brendi',             desc: 'SOZLA brendi ostida faoliyat davom ettirildi' },
    { year: '2024', title: 'Ulgurji tarqatish',        desc: "Import mahsulotlarini ulgurji tarqatish boshlandi (BIKON brendi)" },
    { year: '2025', title: 'Mahalliy ishlab chiqarish', desc: "Mahalliy ishlab chiqarish yo'lga qo'yildi (BIKON brendi)" },
  ],
  final_quote: "BIKON — bu shunchaki kompyuter jihozlari ishlab chiqaruvchisi emas. Bu O'zbekistonning raqamli rivojlanishiga hissa qo'shayotgan, yangi ish o'rinlari yaratayotgan va innovatsion ekotizimni shakllantiriyotgan texnologiya brendidir.",
};

/* ── Seed functions ───────────────────────────────────────────────────── */
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

async function seedProductPageLocale(
  strapi: Core.Strapi,
  locale: 'ru' | 'uz',
  pages: typeof SEED_PAGES_RU,
) {
  for (const page of pages) {
    const existing = await strapi.documents('api::product-page.product-page').findMany({
      locale,
      filters: { slug: { $eq: page.slug } } as any,
    });
    if (existing.length) continue;

    const enDocs = await strapi.documents('api::product-page.product-page').findMany({
      locale: 'en',
      filters: { slug: { $eq: page.slug } } as any,
    });
    if (!enDocs.length) continue;

    const { slug: _slug, ...data } = page;
    await (strapi.documents('api::product-page.product-page') as any).update({
      documentId: (enDocs[0] as any).documentId,
      locale,
      status: 'published',
      data,
    });
    console.log(`[seed] product-page ${locale} created: ${page.slug}`);
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

async function seedAboutPageLocale(
  strapi: Core.Strapi,
  locale: 'ru' | 'uz',
  seed: typeof ABOUT_SEED_RU,
) {
  const existing = await strapi.documents('api::about-page.about-page').findFirst({ locale });
  if (existing) return;

  const en = await strapi.documents('api::about-page.about-page').findFirst({ locale: 'en' });
  if (!en) return;

  await (strapi.documents('api::about-page.about-page') as any).update({
    documentId: (en as any).documentId,
    locale,
    status: 'published',
    data: seed,
  });
  console.log(`[seed] about-page ${locale} created`);
}

async function ensureLocales(strapi: Core.Strapi) {
  const needed = [
    { code: 'ru', name: 'Russian (ru)' },
    { code: 'uz', name: "O'zbek (uz)" },
  ];
  for (const { code, name } of needed) {
    const exists = await strapi.db.query('plugin::i18n.locale').findOne({ where: { code } });
    if (!exists) {
      await strapi.db.query('plugin::i18n.locale').create({ data: { name, code } });
      console.log(`[seed] locale created: ${code}`);
    }
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales(strapi);
    await seedProductPages(strapi);
    await seedAboutPage(strapi);

    await seedProductPageLocale(strapi, 'ru', SEED_PAGES_RU);
    await seedProductPageLocale(strapi, 'uz', SEED_PAGES_UZ);
    await seedAboutPageLocale(strapi, 'ru', ABOUT_SEED_RU);
    await seedAboutPageLocale(strapi, 'uz', ABOUT_SEED_UZ);
  },
};
