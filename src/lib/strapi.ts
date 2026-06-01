const BASE =
  (import.meta.env.VITE_STRAPI_URL as string | undefined) ?? 'http://localhost:1337';

/* ── Strapi v5 Blocks (rich-text) types ────────────────────────────────── */
export interface BlockText {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}
export interface BlockLink {
  type: 'link';
  url: string;
  children: BlockText[];
}
export type BlockInline = BlockText | BlockLink;

export interface BlockListItem {
  type: 'list-item';
  children: BlockInline[];
}
export type BlockNode =
  | { type: 'paragraph';  children: BlockInline[] }
  | { type: 'heading';    level: 1|2|3|4|5|6; children: BlockInline[] }
  | { type: 'list';       format: 'ordered'|'unordered'; children: BlockListItem[] }
  | { type: 'quote';      children: BlockInline[] }
  | { type: 'code';       language: string|null; children: [BlockText] }
  | { type: 'image';      image: { url: string; alternativeText: string|null }; children: [BlockText] };

/* ── Response shape from Strapi v5 ─────────────────────────────────────── */
export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'News' | 'Guide' | 'Tips' | 'Review';
  featured: boolean;
  read_time: number | null;
  cover: {
    url: string;
    alternativeText: string | null;
  } | null;
  content: BlockNode[] | null;
  publishedAt: string;
  createdAt: string;
}

/** Resolves a Strapi media URL to an absolute URL */
export function mediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.startsWith('http') ? url : `${BASE}${url}`;
}

/* ── Site Product (main page product sections) ──────────────────────────── */
export interface StrapiProduct {
  id: number;
  documentId: string;
  category_id: 'noutbuklar' | 'monobloklar' | 'cases' | 'monitorlar';
  sort_order: number;
  title: string;
  description: string;
  feature_1: string | null;
  feature_2: string | null;
  feature_3: string | null;
  feature_4: string | null;
  cover: { url: string; alternativeText: string | null } | null;
}

/** Fetch all published site-products for a given locale, sorted by sort_order */
export async function getProducts(locale: string): Promise<StrapiProduct[]> {
  const params = new URLSearchParams({
    populate: 'cover',
    'sort': 'sort_order:asc',
    locale,
    'pagination[pageSize]': '20',
  });

  const res = await fetch(`${BASE}/api/site-products?${params}`);
  if (!res.ok) throw new Error(`Strapi ${res.status}`);

  const json = await res.json() as { data?: StrapiProduct[] };
  return json.data ?? [];
}

/** Fetch a single article by slug (for direct URL access) */
export async function getArticleBySlug(slug: string, locale: string): Promise<StrapiArticle | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: 'cover',
    locale,
    'pagination[pageSize]': '1',
  });
  const res = await fetch(`${BASE}/api/articles?${params}`);
  if (!res.ok) throw new Error(`Strapi ${res.status}`);
  const json = await res.json() as { data?: StrapiArticle[] };
  return json.data?.[0] ?? null;
}

/** Fetch all published articles for a given locale, sorted newest first */
export async function getArticles(locale: string): Promise<StrapiArticle[]> {
  const params = new URLSearchParams({
    populate: 'cover',
    'sort': 'publishedAt:desc',
    locale,
    'pagination[pageSize]': '50',
  });

  const res = await fetch(`${BASE}/api/articles?${params}`);
  if (!res.ok) throw new Error(`Strapi ${res.status}`);

  const json = await res.json() as { data?: StrapiArticle[] };
  return json.data ?? [];
}

/* ── Product Page CMS types ─────────────────────────────────────────────── */
export type ProductPageSlug = 'monitors' | 'laptops' | 'aios' | 'nova' | 'matrix' | 'optima' | 'cases';

export interface CmsModelCard {
  id: number;
  name: string | null;
  tag: string | null;
  description: string | null;
  specs: string[] | null;
  badge: string | null;
  image: { url: string; alternativeText: string | null } | null;
  video: { url: string } | null;
}

export interface CmsSpecRow {
  id: number;
  col1: string | null;
  col2: string | null;
  col3: string | null;
}

export interface CmsSpecCategory {
  id: number;
  name: string | null;
  rows: CmsSpecRow[];
}

export interface ProductPageCms {
  id: number;
  documentId: string;
  slug: ProductPageSlug;
  hero_eyebrow: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_cta_primary: string | null;
  hero_cta_secondary: string | null;
  hero_image: { url: string; alternativeText: string | null } | null;
  lineup_eyebrow: string | null;
  lineup_title: string | null;
  models: CmsModelCard[];
  specs_eyebrow: string | null;
  specs_title: string | null;
  specs_label: string | null;
  spec_categories: CmsSpecCategory[];
}

/** Fetch CMS content for a product page by slug. Returns null if not found or on error. */
export async function getProductPage(slug: ProductPageSlug, locale: string): Promise<ProductPageCms | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[hero_image]': 'true',
    'populate[models][populate][0]': 'image',
    'populate[models][populate][1]': 'video',
    'populate[spec_categories][populate]': 'rows',
    locale,
    'pagination[pageSize]': '1',
  });
  try {
    const res = await fetch(`${BASE}/api/product-pages?${params}`);
    if (!res.ok) return null;
    const json = await res.json() as { data?: ProductPageCms[] };
    return json.data?.[0] ?? null;
  } catch {
    return null;
  }
}

/* ── About Page CMS types ───────────────────────────────────────────────── */
export interface AboutPageCms {
  hero_eyebrow: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  story_eyebrow: string | null;
  story_title: string | null;
  story_body: string | null;
  stats: { number: string; label: string }[] | null;
  values: { icon: string; title: string; body: string }[] | null;
  milestones: { year: string; title: string; desc: string }[] | null;
  final_quote: string | null;
  founder_image: { url: string; alternativeText: string | null } | null;
  founder_name: string | null;
  founder_title: string | null;
}

/** Fetch CMS content for the About page. Returns null if not published or on error. */
export async function getAboutPage(locale: string): Promise<AboutPageCms | null> {
  const params = new URLSearchParams({
    'populate': 'founder_image',
    locale,
  });
  try {
    const res = await fetch(`${BASE}/api/about-page?${params}`);
    if (!res.ok) return null;
    const json = await res.json() as { data?: AboutPageCms | null };
    return json.data ?? null;
  } catch {
    return null;
  }
}
