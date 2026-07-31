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

/* ── Site Products seed (home page category cards) ───────────────────── */
const SITE_PRODUCTS = [
  {
    category_id: 'noutbuklar',
    sort_order: 1,
    title: 'Laptops',
    description: 'Designed to be light, fast, and reliable. Built for students and professionals, delivering smooth performance and long-lasting productivity.',
    feature_1: '15.6" Full HD IPS Display',
    feature_2: 'Intel Celeron N4000 / N5095',
    feature_3: '8GB DDR4 / 256GB SSD',
    feature_4: 'Built-in WebCam · Wi-Fi · BT',
  },
  {
    category_id: 'monobloklar',
    sort_order: 2,
    title: 'All-in-Ones',
    description: 'Modern desktops built for performance and simplicity. Powered by Intel processors with vibrant IPS displays, perfect for work and everyday use.',
    feature_1: '24" / 27" Full HD IPS Screen',
    feature_2: 'Intel Core i3/i5/i7 (12–14th Gen)',
    feature_3: '4GB–16GB RAM / 128GB–1TB NVMe',
    feature_4: 'Built-in Stereo Speakers',
  },
  {
    category_id: 'cases',
    sort_order: 3,
    title: 'Cases',
    description: 'Designed for modern PC builds, combining durability, airflow, and sleek aesthetics. Ideal for gaming setups and professional workstations.',
    feature_1: 'Tempered Glass & Metal Build',
    feature_2: 'RGB Support (Phantom series)',
    feature_3: 'Air / Liquid Cooling Support',
    feature_4: 'Optimized Airflow Design',
  },
  {
    category_id: 'monitorlar',
    sort_order: 4,
    title: 'Monitors',
    description: 'Delivering sharp visuals and accurate colors. Designed for professionals and everyday users who value clarity and reliability.',
    feature_1: '22" / 24" / 27" IPS Display',
    feature_2: '75Hz Refresh Rate',
    feature_3: 'HDMI / VGA / AUX',
    feature_4: '5ms Response Time',
  },
];

const SITE_PRODUCTS_RU = [
  {
    category_id: 'noutbuklar',
    title: 'Ноутбуки',
    description: 'Лёгкие, быстрые и надёжные устройства. Созданы для студентов и профессионалов, обеспечивая плавную работу и долгий заряд аккумулятора.',
    feature_1: '15.6" Full HD IPS дисплей',
    feature_2: 'Intel Celeron N4000 / N5095',
    feature_3: '8 ГБ DDR4 / 256 ГБ SSD',
    feature_4: 'Встроенная веб-камера · Wi-Fi · BT',
  },
  {
    category_id: 'monobloklar',
    title: 'Моноблок',
    description: 'Современные компьютеры для продуктивной работы. Процессоры Intel с яркими IPS-дисплеями — идеально для работы и повседневного использования.',
    feature_1: '24" / 27" Full HD IPS экран',
    feature_2: 'Intel Core i3/i5/i7 (12–14 поколение)',
    feature_3: '4–16 ГБ ОЗУ / 128 ГБ–1 ТБ NVMe',
    feature_4: 'Встроенные стереодинамики',
  },
  {
    category_id: 'cases',
    title: 'Корпуса',
    description: 'Созданы для современных ПК-сборок: прочность, эффективное охлаждение и стильный дизайн. Идеальны для игровых и рабочих станций.',
    feature_1: 'Закалённое стекло и металлический корпус',
    feature_2: 'Поддержка RGB (серия Phantom)',
    feature_3: 'Воздушное / жидкостное охлаждение',
    feature_4: 'Оптимизированный воздушный поток',
  },
  {
    category_id: 'monitorlar',
    title: 'Мониторы',
    description: 'Чёткая картинка и точная цветопередача. Для профессионалов и обычных пользователей, ценящих ясность и надёжность.',
    feature_1: '22" / 24" / 27" IPS дисплей',
    feature_2: 'Частота обновления 75 Гц',
    feature_3: 'HDMI / VGA / AUX',
    feature_4: 'Время отклика 5 мс',
  },
];

const SITE_PRODUCTS_UZ = [
  {
    category_id: 'noutbuklar',
    title: 'Noutbuklar',
    description: "Yengil, tez va ishonchli qurilmalar. Talaba va mutaxassislar uchun yaratilgan — silliq ishlash va kun bo'yi quvvat.",
    feature_1: '15.6" Full HD IPS displey',
    feature_2: 'Intel Celeron N4000 / N5095',
    feature_3: '8 GB DDR4 / 256 GB SSD',
    feature_4: "O'rnatilgan veb-kamera · Wi-Fi · BT",
  },
  {
    category_id: 'monobloklar',
    title: 'Monoblok',
    description: "Unumdorlik va qulaylik uchun zamonaviy kompyuterlar. Intel protsessorlari va yorqin IPS displeylar — ish va kundalik foydalanish uchun ideal.",
    feature_1: '24" / 27" Full HD IPS ekran',
    feature_2: 'Intel Core i3/i5/i7 (12-14 avlod)',
    feature_3: '4-16 GB RAM / 128 GB-1 TB NVMe',
    feature_4: "O'rnatilgan stereo dinamiklar",
  },
  {
    category_id: 'cases',
    title: 'Korpuslar',
    description: "Zamonaviy yig'ilmalar uchun yaratilgan — chidamlilik, havo aylanishi va chiroyli dizayn. O'yin va professional ish uchun ideal.",
    feature_1: 'Toblangan shisha va metall korpus',
    feature_2: "RGB qo'llab-quvvatlash (Phantom seriyasi)",
    feature_3: "Havo / suyuq sovutish qo'llab-quvvatlash",
    feature_4: 'Optimallashtirilgan havo aylanishi',
  },
  {
    category_id: 'monitorlar',
    title: 'Monitorlar',
    description: "Aniq tasvir va to'g'ri ranglar. Aniqlik va ishonchlilikni qadrlaydigan professional va oddiy foydalanuvchilar uchun.",
    feature_1: '22" / 24" / 27" IPS displey',
    feature_2: '75 Gts yangilanish tezligi',
    feature_3: 'HDMI / VGA / AUX',
    feature_4: '5 ms javob vaqti',
  },
];

/* ── Product Page "extra" seed (remaining sections not yet modeled as
   dedicated fields — features, color/stand/display/back/apps/connectivity/
   cam, cta, bento, ports, showcase, image, compare, nova-teaser, etc.)
   Stored as one JSON blob per locale so every page section becomes
   editable from the admin without a schema field per section. ────────── */
const PRODUCT_PAGE_EXTRAS: Record<string, { en: Record<string, unknown>; ru: Record<string, unknown>; uz: Record<string, unknown> }> = {
  monitors: {
    en: {
      hero_scroll: 'Scroll to reveal',
      lineup_learn: 'Learn More',
      features_eyebrow: 'Features',
      features_title: 'Every Detail,\nPerfected.',
      features: [
        { label: 'IPS Display', title: 'Crystal-Clear IPS Panel', desc: 'Factory-calibrated IPS panels deliver accurate, vivid colors from any angle — ideal for design, editing, and everyday work.' },
        { label: '75Hz', title: 'Smooth 75Hz Refresh Rate', desc: 'Fluid, tear-free motion whether you\'re scrolling through spreadsheets or watching high-definition video content.' },
        { label: '2.3mm Bezels', title: 'Ultra-Thin Bezels', desc: 'At just 2.3mm, the bezel steps aside so the image takes over — creating an immersive, near-edgeless viewing experience.' },
        { label: 'Ergonomics', title: 'Ergonomic Tilt & Stand', desc: 'Full -5° to +20° tilt range and the Vision Pro\'s signature V-shaped metallic stand let you dial in the perfect angle.' },
      ],
      specs_pro_label: 'Bikon Vision Pro',
      color_eyebrow: 'Display',
      color_title: 'Infinite Color',
      color_body: 'Factory-calibrated IPS panels reproduce 99% of the sRGB color space with stunning accuracy — so every image looks exactly as it should.',
      color_stats: [
        { value: '99%', label: 'sRGB' },
        { value: '250', label: 'cd/m²' },
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
    ru: {
      hero_scroll: 'Прокрутите вниз',
      lineup_learn: 'Подробнее',
      features_eyebrow: 'Возможности',
      features_title: 'Каждая деталь\nпродумана.',
      features: [
        { label: 'IPS-матрица', title: 'Кристально чистая IPS-панель', desc: 'Заводски откалиброванные IPS-матрицы обеспечивают точную яркую цветопередачу под любым углом — идеально для дизайна, монтажа и повседневной работы.' },
        { label: '75 Гц', title: 'Плавная частота обновления 75 Гц', desc: 'Плавное изображение без разрывов при прокрутке таблиц или просмотре видео высокой чёткости.' },
        { label: 'Рамки 2.3 мм', title: 'Ультратонкие рамки', desc: 'Рамка всего 2.3 мм делает изображение главным — создавая захватывающий, почти безрамочный визуальный опыт.' },
        { label: 'Эргономика', title: 'Эргономичный наклон и подставка', desc: 'Диапазон наклона -5°...+20° и фирменная V-образная металлическая подставка Vision Pro позволяют настроить идеальный угол обзора.' },
      ],
      specs_pro_label: 'Bikon Vision Pro',
      color_eyebrow: 'Дисплей',
      color_title: 'Бесконечный Цвет',
      color_body: 'Откалиброванные на заводе IPS-панели воспроизводят 99% цветового пространства sRGB с поразительной точностью — каждое изображение выглядит именно так, как задумано.',
      color_stats: [
        { value: '99%', label: 'sRGB' },
        { value: '250', label: 'кд/м²' },
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
    uz: {
      hero_scroll: 'Aylantiring',
      lineup_learn: 'Batafsil',
      features_eyebrow: 'Xususiyatlar',
      features_title: 'Har bir detal\nmukammal.',
      features: [
        { label: 'IPS Displey', title: 'Kristall toza IPS panel', desc: "Zavodda kalibrlangan IPS panellar har qanday burchakdan aniq va yorqin ranglarni ta'minlaydi — dizayn, montaj va kundalik ish uchun ideal." },
        { label: '75 Gts', title: 'Silliq 75 Gts yangilanish tezligi', desc: "Jadvallarni aylantirishda yoki yuqori aniqlikdagi video ko'rishda uzilishsiz silliq tasvir." },
        { label: '2.3 mm ramka', title: 'Ultra-ingichka ramkalar', desc: "Atigi 2.3 mm ramka tasvirni birinchi o'ringa qo'yadi — hududsiz ko'rishni ta'minlaydi." },
        { label: 'Ergonomika', title: 'Ergonomik qiyalik va shtativ', desc: "-5°...+20° qiyalik diapazoni va Vision Pro ning V-shaklidagi metall shtativ ideal ko'rish burchagini sozlash imkonini beradi." },
      ],
      specs_pro_label: 'Bikon Vision Pro',
      color_eyebrow: 'Displey',
      color_title: 'Cheksiz Rang',
      color_body: "Zavod kalibrlangan IPS panellar sRGB rang fazosining 99% ini ajoyib aniqlik bilan uzatadi — har bir tasvir xuddi mo'ljallangandek ko'rinadi.",
      color_stats: [
        { value: '99%', label: 'sRGB' },
        { value: '250', label: 'kd/m²' },
        { value: '16.7M', label: 'Rang' },
      ],
      stand_eyebrow: 'Dizayn',
      stand_title: 'Ikonik\nV-Stend',
      stand_body: "Aviatsiya alyuminiyidan yasalgan, firma V-shaklidagi stend har bir ish stolingizni ko'rinishga aylantiradi.",
      stand_pills: ['Alyuminiy qotishma', "-5° / +20° qiyalik"],
      cta_title: 'Displeyingizni\nyangilashga tayyormisiz?',
      cta_body: "Minglab professional va o'yinchilar Bikon Vision-ga o'tishdi.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',
      bento_eyebrow: 'Asosiy xususiyatlar',
      bento_title: 'VISION SERIYASI DISPLEY TEXNOLOGIYASI',
      ports_eyebrow: 'Ulanish',
      ports_title: 'Kerakli barcha\nulanishlar.',
      ports_body: "Vision seriyali monitorlar tayyor holda keladi — HDMI, D-SUB va 3.5mm AUX chiqishi o'rnatilgan, bir necha soniyada ulaning.",
    },
  },
  laptops: {
    en: {
      hero_scroll: 'Scroll to reveal',
      built_eyebrow: 'Design',
      built_title: 'Built Different.',
      built_body: 'Precision-engineered to be remarkably thin and remarkably light — without compromising the performance you need.',
      built_stats: [
        { value: 'Light', label: 'Portable design' },
        { value: 'Slim', label: 'Thin & compact' },
        { value: 'Long-lasting', label: 'Battery life' },
      ],
      features_eyebrow: 'Features',
      features_title: 'Every Feature,\nThought Through.',
      features: [
        { label: 'IPS Display', title: '15.6" Full HD\nIPS Display', desc: 'A factory-calibrated 15.6" Full HD IPS panel delivers vivid colors and sharp text — comfortable all day, every day.' },
        { label: 'Intel Celeron', title: 'Intel Celeron\nPerformance', desc: 'Powered by Intel Celeron dual-core processors — efficient and reliable performance for everyday work and study.' },
        { label: 'All-Day Battery', title: 'Up to 8 Hours\nof Battery Life', desc: 'Take your work anywhere. With up to 8 hours of battery life, Bikon laptops keep up with your day.' },
        { label: 'Connectivity', title: 'Everything\nConnected', desc: 'Built-in Wi-Fi, Bluetooth, a wide array of ports, and a Full HD webcam — stay connected, always.' },
      ],
      lineup_learn: 'Shop Now',
      specs_smartbook_label: 'Smartbook',
      specs_workbook_label: 'Workbook',
      cta_title: 'Ready to Find\nYour Laptop?',
      cta_body: 'Smartbook or Workbook — both designed and assembled right here in Uzbekistan.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',
      showcase_eyebrow: 'The Lineup',
      showcase_title: 'Smartbook &\nWorkbook.',
      showcase_body: 'Two models, one goal — keep you productive wherever you are.',
      image_subtitle: 'VIVID COLORS. WIDE VIEW.',
      image_feat1: 'WIDE VIEW ANGLE',
      image_feat2: 'VIVID COLORS',
      image_feat3: 'IN-PLANE SWITCHING',
      bento_eyebrow: 'Key Features',
      bento_title: 'SMARTBOOK & WORKBOOK TECHNOLOGY',
    },
    ru: {
      hero_scroll: 'Прокрутите вниз',
      built_eyebrow: 'Дизайн',
      built_title: 'Создан иначе.',
      built_body: 'Точно спроектирован, чтобы быть удивительно тонким и лёгким — без ущерба для производительности.',
      built_stats: [
        { value: 'Лёгкий', label: 'Портативный' },
        { value: 'Тонкий', label: 'Компактный корпус' },
        { value: 'Долгий заряд', label: 'Аккумулятор' },
      ],
      features_eyebrow: 'Возможности',
      features_title: 'Каждая функция\nпродумана.',
      features: [
        { label: 'IPS-дисплей', title: '15.6" Full HD\nIPS-дисплей', desc: 'Откалиброванная 15.6" Full HD IPS-панель обеспечивает яркие цвета и чёткий текст — комфортно весь день.' },
        { label: 'Intel Celeron', title: 'Производительность\nIntel Celeron', desc: 'Двухъядерные процессоры Intel Celeron — эффективная и надёжная производительность для учёбы и работы.' },
        { label: 'Весь день', title: 'До 8 часов\nработы аккумулятора', desc: 'Берите работу куда угодно. До 8 часов работы от аккумулятора — ноутбуки Bikon поспевают за вашим днём.' },
        { label: 'Подключение', title: 'Всё\nподключено', desc: 'Встроенные Wi-Fi, Bluetooth, широкий набор портов и веб-камера Full HD — оставайтесь на связи всегда.' },
      ],
      lineup_learn: 'В магазин',
      specs_smartbook_label: 'Smartbook',
      specs_workbook_label: 'Workbook',
      cta_title: 'Готовы найти\nсвой ноутбук?',
      cta_body: 'Smartbook или Workbook — оба разработаны и собраны прямо здесь, в Узбекистане.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',
      showcase_eyebrow: 'Линейка',
      showcase_title: 'Smartbook &\nWorkbook.',
      showcase_body: 'Две модели, одна цель — обеспечить вашу продуктивность где угодно.',
      image_subtitle: 'ЯРКИЕ ЦВЕТА. ШИРОКИЙ ОБЗОР.',
      image_feat1: 'ШИРОКИЙ УГОЛ ОБЗОРА',
      image_feat2: 'ЯРКИЕ ЦВЕТА',
      image_feat3: 'IPS-МАТРИЦА',
      bento_eyebrow: 'Ключевые функции',
      bento_title: 'ТЕХНОЛОГИИ SMARTBOOK & WORKBOOK',
    },
    uz: {
      hero_scroll: 'Pastga aylantiring',
      built_eyebrow: 'Dizayn',
      built_title: 'Boshqacha yaratilgan.',
      built_body: "Ajoyib ingichka va yengil bo'lishi uchun aniq ishlab chiqilgan — kerakli unumdorlikka putur etkazmagan holda.",
      built_stats: [
        { value: 'Yengil', label: "Qulay ko'tariladi" },
        { value: 'Slim', label: 'Ingichka korpus' },
        { value: 'Uzoq ishlaydi', label: 'Batareya' },
      ],
      features_eyebrow: 'Xususiyatlar',
      features_title: "Har bir xususiyat,\nbatafsil o'ylangan.",
      features: [
        { label: 'IPS Displey', title: '15.6" Full HD\nIPS Displey', desc: "Zavod kalibrlangan 15.6\" Full HD IPS panel yorqin ranglar va aniq matn taqdim etadi — har kuni qulay." },
        { label: 'Intel Celeron', title: 'Intel Celeron\nUnumdorligi', desc: "Intel Celeron ikki yadroli protsessorlar — o'qish va ish uchun samarali va ishonchli unumdorlik." },
        { label: "Kun bo'yi", title: '8 soatgacha\nbatareya quvvati', desc: "Ishingizni istalgan joyga olib boring. 8 soatgacha batareya — Bikon noutbuklari sizning kuningizga mos keladi." },
        { label: 'Ulanish', title: 'Hamma narsa\nulangan', desc: "O'rnatilgan Wi-Fi, Bluetooth, keng portlar va Full HD veb-kamera — doim aloqada bo'ling." },
      ],
      lineup_learn: "Do'konga o'tish",
      specs_smartbook_label: 'Smartbook',
      specs_workbook_label: 'Workbook',
      cta_title: "Noutbukingizni\ntopishga tayyormisiz?",
      cta_body: "Smartbook yoki Workbook — ikkalasi ham O'zbekistonda yaratilgan va yig'ilgan.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',
      showcase_eyebrow: 'Seriya',
      showcase_title: "Smartbook va\nWorkbook.",
      showcase_body: "Ikki model, bitta maqsad — qayerda bo'lmasin, samarador ishlash.",
      image_subtitle: "TO'YINGAN RANGLAR. KENG KO'RISH.",
      image_feat1: "KENG KO'RISH BURCHAGI",
      image_feat2: "TO'YINGAN RANGLAR",
      image_feat3: 'IPS TEXNOLOGIYASI',
      bento_eyebrow: 'Asosiy xususiyatlar',
      bento_title: 'SMARTBOOK & WORKBOOK TEXNOLOGIYALARI',
    },
  },
  aios: {
    en: {
      hero_scroll: 'Scroll to explore',
      built_title: 'Less Clutter.\nMore Power.',
      compare_matrix_name: 'Bikon Matrix',
      compare_matrix_tag: 'Essential Performance',
      compare_optima_name: 'Bikon Optima',
      compare_optima_tag: 'Professional Power',
      nova_teaser_title: 'Introducing\nBikon NOVA.',
      nova_teaser_body: 'Experience the NOVA — our all-in-one available in 24" and 27" IPS, powered by Intel Core i3/i5/i7 (12th–14th Gen), in a 20mm slim chassis.',
      models_explore: 'Explore',
    },
    ru: {
      hero_scroll: 'Прокрутите вниз',
      built_title: 'Меньше кабелей.\nБольше мощности.',
      compare_matrix_name: 'Bikon Matrix',
      compare_matrix_tag: 'Базовая производительность',
      compare_optima_name: 'Bikon Optima',
      compare_optima_tag: 'Профессиональная мощность',
      nova_teaser_title: 'Знакомьтесь:\nBikon NOVA.',
      nova_teaser_body: 'Откройте для себя NOVA — моноблок в версиях 24" и 27" IPS, на базе Intel Core i3/i5/i7 (12–14 поколения) в корпусе толщиной 20 мм.',
      models_explore: 'Подробнее',
    },
    uz: {
      hero_scroll: 'Pastga aylantiring',
      built_title: "Boshqacha yig'ilgan.",
      compare_matrix_name: 'Bikon Matrix',
      compare_matrix_tag: 'Kundalik unumdorlik',
      compare_optima_name: 'Bikon Optima',
      compare_optima_tag: 'Professional daraja',
      nova_teaser_title: "Tanishing:\nBikon NOVA.",
      nova_teaser_body: "NOVA ni kashf eting — 24\" va 27\" IPS displey, Intel Core i3/i5/i7 (12–14-avlod) va 20mm yupqa korpusli monoblogimiz.",
      models_explore: "Ko'rish",
    },
  },
  nova: {
    en: {
      lineup_nova_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 up to 16 GB', '20 mm Slim'],
      lineup_learn: 'Shop Now',
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
      back_body: 'The rear of the NOVA is as considered as the front. A slim 20 mm aluminum chassis houses all connectivity — HDMI, DisplayPort, USB-A, and audio — with clean cable routing so nothing interrupts your workspace.',
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
      connectivity_body: 'NOVA packs everything into its slim 20mm frame — DisplayPort, HDMI 2.0, multiple USB-A ports, and Wi-Fi 6, so you stay connected without compromise.',
      cam_eyebrow: 'Built-in Essentials',
      cam_title: 'See clearly.\nHear everything.',
      cam_body: 'A Full HD webcam and dual stereo speakers are built right in — crisp video calls and immersive audio, no extra hardware needed.',
    },
    ru: {
      lineup_nova_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 до 16 ГБ', '20 мм'],
      lineup_learn: 'В магазин',
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
      back_body: 'Задняя панель NOVA продумана так же тщательно, как и передняя. Алюминиевый корпус толщиной 20 мм объединяет все порты — HDMI, DisplayPort, USB-A и аудио — с аккуратной прокладкой кабелей.',
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
      connectivity_body: 'NOVA вмещает всё необходимое в тонком корпусе 20 мм — DisplayPort, HDMI 2.0, несколько портов USB-A и Bluetooth 5.0 для полноценной работы.',
      cam_eyebrow: 'Встроенные возможности',
      cam_title: 'Видьте чётко.\nСлышьте всё.',
      cam_body: 'Веб-камера Full HD и двойные стереодинамики встроены в корпус — чёткие видеозвонки и объёмный звук без лишнего оборудования.',
    },
    uz: {
      lineup_nova_specs: ['24" / 27" IPS', 'Core i3 / i5 / i7', 'DDR4 16 GB gacha', '20 mm'],
      lineup_learn: "Do'konga o'tish",
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
      back_body: "NOVAning orqa qismi old qismi kabi puxta ishlab chiqilgan. 20 mm qalinlikdagi alyuminiy korpus barcha ulanishlarni — HDMI, DisplayPort, USB-A va audio — tartibli joylashtirishni ta'minlaydi.",
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
      connectivity_body: "NOVA 20mm ingichka tanasida hamma narsani joylashtirgan — DisplayPort, HDMI 2.0, bir nechta USB-A port va Bluetooth 5.0.",
      cam_eyebrow: "O'rnatilgan imkoniyatlar",
      cam_title: "Aniq ko'ring.\nHamma narsani eshiting.",
      cam_body: "Full HD veb-kamera va stereo karnaylar ichiga o'rnatilgan — qo'shimcha uskuna kerak emas, sifatli video qo'ng'iroqlar va boy ovoz.",
    },
  },
  matrix: {
    en: {
      lineup_learn: 'Shop Now',
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
      back_body: 'The Matrix rear panel organizes every connection — HDMI, DisplayPort, USB-A, and audio — cleanly and accessibly, keeping your workspace tidy.',
      apps_eyebrow: 'Built for Windows',
      apps_title: 'Windows 11.\nReady from day one.',
      apps_body: 'Matrix ships with Windows 11 Pro pre-installed — Word, Excel, Teams, and thousands of apps run flawlessly on a 24" or 27" IPS display.',
      bento_eyebrow: 'Key Features',
      bento_title: 'MATRIX ALL-IN-ONE TECHNOLOGY',
      connectivity_eyebrow: 'Connectivity',
      connectivity_title: 'Every port\nyou need.',
      connectivity_body: 'Matrix keeps you connected — HDMI 2.0, DisplayPort, multiple USB-A ports, Wi-Fi 6, and Bluetooth 5.0, all in one unit.',
      cam_eyebrow: 'Built-in Essentials',
      cam_title: 'See clearly.\nHear everything.',
      cam_body: 'A Full HD webcam and dual stereo speakers are built right in — crisp video calls and immersive audio, no extra hardware needed.',
    },
    ru: {
      lineup_learn: 'В магазин',
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
      back_body: 'Задняя панель Matrix организует все подключения — HDMI, DisplayPort, USB-A и аудио — аккуратно и доступно, поддерживая порядок на рабочем месте.',
      apps_eyebrow: 'Создан для Windows',
      apps_title: 'Windows 11.\nГотов с первого дня.',
      apps_body: 'Matrix поставляется с предустановленной Windows 11 Pro — Word, Excel, Teams и тысячи других приложений работают на дисплее 24" или 27" IPS.',
      bento_eyebrow: 'Ключевые функции',
      bento_title: 'ТЕХНОЛОГИИ MATRIX ALL-IN-ONE',
      connectivity_eyebrow: 'Подключение',
      connectivity_title: 'Все порты,\nкоторые нужны.',
      connectivity_body: 'Matrix обеспечивает подключение через HDMI 2.0, DisplayPort, USB-A, Wi-Fi 6 и Bluetooth 5.0.',
      cam_eyebrow: 'Встроенные возможности',
      cam_title: 'Видьте чётко.\nСлышьте всё.',
      cam_body: 'Встроенная Full HD веб-камера и стереодинамики — чёткие видеозвонки и объёмный звук без лишнего оборудования.',
    },
    uz: {
      lineup_learn: "Do'konga o'tish",
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
      back_body: "Matrix orqa paneli barcha ulanishlarni — HDMI, DisplayPort, USB-A va audioʼni — tartibli va qulay joylashtiradi, ish joyingizni ozoda saqlaydi.",
      apps_eyebrow: "Windows uchun yaratilgan",
      apps_title: "Windows 11.\nBirinchi kundan tayyor.",
      apps_body: "Matrix oldindan o'rnatilgan Windows 11 Pro bilan keladi — Word, Excel, Teams va minglab ilovalar 24\" yoki 27\" IPS ekranda mukammal ishlaydi.",
      bento_eyebrow: "Asosiy xususiyatlar",
      bento_title: "MATRIX TEXNOLOGIYALARI",
      connectivity_eyebrow: "Ulanish",
      connectivity_title: "Kerakli barcha\nportlar.",
      connectivity_body: "Matrix HDMI 2.0, DisplayPort, USB-A, Wi-Fi 6 va Bluetooth 5.0 orqali ulanishni ta'minlaydi.",
      cam_eyebrow: "O'rnatilgan imkoniyatlar",
      cam_title: "Aniq ko'ring.\nHamma narsani eshiting.",
      cam_body: "Full HD veb-kamera va stereo karnaylar ichiga o'rnatilgan — qo'shimcha uskuna kerak emas, sifatli video qo'ng'iroqlar va boy ovoz.",
    },
  },
  optima: {
    en: {
      lineup_learn: 'Shop Now',
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
    ru: {
      lineup_learn: 'В магазин',
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
    uz: {
      lineup_learn: "Do'konga o'tish",
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
  },
  cases: {
    en: {
      models_cta: 'Shop Now',
      image_eyebrow: 'Advanced Build',
      image_title: 'Steel. Glass.\nDomination.',
      image_body: 'Every Bikon Cases model is crafted from reinforced steel and 4mm tempered glass — built to last, built to impress. Precision-cut ventilation keeps your system cool even under the heaviest loads.',
      ports_eyebrow: 'Front I/O',
      ports_title: 'Every port\nyou need.',
      ports_body: 'The Bikon Cases front panel puts your most-used ports right at your fingertips — no reaching around the back.',
      cta_title: 'Your Build.\nYour Rules.',
      cta_body: 'Bikon Cases. Designed in Tashkent. Built for those who refuse to compromise.',
      cta_shop: 'Shop Now',
      cta_catalog: 'Download Catalog',
    },
    ru: {
      models_cta: 'В магазин',
      image_eyebrow: 'Передовая сборка',
      image_title: 'Сталь. Стекло.\nГосподство.',
      image_body: 'Каждый корпус Bikon Cases изготовлен из армированной стали и закалённого стекла 4мм — надёжный и впечатляющий. Точно вырезанная вентиляция поддерживает температуру системы даже при максимальных нагрузках.',
      ports_eyebrow: 'Передняя панель I/O',
      ports_title: 'Каждый порт\nпод рукой.',
      ports_body: 'Передняя панель Bikon Cases помещает самые используемые порты прямо на виду — не нужно тянуться к задней части корпуса.',
      cta_title: 'Ваша сборка.\nВаши правила.',
      cta_body: 'Bikon Cases. Разработано в Ташкенте. Создано для тех, кто не идёт на компромисс.',
      cta_shop: 'В магазин',
      cta_catalog: 'Скачать каталог',
    },
    uz: {
      models_cta: "Do'konga o'tish",
      image_eyebrow: "Ilg'or Qurilish",
      image_title: "Po'lat. Shisha.\nHukmronlik.",
      image_body: "Har bir Bikon Cases korpusi mustahkam po'lat va 4mm toblangan shishadan tayyorlangan — uzoq xizmat qilishi va ta'sirli ko'rinishi uchun. Aniq kesilgan shamollatish teshiklari tizimni eng og'ir yuklarda ham sovuq saqlaydi.",
      ports_eyebrow: 'Old Panel I/O',
      ports_title: "Kerakli barcha\nportlar.",
      ports_body: "Bikon Cases old paneli eng ko'p ishlatiladigan portlarni barmoq uchlaringizda joylashtiradi — orqaga cho'zilishning hojati yo'q.",
      cta_title: "Sizning qurilmangiz.\nSizning qoidalaringiz.",
      cta_body: "Bikon Cases. Toshkentda ishlab chiqilgan. Murosaga bormaydigan kishilar uchun yaratilgan.",
      cta_shop: "Do'konga o'tish",
      cta_catalog: 'Katalog yuklab olish',
    },
  },
};

/* ── About Page "extra" seed (remaining sections not yet modeled as
   dedicated fields — mission, what-we-do, why-choose, future goals,
   global reach, facts, founder mission/goals, history, revenue). ───────── */
const ABOUT_EXTRA_EN = {
  mission_label: '🚀 Our Mission',
  mission_quote: '"Our mission is to provide reliable, convenient, and cost-effective technology solutions for every user and business. We aim to become Uzbekistan\'s most trusted technology brand by combining quality, service, and affordability."',
  what_label: '💡 What We Do',
  what_title: 'What We Do?',
  what_summary: 'By combining high-quality components imported from global manufacturers with local production expertise, BIKON offers powerful, efficient, and reliable computers for businesses, government institutions, and the public.',
  what_activities: 'Our Core Activities',
  what_cards: [
    { icon: '🏭', title: 'Manufacturing and Localization', body: 'Producing innovative products from global and local components under strict quality control.' },
    { icon: '🏢', title: 'Corporate Sales (B2B)', body: 'Delivering high-quality technology solutions for offices and enterprises.' },
    { icon: '🛒', title: 'Retail Sales (B2C)', body: 'Offering affordable computer equipment to the public through all major marketplaces and our official website, bikon.uz' },
    { icon: '🛠', title: 'Service and Warranty', body: 'Through our own service centers, we provide customers with official warranty coverage from 1 to 3 years, along with spare parts support.' },
    { icon: '🎯', title: 'Goal', body: 'To gradually localize component production, expand the network of service centers and showrooms, and establish exports to foreign markets.' },
  ],
  why_label: '⭐ Why Choose BIKON?',
  why_title: 'Why Do Customers Choose Us?',
  why_subtitle: 'Companies that choose BIKON choose efficiency, quality, and reliability.',
  why_items: [
    { title: 'Experience and Market Reputation', body: 'Trading experience since 2015 and the trust of hundreds of partners.' },
    { title: 'Transparent Business Principles', body: 'All processes, pricing, and deliveries are managed with full transparency.' },
    { title: 'On-Time Delivery and Logistics', body: 'An efficient, flexible, and reliable logistics system is in place.' },
    { title: 'Qualified Team', body: 'A united group combining the expertise of experienced engineers, strong sales professionals, creative marketers, and other specialists.' },
    { title: 'Digitalizing Business Processes', body: 'Improving efficiency through CRM, ERP, and automated management systems.' },
    { title: 'Developing the Partnership Network', body: 'Active cooperation with OEM manufacturers, retail chains, and the public sector.' },
    { title: 'Service Centers', body: 'Official warranty and technical support available in Tashkent, Andijan, and Namangan.' },
  ],
  values_label: 'Our Values',
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
  facts: [
    { label: 'Founded', value: '2015', sub: 'Year established' },
    { label: 'Location', value: 'Tashkent', sub: 'Uzbekistan' },
    { label: 'Market Segment', value: 'Affordable', sub: 'and Mid-Range' },
    { label: 'Main Products', value: 'Laptop · Monitor', sub: 'Monoblock · Components' },
  ],
  founder_eyebrow: 'Founder & Vision',
  founder_mission_label: 'Mission',
  founder_mission: 'To transform Uzbekistan from an electronics import dependent market into a competitive exporting country by establishing local production and creating 1000+ jobs',
  founder_goals_label: 'Strategic Goals',
  founder_goals: [
    { title: 'Manufacturing', desc: 'Establish a full-scale production plant' },
    { title: 'Employment', desc: 'Create 1000+ jobs' },
    { title: 'Growth', desc: 'Achieve an annual turnover of $500M' },
  ],
  founder_footer: 'BIKON aims to become a national technology leader and a strong competitor in the international market.',
  history_label: 'History',
  history_title: 'Company History & Development',
  history_subtitle: "BIKON's journey began in 2016 with a small service team operating under the COMPASS brand. Over the years, the company has consistently expanded its operations and capabilities.",
  history_today: 'Today, BIKON is evolving into a full-cycle technology company combining:',
  history_trade: 'Trade',
  history_service: 'Service',
  history_production: 'Production',
  revenue_label: 'Growth',
  revenue_title: 'Annual Revenue Growth',
  revenue_subtitle: 'Expanding Our Team and Business',
  marketplace_label: 'Marketplace Presence',
  marketplace_title: 'Available on Leading Platforms',
};

const ABOUT_EXTRA_RU = {
  mission_label: '🚀 Наша миссия',
  mission_quote: '«Наша миссия — предоставлять надёжные, удобные и экономически эффективные технологические решения для каждого пользователя и бизнеса. Мы стремимся стать самым надёжным технологическим брендом Узбекистана, сочетая качество, сервис и доступность.»',
  what_label: '💡 Чем мы занимаемся',
  what_title: 'Чем мы занимаемся?',
  what_summary: 'Сочетая высококачественные компоненты от мировых производителей с местной производственной экспертизой, BIKON предлагает мощные, эффективные и надёжные компьютеры для бизнеса, государственных учреждений и населения.',
  what_activities: 'Основные направления деятельности',
  what_cards: [
    { icon: '🏭', title: 'Производство и локализация', body: 'Производство инновационных продуктов из глобальных и местных компонентов под строгим контролем качества.' },
    { icon: '🏢', title: 'Корпоративные продажи (B2B)', body: 'Высококачественные технологические решения для офисов и предприятий.' },
    { icon: '🛒', title: 'Розничные продажи (B2C)', body: 'Доступное компьютерное оборудование через все маркетплейсы и официальный сайт bikon.uz' },
    { icon: '🛠', title: 'Сервис и гарантия', body: 'Официальное гарантийное обслуживание от 1 до 3 лет через собственные сервисные центры.' },
    { icon: '🎯', title: 'Цель', body: 'Локализация производства компонентов, расширение сети сервисных центров и шоурумов, выход на внешние рынки.' },
  ],
  why_label: '⭐ Почему BIKON?',
  why_title: 'Почему клиенты выбирают нас?',
  why_subtitle: 'Компании, выбирающие BIKON, выбирают эффективность, качество и надёжность.',
  why_items: [
    { title: 'Опыт и репутация на рынке', body: 'Торговый опыт с 2015 года и доверие сотен партнёров.' },
    { title: 'Прозрачные бизнес-принципы', body: 'Все процессы, ценообразование и поставки управляются с полной прозрачностью.' },
    { title: 'Своевременная доставка и логистика', body: 'Налажена эффективная, гибкая и надёжная логистическая система.' },
    { title: 'Квалифицированная команда', body: 'Сплочённая группа опытных инженеров, сильных продажников, креативных маркетологов и других специалистов.' },
    { title: 'Цифровизация бизнес-процессов', body: 'Повышение эффективности с помощью CRM, ERP и автоматизированных систем управления.' },
    { title: 'Развитие партнёрской сети', body: 'Активное сотрудничество с OEM-производителями, розничными сетями и государственным сектором.' },
    { title: 'Сервисные центры', body: 'Официальная гарантийная и техническая поддержка в Ташкенте, Андижане и Намангане.' },
  ],
  values_label: 'Наши ценности',
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
  facts: [
    { label: 'Основана', value: '2015', sub: 'Год основания' },
    { label: 'Расположение', value: 'Ташкент', sub: 'Узбекистан' },
    { label: 'Сегмент рынка', value: 'Доступный', sub: 'и средний ценовой сегмент' },
    { label: 'Продукция', value: 'Ноутбук · Монитор', sub: 'Моноблок · Комплектующие' },
  ],
  founder_eyebrow: 'Основатель и видение',
  founder_mission_label: 'Миссия',
  founder_mission: 'Превратить Узбекистан из страны, зависящей от импорта электроники, в конкурентоспособную страну-экспортёра путём создания местного производства и более 1000 рабочих мест',
  founder_goals_label: 'Стратегические цели',
  founder_goals: [
    { title: 'Производство', desc: 'Создать полноцикловое производственное предприятие' },
    { title: 'Занятость', desc: 'Создать более 1000 рабочих мест' },
    { title: 'Рост', desc: 'Достичь годового оборота в $500 млн' },
  ],
  founder_footer: 'BIKON стремится стать национальным лидером в области технологий и сильным конкурентом на международном рынке.',
  history_label: 'История',
  history_title: 'История и развитие компании',
  history_subtitle: 'Путь BIKON начался в 2016 году с небольшой сервисной команды под брендом COMPASS. За эти годы компания последовательно расширяла свою деятельность и возможности.',
  history_today: 'Сегодня BIKON превращается в полноцикловую технологическую компанию, объединяющую:',
  history_trade: 'Торговля',
  history_service: 'Сервис',
  history_production: 'Производство',
  revenue_label: 'Рост',
  revenue_title: 'Ежегодный рост выручки',
  revenue_subtitle: 'Расширение команды и бизнеса',
  marketplace_label: 'Присутствие на маркетплейсах',
  marketplace_title: 'Доступно на ведущих платформах',
};

const ABOUT_EXTRA_UZ = {
  mission_label: '🚀 Bizning missiyamiz',
  mission_quote: '"Bizning missiyamiz — har bir foydalanuvchi va biznes uchun ishonchli, qulay va tejamkor texnologik yechimlar taqdim etishdir. Sifat, xizmat va qulaylikni birlashtirib, O\'zbekistonning eng ishonchli texnologiya brendiga aylanishga intilamiz."',
  what_label: '💡 Biz nima qilamiz',
  what_title: 'Biz nima qilamiz?',
  what_summary: "Global ishlab chiqaruvchilardan import qilingan yuqori sifatli komponentlarni mahalliy ishlab chiqarish tajribasi bilan birlashtirib, BIKON biznes, davlat muassasalari va aholi uchun kuchli, samarali va ishonchli kompyuterlar taqdim etadi.",
  what_activities: "Asosiy faoliyat yo'nalishlari",
  what_cards: [
    { icon: '🏭', title: 'Ishlab chiqarish va lokalizatsiya', body: "Qat'iy sifat nazorati ostida global va mahalliy komponentlardan innovatsion mahsulotlar ishlab chiqarish." },
    { icon: '🏢', title: 'Korporativ savdo (B2B)', body: 'Ofislar va korxonalar uchun yuqori sifatli texnologik yechimlar yetkazib berish.' },
    { icon: '🛒', title: 'Chakana savdo (B2C)', body: "Barcha yirik savdo maydonchalar va rasmiy sayt bikon.uz orqali aholiga arzon kompyuter jihozlarini taqdim etish." },
    { icon: '🛠', title: 'Xizmat va kafolat', body: "O'z xizmat markazlarimiz orqali mijozlarga 1 dan 3 yilgacha rasmiy kafolat va ehtiyot qismlar bilan ta'minlaymiz." },
    { icon: '🎯', title: 'Maqsad', body: "Komponent ishlab chiqarishni bosqichma-bosqich lokalizatsiya qilish, xizmat markazlari va showroomlar tarmog'ini kengaytirish va xorijiy bozorlarga eksport yo'lga qo'yish." },
  ],
  why_label: '⭐ Nima uchun BIKON?',
  why_title: 'Nima uchun mijozlar bizni tanlaydi?',
  why_subtitle: 'BIKON ni tanlagan kompaniyalar samaradorlik, sifat va ishonchlilikni tanlaydi.',
  why_items: [
    { title: "Tajriba va bozor obro'si", body: "2015 yildan beri savdo tajribasi va yuzlab hamkorlarning ishonchi." },
    { title: 'Shaffof biznes tamoyillari', body: "Barcha jarayonlar, narxlar va yetkazib berishlar to'liq shaffoflik bilan boshqariladi." },
    { title: "O'z vaqtida yetkazib berish", body: "Samarali, moslashuvchan va ishonchli logistika tizimi mavjud." },
    { title: 'Malakali jamoa', body: "Tajribali muhandislar, kuchli savdo mutaxassislari, ijodiy marketologlar va boshqa mutaxassislardan iborat birlashgan jamoa." },
    { title: 'Biznes jarayonlarini raqamlashtirish', body: "CRM, ERP va avtomatlashtirilgan boshqaruv tizimlari orqali samaradorlikni oshirish." },
    { title: "Hamkorlik tarmog'ini rivojlantirish", body: "OEM ishlab chiqaruvchilar, chakana savdo tarmoqlari va davlat sektori bilan faol hamkorlik." },
    { title: 'Servis markazlari', body: "Toshkent, Andijon va Namanganda rasmiy kafolat va texnik qo'llab-quvvatlash." },
  ],
  values_label: 'Bizning qadriyatlarimiz',
  future_label: 'Kelajak maqsadlarimiz',
  future_title: 'Biz qayerga ketmoqdamiz',
  future_goals: [
    "Mahalliy ishlab chiqarish imkoniyatlarini kengaytirish",
    "Servis markazlari sonini ko'paytirish",
    "Markaziy Osiyo va jahon bozorlariga chiqish",
    '"O\'zbekistonda ishlab chiqarilgan" brendini rivojlantirish',
  ],
  global_title: 'Global qamrov, mahalliy ildizlar',
  global_body: "Toshkent ko'chalaridan Markaziy Osiyo va undan tashqariga — biz har bir foydalanuvchi, biznes va muassasa uchun texnologik infratuzilma quramiz.",
  global_tags: ["🇺🇿 O'zbekiston", '🌐 Markaziy Osiyo', '🚀 Jahon bozorlari'],
  facts: [
    { label: 'Tashkil etilgan', value: '2015', sub: 'Asos solingan yil' },
    { label: 'Joylashuv', value: 'Toshkent', sub: "O'zbekiston" },
    { label: 'Bozor segmenti', value: 'Hamyonbop', sub: "va o'rta narx segmenti" },
    { label: 'Asosiy mahsulot', value: 'Noutbuk · Monitor', sub: 'Monoblock · Komponentlar' },
  ],
  founder_eyebrow: 'Asoschi va Vizyon',
  founder_mission_label: 'Missiya',
  founder_mission: "O'zbekistonni elektronika importiga bog'liq bozordan mahalliy ishlab chiqarish va 1000+ ish o'rni yaratish orqali raqobatbardosh eksport mamlakati sifatida shakllantirish",
  founder_goals_label: 'Strategik maqsadlar',
  founder_goals: [
    { title: 'Ishlab chiqarish', desc: "To'liq tsiklli ishlab chiqarish korxonasini tashkil etish" },
    { title: 'Bandlik', desc: "1000+ ish o'rni yaratish" },
    { title: "O'sish", desc: "$500 mln yillik aylanmaga erishish" },
  ],
  founder_footer: "BIKON milliy texnologiya lideri va xalqaro bozorda kuchli raqibga aylanishni maqsad qilgan.",
  history_label: 'Tarix',
  history_title: 'Kompaniya tarixi va rivojlanishi',
  history_subtitle: "BIKON ning yo'li 2016 yilda COMPASS brendi ostida kichik xizmat guruhi bilan boshlandi. Yillar davomida kompaniya o'z faoliyatini va imkoniyatlarini izchil kengaytirdi.",
  history_today: "Bugun BIKON quyidagilarni birlashtirgan to'liq tsiklli texnologiya kompaniyasiga aylanmoqda:",
  history_trade: 'Savdo',
  history_service: 'Xizmat',
  history_production: 'Ishlab chiqarish',
  revenue_label: "O'sish",
  revenue_title: "Yillik daromad o'sishi",
  revenue_subtitle: "Jamoamiz va biznesimizni kengaytirish",
  marketplace_label: 'Marketplace mavjudligi',
  marketplace_title: "Yetakchi platformalarda mavjud",
};

const ABOUT_FOUNDER_NAME_TITLE = {
  founder_name: 'Golib Obiddinovich\nAvezov',
  founder_title: 'Founder',
};

/* ── Home Page seed (Hero, Category Grid, Trust section, Build-Your-PC CTA) ── */
const HOME_PAGE_SEED_EN = {
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
      { series: 'BIKON CASES', title: 'Cases' },
    ],
  },
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
  buildpc: {
    badge: 'Custom Build',
    title1: 'Build Your',
    title2: 'Dream PC.',
    body: 'Tell us your goals and budget — our specialists will pick the perfect components and assemble your PC right here in Uzbekistan.',
    name_label: 'Your Name',
    name_placeholder: 'Ali Valiyev',
    phone_label: 'Phone Number',
    phone_placeholder: '+998 90 000 00 00',
    budget_label: 'Budget',
    budget_placeholder: 'e.g. 5 000 000 UZS',
    purpose_label: 'Purpose',
    purpose_placeholder: 'Select purpose',
    purposes: ['Gaming', 'Office / Work', 'Design & Video Editing', 'Programming', 'General Use'],
    notes_label: 'Additional Notes',
    notes_placeholder: 'Any specific requirements or preferences...',
    submit: 'Send Request',
    submitting: 'Sending...',
    success_title: 'Request Received!',
    success_desc: 'Our specialists will contact you shortly to discuss your perfect build.',
    error: 'Something went wrong. Please try again or contact us directly.',
    retry: 'Try Again',
  },
};

const HOME_PAGE_SEED_RU = {
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
      { series: 'BIKON CASES', title: 'Корпуса' },
    ],
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
  buildpc: {
    badge: 'Кастомная сборка',
    title1: 'Собери свой',
    title2: 'идеальный ПК.',
    body: 'Расскажите нам о своих целях и бюджете — наши специалисты подберут компоненты и соберут ПК прямо здесь, в Узбекистане.',
    name_label: 'Ваше имя',
    name_placeholder: 'Иван Иванов',
    phone_label: 'Номер телефона',
    phone_placeholder: '+998 90 000 00 00',
    budget_label: 'Бюджет',
    budget_placeholder: 'например, 5 000 000 сум',
    purpose_label: 'Цель использования',
    purpose_placeholder: 'Выберите цель',
    purposes: ['Игры', 'Офис / Работа', 'Дизайн и видеомонтаж', 'Программирование', 'Общее использование'],
    notes_label: 'Дополнительно',
    notes_placeholder: 'Любые особые пожелания или требования...',
    submit: 'Отправить заявку',
    submitting: 'Отправляем...',
    success_title: 'Заявка принята!',
    success_desc: 'Наши специалисты свяжутся с вами в ближайшее время для обсуждения вашей сборки.',
    error: 'Что-то пошло не так. Попробуйте ещё раз или свяжитесь с нами напрямую.',
    retry: 'Попробовать снова',
  },
};

const HOME_PAGE_SEED_UZ = {
  hero: {
    eyebrow: 'Milliy Brend',
    title1: 'BIKON',
    title2: 'Kelajak uchun',
    title3: 'yaratilgan.',
    subtitle: "Dunyo standartlariga mos qurilmalar — unumdorlik va ilhom uchun mo'ljallangan.",
    cta_primary: 'Batafsil',
    cta_secondary: 'Mahsulotlar',
    badge1: '12 oy kafolat',
    badge2: 'Bepul yetkazish',
    badge3: "O'zbekistonda #1",
  },
  categories: {
    eyebrow: 'Mahsulotlar',
    title_light: 'Kategoriyalarni ',
    title_bold: "ko'ring",
    learn_more: "Ko'proq",
    footer_note: "Barcha mahsulotlar O'zbekistonda yig'ilgan · 12 oy rasmiy kafolat",
    items: [
      { series: 'SMARTBOOK SERIYASI', title: 'Noutbuklar' },
      { series: 'MATRIX SERIYASI', title: 'Monoblok' },
      { series: 'VISION PRO SERIYASI', title: 'Monitorlar' },
      { series: 'BIKON CASES', title: 'Korpuslar' },
    ],
  },
  trust: {
    eyebrow: 'Nima uchun biz',
    title_light: 'Nega ',
    title_bold: 'Bikon?',
    subtitle: 'Sifat va ishonch — bizning asosiy vazifamiz. Har bir qurilma ortida katta mehnat va innovatsiyalar yotadi.',
    features: [
      { title: "Lokal yig'uv va servis", desc: "O'zbekistonda mahalliy yig'ilgan va xizmat ko'rsatiladigan sifatli qurilmalar." },
      { title: 'Narx va sifatning maqbul mutanosibligi', desc: "Dunyo miqyosidagi xususiyatlar va raqobatbardosh narxlarning mukammal muvozanati." },
      { title: "12 oylik kafolat va butun respublika bo'ylab servis markazlari", desc: "12 oylik kafolat va respublika bo'ylab servis markazlari tarmog'i." },
      { title: 'Barqaror logistika va tezkor yetkazib berish', desc: "Ishonchli ta'minot zanjiri va tez yetkazib berish — buyurtmangiz o'z vaqtida yetib keladi." },
    ],
  },
  buildpc: {
    badge: "Maxsus Yig'ish",
    title1: "O'z kompyuteringizni",
    title2: 'yarating.',
    body: "Maqsad va byudjetingizni aytib bering — mutaxassislarimiz komponentlarni tanlab, O'zbekistonda kompyuteringizni yig'ib beradi.",
    name_label: 'Ismingiz',
    name_placeholder: 'Ali Valiyev',
    phone_label: 'Telefon raqami',
    phone_placeholder: '+998 90 000 00 00',
    budget_label: 'Byudjet',
    budget_placeholder: "masalan, 5 000 000 so'm",
    purpose_label: 'Foydalanish maqsadi',
    purpose_placeholder: 'Maqsadni tanlang',
    purposes: ["O'yin", 'Ofis / Ish', 'Dizayn va video tahrirlash', 'Dasturlash', 'Umumiy foydalanish'],
    notes_label: "Qo'shimcha",
    notes_placeholder: 'Maxsus talablar yoki istaklaringiz...',
    submit: "Ariza jo'natish",
    submitting: "Jo'natilmoqda...",
    success_title: 'Ariza qabul qilindi!',
    success_desc: "Mutaxassislarimiz tez orada siz bilan bog'lanib, yig'ish haqida gaplashadi.",
    error: "Xatolik yuz berdi. Qaytadan urinib ko'ring yoki biz bilan bog'laning.",
    retry: 'Qayta urinish',
  },
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

async function seedHomePage(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::home-page.home-page').findFirst({ locale: 'en' });
  if (existing) return;

  await strapi.documents('api::home-page.home-page').create({
    data: HOME_PAGE_SEED_EN as any,
    locale: 'en',
    status: 'published',
  });
  console.log('[seed] home-page created');
}

async function seedHomePageLocale(
  strapi: Core.Strapi,
  locale: 'ru' | 'uz',
  seed: typeof HOME_PAGE_SEED_RU,
) {
  const existing = await strapi.documents('api::home-page.home-page').findFirst({ locale });
  if (existing) return;

  const en = await strapi.documents('api::home-page.home-page').findFirst({ locale: 'en' });
  if (!en) return;

  await (strapi.documents('api::home-page.home-page') as any).update({
    documentId: (en as any).documentId,
    locale,
    status: 'published',
    data: seed,
  });
  console.log(`[seed] home-page ${locale} created`);
}

async function seedSiteProducts(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::site-product.site-product').findMany({ locale: 'en' });
  const existingIds = new Set(existing.map((p: any) => p.category_id));

  for (const product of SITE_PRODUCTS) {
    if (existingIds.has(product.category_id)) continue;
    await strapi.documents('api::site-product.site-product').create({
      data: product as any,
      locale: 'en',
      status: 'published',
    });
    console.log(`[seed] site-product created: ${product.category_id}`);
  }
}

async function seedSiteProductLocale(
  strapi: Core.Strapi,
  locale: 'ru' | 'uz',
  products: typeof SITE_PRODUCTS_RU,
) {
  for (const product of products) {
    const existing = await strapi.documents('api::site-product.site-product').findMany({
      locale,
      filters: { category_id: { $eq: product.category_id } } as any,
    });
    if (existing.length) continue;

    const enDocs = await strapi.documents('api::site-product.site-product').findMany({
      locale: 'en',
      filters: { category_id: { $eq: product.category_id } } as any,
    });
    if (!enDocs.length) continue;

    const { category_id: _categoryId, ...data } = product;
    await (strapi.documents('api::site-product.site-product') as any).update({
      documentId: (enDocs[0] as any).documentId,
      locale,
      status: 'published',
      data,
    });
    console.log(`[seed] site-product ${locale} created: ${product.category_id}`);
  }
}

async function seedProductPageExtras(strapi: Core.Strapi) {
  const locales: ('en' | 'ru' | 'uz')[] = ['en', 'ru', 'uz'];
  for (const [slug, byLocale] of Object.entries(PRODUCT_PAGE_EXTRAS)) {
    for (const locale of locales) {
      const existing = await strapi.documents('api::product-page.product-page').findMany({
        locale,
        filters: { slug: { $eq: slug } } as any,
      });
      if (!existing.length) continue;

      const doc = existing[0] as any;
      if (doc.extra) continue; // already set — don't clobber admin edits

      await (strapi.documents('api::product-page.product-page') as any).update({
        documentId: doc.documentId,
        locale,
        status: 'published',
        data: { extra: byLocale[locale] },
      });
      console.log(`[seed] product-page extra ${locale} set: ${slug}`);
    }
  }
}

async function seedAboutPageExtra(strapi: Core.Strapi) {
  const extras: Record<'en' | 'ru' | 'uz', Record<string, unknown>> = {
    en: ABOUT_EXTRA_EN,
    ru: ABOUT_EXTRA_RU,
    uz: ABOUT_EXTRA_UZ,
  };
  const locales: ('en' | 'ru' | 'uz')[] = ['en', 'ru', 'uz'];

  for (const locale of locales) {
    const existing = await strapi.documents('api::about-page.about-page').findFirst({ locale });
    if (!existing) continue;

    const doc = existing as any;
    const data: Record<string, unknown> = {};
    if (!doc.extra) data.extra = extras[locale];
    if (!doc.founder_name) data.founder_name = ABOUT_FOUNDER_NAME_TITLE.founder_name;
    if (!doc.founder_title) data.founder_title = ABOUT_FOUNDER_NAME_TITLE.founder_title;
    if (Object.keys(data).length === 0) continue;

    await (strapi.documents('api::about-page.about-page') as any).update({
      documentId: doc.documentId,
      locale,
      status: 'published',
      data,
    });
    console.log(`[seed] about-page extra ${locale} set`);
  }
}

async function grantPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
    populate: ['permissions'],
  }) as any;

  if (!publicRole) return;

  const existing = new Set(
    (publicRole.permissions as any[]).map((p: any) => p.action),
  );

  const actions = [
    'api::product-page.product-page.find',
    'api::product-page.product-page.findOne',
    'api::about-page.about-page.find',
    'api::about-page.about-page.findOne',
    'api::site-product.site-product.find',
    'api::site-product.site-product.findOne',
    'api::article.article.find',
    'api::article.article.findOne',
    'api::home-page.home-page.find',
    'api::home-page.home-page.findOne',
  ];

  for (const action of actions) {
    if (!existing.has(action)) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id, enabled: true },
      });
      console.log(`[seed] public permission granted: ${action}`);
    }
  }
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
    await grantPublicPermissions(strapi);
    await ensureLocales(strapi);
    await seedProductPages(strapi);
    await seedAboutPage(strapi);
    await seedSiteProducts(strapi);
    await seedHomePage(strapi);

    await seedProductPageLocale(strapi, 'ru', SEED_PAGES_RU);
    await seedProductPageLocale(strapi, 'uz', SEED_PAGES_UZ);
    await seedAboutPageLocale(strapi, 'ru', ABOUT_SEED_RU);
    await seedAboutPageLocale(strapi, 'uz', ABOUT_SEED_UZ);
    await seedSiteProductLocale(strapi, 'ru', SITE_PRODUCTS_RU);
    await seedSiteProductLocale(strapi, 'uz', SITE_PRODUCTS_UZ);
    await seedHomePageLocale(strapi, 'ru', HOME_PAGE_SEED_RU);
    await seedHomePageLocale(strapi, 'uz', HOME_PAGE_SEED_UZ);

    await seedProductPageExtras(strapi);
    await seedAboutPageExtra(strapi);
  },
};
