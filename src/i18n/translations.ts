export type Lang = 'en' | 'ru' | 'uz';

const t = {
  en: {
    /* ── Navbar ─────────────────────────────────────────────────────── */
    nav: {
      home:     'Home',
      laptops:  'Laptops',
      cases:    'Cases',
      monitors: 'Monitors',
      contact:  'Contact',
    },

    /* ── Hero ───────────────────────────────────────────────────────── */
    hero: {
      eyebrow:    'Premium Technology',
      title1:     'Bikon.',
      title2:     'Engineered for',
      title3:     'the Future.',
      subtitle:   'Premium devices crafted to world standards — engineered for performance, designed to inspire.',
      cta_primary:   'Learn More',
      cta_secondary: 'Explore Products',
      badge1: '12 Months Warranty',
      badge2: 'Free Shipping',
      badge3: "Uzbekistan's #1",
    },

    /* ── Category Grid ──────────────────────────────────────────────── */
    categories: {
      eyebrow:    'Products',
      title_light: 'Explore ',
      title_bold:  'Categories',
      learn_more:  'Learn more',
      footer_note: 'All products locally assembled in Uzbekistan · 12-Month Official Warranty',
      items: [
        { series: 'SMARTBOOK SERIES', title: 'Laptops'     },
        { series: 'MATRIX SERIES',    title: 'All-in-Ones' },
        { series: 'VISION PRO SERIES',title: 'Monitors'    },
        { series: 'PHANTOM SERIES',   title: 'Cases & PCs' },
      ],
    },

    /* ── Catalog Section ────────────────────────────────────────────── */
    catalog: {
      eyebrow:  'Resources',
      title_light: 'Download our ',
      title_bold:  '2026 Catalog',
      body:     'Explore the full Bikon product line — detailed specifications, pricing, and configuration options for every device we make.',
      button:   'Download PDF',
    },

    /* ── Why Bikon (TrustSection) ───────────────────────────────────── */
    trust: {
      eyebrow:    'Why Choose Us',
      title_light: 'Why ',
      title_bold:  'Bikon?',
      subtitle:   'Quality and trust are our highest priority. Every device is backed by hard work and constant innovation.',
      features: [
        { title: 'Local Assembly & Support',    desc: 'Premium hardware assembled and serviced locally in Uzbekistan for maximum reliability.' },
        { title: 'Optimal Performance Value',   desc: 'The perfect balance of world-class specifications and competitive market pricing.'     },
        { title: 'Certified Quality Control',   desc: 'Every unit passes rigorous QA testing before leaving our assembly facility.'           },
        { title: 'Dedicated After-Sales Care',  desc: 'Our expert support team is always ready to assist — before and after your purchase.'   },
      ],
    },

    /* ── Product Sections ───────────────────────────────────────────── */
    products: {
      eyebrow:   'Catalog',
      buy_now:   'Buy Now',
      learn_more:'Learn More',
    },

    /* ── CTA / Bestseller ───────────────────────────────────────────── */
    cta: {
      badge:    'Top Rated',
      title1:   'Discover our',
      title2:   'Bestsellers.',
      body:     'Join thousands of users who have upgraded to Bikon. Professional power, engineered for Uzbekistan.',
      shop_now: 'Shop Now',
      view_all: 'View all →',
    },

    /* ── Footer ─────────────────────────────────────────────────────── */
    footer: {
      tagline:   'Premium technology, proudly engineered in Uzbekistan. Building the future together.',
      copyright: '© 2026 Bikon.uz. Handcrafted in UZ.',
      cols: [
        {
          heading: 'Products',
          links:   ['Laptops', 'All-in-Ones', 'Desktop PC', 'Monitors'],
        },
        {
          heading: 'About Bikon',
          links:   ['Company', 'Careers', 'News', 'Contact'],
        },
        {
          heading: 'Support',
          links:   ['How to Buy', 'Shipping', 'Warranty', 'Service Centers'],
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
      home:     'Главная',
      laptops:  'Ноутбуки',
      cases:    'Корпуса',
      monitors: 'Мониторы',
      contact:  'Контакт',
    },
    hero: {
      eyebrow:    'Премиум Технологии',
      title1:     'Bikon.',
      title2:     'Создан для',
      title3:     'будущего.',
      subtitle:   'Премиальные устройства по мировым стандартам — для производительности и вдохновения.',
      cta_primary:   'Узнать больше',
      cta_secondary: 'Смотреть продукты',
      badge1: 'Гарантия 12 месяцев',
      badge2: 'Бесплатная доставка',
      badge3: '№1 в Узбекистане',
    },
    categories: {
      eyebrow:    'Продукты',
      title_light: 'Исследуйте ',
      title_bold:  'категории',
      learn_more:  'Подробнее',
      footer_note: 'Все устройства собраны в Узбекистане · Гарантия 12 месяцев',
      items: [
        { series: 'СЕРИЯ SMARTBOOK',   title: 'Ноутбуки'   },
        { series: 'СЕРИЯ MATRIX',      title: 'Моноблоки'  },
        { series: 'СЕРИЯ VISION PRO',  title: 'Мониторы'   },
        { series: 'СЕРИЯ PHANTOM',     title: 'Корпуса'    },
      ],
    },
    catalog: {
      eyebrow:     'Ресурсы',
      title_light: 'Скачайте наш ',
      title_bold:  'каталог 2026',
      body:        'Ознакомьтесь с полной линейкой Bikon — детальные характеристики, цены и варианты конфигурации.',
      button:      'Скачать PDF',
    },
    trust: {
      eyebrow:    'Почему мы',
      title_light: 'Почему ',
      title_bold:  'Bikon?',
      subtitle:   'Качество и доверие — наш главный приоритет. За каждым устройством — большой труд и инновации.',
      features: [
        { title: 'Локальная сборка и сервис',   desc: 'Премиальное оборудование, собранное и обслуживаемое в Узбекистане.'       },
        { title: 'Оптимальное соотношение цена/качество', desc: 'Идеальный баланс мировых характеристик и конкурентных цен.'    },
        { title: 'Сертифицированный контроль качества', desc: 'Каждое устройство проходит строгое тестирование перед отправкой.' },
        { title: 'Поддержка после продажи',    desc: 'Наша команда всегда готова помочь — до и после покупки.'                   },
      ],
    },
    products: {
      eyebrow:    'Каталог',
      buy_now:    'Купить',
      learn_more: 'Подробнее',
    },
    cta: {
      badge:    'Топ продаж',
      title1:   'Откройте для себя',
      title2:   'бестселлеры.',
      body:     'Тысячи пользователей уже перешли на Bikon. Профессиональная мощь для Узбекистана.',
      shop_now: 'В магазин',
      view_all: 'Смотреть все →',
    },
    footer: {
      tagline:   'Премиальные технологии, произведённые в Узбекистане. Строим будущее вместе.',
      copyright: '© 2026 Bikon.uz. Сделано с любовью в UZ.',
      cols: [
        {
          heading: 'Продукты',
          links:   ['Ноутбуки', 'Моноблоки', 'Настольные ПК', 'Мониторы'],
        },
        {
          heading: 'О компании',
          links:   ['О нас', 'Карьера', 'Новости', 'Контакты'],
        },
        {
          heading: 'Поддержка',
          links:   ['Как купить', 'Доставка', 'Гарантия', 'Сервисные центры'],
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
      home:     'Bosh sahifa',
      laptops:  'Noutbuklar',
      cases:    'Korpuslar',
      monitors: 'Monitorlar',
      contact:  'Aloqa',
    },
    hero: {
      eyebrow:    'Premium Texnologiya',
      title1:     'Bikon.',
      title2:     'Kelajak uchun',
      title3:     'yaratilgan.',
      subtitle:   'Dünya standartlariga mos qurilmalar — unumdorlik va ilhom uchun mo\'ljallangan.',
      cta_primary:   'Batafsil',
      cta_secondary: 'Mahsulotlar',
      badge1: '12 oy kafolat',
      badge2: 'Bepul yetkazish',
      badge3: "O'zbekistonda #1",
    },
    categories: {
      eyebrow:    'Mahsulotlar',
      title_light: 'Kategoriyalarni ',
      title_bold:  'ko\'ring',
      learn_more:  'Ko\'proq',
      footer_note: 'Barcha mahsulotlar O\'zbekistonda yig\'ilgan · 12 oy rasmiy kafolat',
      items: [
        { series: 'SMARTBOOK SERIYASI', title: 'Noutbuklar'  },
        { series: 'MATRIX SERIYASI',    title: 'Monobloklar' },
        { series: 'VISION PRO SERIYASI',title: 'Monitorlar'  },
        { series: 'PHANTOM SERIYASI',   title: 'Korpuslar'   },
      ],
    },
    catalog: {
      eyebrow:     'Resurslar',
      title_light: 'Bizning ',
      title_bold:  '2026 katalogni yuklab oling',
      body:        'To\'liq Bikon mahsulot liniyasini ko\'ring — batafsil texnik xususiyatlar, narxlar va konfiguratsiya variantlari.',
      button:      'PDF yuklab olish',
    },
    trust: {
      eyebrow:    'Nima uchun biz',
      title_light: 'Nega ',
      title_bold:  'Bikon?',
      subtitle:   'Sifat va ishonch — bizning asosiy vazifamiz. Har bir qurilma ortida katta mehnat va innovatsiyalar yotadi.',
      features: [
        { title: 'Mahalliy yig\'ish va xizmat', desc: 'O\'zbekistonda mahalliy yig\'ilgan va xizmat ko\'rsatiladigan premium qurilmalar.' },
        { title: 'Optimal narx/sifat nisbati',  desc: 'Dunyo miqyosidagi xususiyatlar va raqobatbardosh narxlarning mukammal muvozanati.' },
        { title: 'Sertifikatlangan sifat nazorati', desc: 'Har bir qurilma jo\'natilishdan oldin qat\'iy tekshiruvdan o\'tadi.'          },
        { title: 'Sotuvdan keyingi yordamimiz',  desc: 'Mutaxassis jamoamiz har doim tayyor — xarid oldin va keyin.'                     },
      ],
    },
    products: {
      eyebrow:    'Katalog',
      buy_now:    'Sotib olish',
      learn_more: 'Batafsil',
    },
    cta: {
      badge:    'Eng ko\'p sotilgan',
      title1:   'Bizning',
      title2:   'bestsellerlari.',
      body:     'Minglab foydalanuvchilar Bikonni tanladi. O\'zbekiston uchun professional quvvat.',
      shop_now: 'Do\'konga o\'tish',
      view_all: 'Hammasini ko\'rish →',
    },
    footer: {
      tagline:   'O\'zbekistonda ishlab chiqarilgan premium texnologiyalar. Kelajakni birgalikda quramiz.',
      copyright: '© 2026 Bikon.uz. O\'zbekistonda yaratilgan.',
      cols: [
        {
          heading: 'Mahsulotlar',
          links:   ['Noutbuklar', 'Monobloklar', 'Shaxsiy kompyuterlar', 'Monitorlar'],
        },
        {
          heading: 'Bikon haqida',
          links:   ['Kompaniya', 'Karyera', 'Yangiliklar', 'Aloqa'],
        },
        {
          heading: 'Yordam',
          links:   ['Xarid qilish', 'Yetkazib berish', 'Kafolat', 'Servis markazlari'],
        },
      ],
      legal: ['Maxfiylik', 'Shartlar', 'Sayt xaritasi'],
    },
  },
} as const;

export default t;
