import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
}

const DEFAULT_TITLE = "Bikon — O'zbekiston kompyuter texnikasi ishlab chiqaruvchisi";
const DEFAULT_DESC  = "2015-yildan Toshkentda ishlab chiqarilayotgan hamyonbop kompyuter texnikasi — noutbuklar, monobloklar, monitorlar va PC korpuslar.";
const DEFAULT_IMAGE = 'https://bikon.uz/og-image.png';

function setMeta(nameOrProp: string, content: string, isProp = false) {
  const attr = isProp ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, nameOrProp);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSeo({ title, description, url, image, type = 'website' }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    if (url)   { setMeta('og:url', url, true); setLink('canonical', url); }
    if (image) { setMeta('og:image', image, true); }

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('description', DEFAULT_DESC);
      setMeta('og:title', DEFAULT_TITLE, true);
      setMeta('og:description', DEFAULT_DESC, true);
      setMeta('og:type', 'website', true);
      setMeta('og:image', DEFAULT_IMAGE, true);
    };
  }, [title, description, url, image, type]);
}
