import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { getProductPage, getAboutPage, type ProductPageCms, type ProductPageSlug, type AboutPageCms } from './strapi';

export function useProductPageCms(slug: ProductPageSlug): ProductPageCms | null {
  const { lang } = useLang();
  const [cms, setCms] = useState<ProductPageCms | null>(null);

  useEffect(() => {
    getProductPage(slug, lang).then(setCms).catch(() => setCms(null));
  }, [slug, lang]);

  return cms;
}

export function useAboutPageCms(): AboutPageCms | null {
  const { lang } = useLang();
  const [cms, setCms] = useState<AboutPageCms | null>(null);

  useEffect(() => {
    getAboutPage(lang).then(setCms).catch(() => setCms(null));
  }, [lang]);

  return cms;
}

/** Convert CMS spec_categories → SpecsSection `categories` format */
export function cmsToSpecCategories(
  cms: ProductPageCms | null,
): { name: string; rows: readonly (readonly string[])[] }[] | null {
  if (!cms?.spec_categories?.length) return null;
  return cms.spec_categories.map((cat) => ({
    name: cat.name ?? '',
    rows: cat.rows.map((row) =>
      [row.col1, row.col2, row.col3].filter((c): c is string => Boolean(c)),
    ),
  }));
}
