import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, RefreshCw, ArrowLeft, Clock, Calendar } from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import SplitHeading from './SplitHeading';
import { useLang } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import {
  getArticles, getArticleBySlug, mediaUrl,
  type StrapiArticle, type BlockNode, type BlockInline, type BlockText, type BlockLink,
} from '../lib/strapi';

/* ── Translations interface ─────────────────────────────────────────────── */
interface BlogTr {
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  all_label: string;
  read_more: string;
  min_read: string;
  featured_badge: string;
  categories: readonly string[];
}

/* ── Category enum keys (index aligns with tr.blog.categories) ──────────── */
const CAT_ENUM = ['', 'News', 'Guide', 'Tips', 'Review'] as const;

/* ── Category accent colours ────────────────────────────────────────────── */
const CAT_COLOR: Record<string, string> = {
  News:   '#0066CC',
  Guide:  '#7C3AED',
  Tips:   '#059669',
  Review: '#D97706',
};
function catColor(cat: string) { return CAT_COLOR[cat] ?? '#0066CC'; }

/* ── Date formatter ─────────────────────────────────────────────────────── */
function fmtDate(iso: string, lang: string): string {
  const locale = lang === 'ru' ? 'ru-RU' : lang === 'uz' ? 'uz-Latn-UZ' : 'en-US';
  return new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ─────────────────────────────────────────────────────────────────────────
   Custom hook — fetches articles from Strapi whenever lang changes
───────────────────────────────────────────────────────────────────────── */
function useArticles(lang: string) {
  const [articles, setArticles] = useState<StrapiArticle[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getArticles(lang)
      .then(data => { setArticles(data); setLoading(false); })
      .catch(e  => { setError(String(e)); setLoading(false); });
  };

  useEffect(() => { load(); }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return { articles, loading, error, retry: load };
}

/* ─────────────────────────────────────────────────────────────────────────
   SEO helper — sets <title> and <meta> tags dynamically
───────────────────────────────────────────────────────────────────────── */
function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function applyArticleSeo(article: StrapiArticle) {
  document.title = `${article.title} — Bikon Blog`;
  setMeta('description', article.excerpt);
  setMeta('og:title',       article.title,   true);
  setMeta('og:description', article.excerpt, true);
  setMeta('og:type',        'article',        true);
  setMeta('og:url',         `https://bikon.uz/blog/${article.slug}`, true);
  const img = mediaUrl(article.cover?.url);
  if (img) setMeta('og:image', img, true);
}

function resetSeo() {
  document.title = 'Bikon — Advanced Technology';
  setMeta('description', 'Bikon — O\'zbekiston bozorida ilg\'or kompyuter texnikasi ishlab chiqaruvchisi.');
  setMeta('og:type', 'website', true);
}

/* ─────────────────────────────────────────────────────────────────────────
   Root
───────────────────────────────────────────────────────────────────────── */
export default function BlogPage() {
  const { tr, lang } = useLang();
  const l = (tr as unknown as { blog: BlogTr }).blog;
  const { blogSlug, navigate } = useRouter();

  const [catIdx, setCatIdx]     = useState(0);
  const [selected, setSelected] = useState<StrapiArticle | null>(null);
  const { articles, loading, error, retry } = useArticles(lang);

  /* ── Sync URL slug → selected article ── */
  useEffect(() => {
    if (!blogSlug) {
      setSelected(null);
      resetSeo();
      return;
    }
    /* Try from already-loaded list first */
    const inList = articles.find(a => a.slug === blogSlug);
    if (inList) {
      setSelected(inList);
      applyArticleSeo(inList);
    } else if (!loading) {
      /* Direct URL access — fetch by slug */
      getArticleBySlug(blogSlug, lang)
        .then(a => {
          if (a) { setSelected(a); applyArticleSeo(a); }
        })
        .catch(() => {/* silently ignore */});
    }
  }, [blogSlug, articles, loading, lang]);

  /* ── Reset SEO on unmount ── */
  useEffect(() => () => { resetSeo(); }, []);

  const openArticle = (article: StrapiArticle) => {
    navigate(`/blog/${article.slug}`);
  };
  const closeArticle = () => {
    navigate('/blog');
  };

  const filtered = catIdx === 0
    ? articles
    : articles.filter(a => a.category === CAT_ENUM[catIdx]);

  const featured = articles.find(a => a.featured);
  const rest     = filtered.filter(a => !a.featured);
  const showFeatured = catIdx === 0 && !!featured;

  const sharedStyles = (
    <style>{`
      .blog-sel::selection   { background:#fff; color:#000; }
      .blog-sel *::selection { background:#fff; color:#000; }
      @keyframes float-b {
        0%,100% { transform:translateY(0);    opacity:.15; }
        50%      { transform:translateY(-12px); opacity:.38; }
      }
      @keyframes shimmer {
        0%   { background-position: -400px 0; }
        100% { background-position:  400px 0; }
      }
      .skeleton {
        background: linear-gradient(90deg,
          rgba(255,255,255,0.04) 0%,
          rgba(255,255,255,0.08) 50%,
          rgba(255,255,255,0.04) 100%);
        background-size: 400px 100%;
        animation: shimmer 1.4s ease-in-out infinite;
        border-radius: 10px;
      }
      .article-content a { color: #4da3ff; text-decoration: underline; }
      .article-content a:hover { color: #80bfff; }
      .article-content code { background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 5px; font-size: 0.9em; font-family: 'Space Grotesk', monospace; }
    `}</style>
  );

  /* ── Article detail view ── */
  if (selected) {
    return (
      <div className="bg-[#050505] min-h-screen blog-sel" style={{ overflowX: 'clip' }}>
        {sharedStyles}
        <Navbar />
        <ArticleView article={selected} l={l} lang={lang} onBack={closeArticle} />
        <Footer />
      </div>
    );
  }

  /* ── Blog listing ── */
  return (
    <div className="bg-[#050505] min-h-screen blog-sel" style={{ overflowX: 'clip' }}>
      {sharedStyles}
      <Navbar />
      <HeroSection l={l} catIdx={catIdx} setCatIdx={setCatIdx} />

      <main style={{ background: '#050505', paddingBottom: 120 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>

          {loading && <SkeletonGrid />}

          {!loading && error && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 14, marginBottom: 20 }}>
                Strapi server bilan bog'lanib bo'lmadi.
              </p>
              <button
                onClick={retry}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)',
                  padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                }}
              >
                <RefreshCw size={14} />
                Qayta urinish
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {showFeatured && (
                <FeaturedCard article={featured!} l={l} lang={lang} onClick={() => openArticle(featured!)} />
              )}

              {rest.length > 0 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={catIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                      gap: 20,
                      marginTop: showFeatured ? 20 : 0,
                    }}
                  >
                    {rest.map((article, i) => (
                      <PostCard
                        key={article.documentId}
                        article={article}
                        l={l}
                        lang={lang}
                        index={i}
                        onClick={() => openArticle(article)}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}

              {!showFeatured && rest.length === 0 && <EmptyState />}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ArticleView — full article detail page
───────────────────────────────────────────────────────────────────────── */
function ArticleView({
  article, l, lang, onBack,
}: {
  article: StrapiArticle;
  l: BlogTr;
  lang: string;
  onBack: () => void;
}) {
  const color  = catColor(article.category);
  const imgSrc = mediaUrl(article.cover?.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Hero banner ── */}
      <div style={{
        position: 'relative',
        background: '#000',
        paddingTop: 100,
        overflow: 'hidden',
        minHeight: imgSrc ? 480 : 280,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        {/* Cover image */}
        {imgSrc && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              src={imgSrc}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 70%, #050505 100%)',
            }} />
          </div>
        )}

        {/* Blue glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${color}18 0%, transparent 65%)`,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', width: '100%', padding: '0 24px 56px' }}>
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={onBack}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600,
              padding: '8px 16px', borderRadius: 10, cursor: 'pointer',
              marginBottom: 32, transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}
          >
            <ArrowLeft size={14} />
            Blog
          </motion.button>

          {/* Category + meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}
          >
            <span style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
              textTransform: 'uppercase' as const, color,
              background: `${color}20`, padding: '5px 12px', borderRadius: 8,
              border: `1px solid ${color}35`,
            }}>{article.category}</span>

            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>
              <Calendar size={12} style={{ opacity: 0.6 }} />
              {fmtDate(article.publishedAt, lang)}
            </span>

            {article.read_time && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 500 }}>
                <Clock size={12} style={{ opacity: 0.6 }} />
                {article.read_time} {l.min_read}
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(28px, 4.5vw, 54px)', fontWeight: 900,
              letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#fff', marginBottom: 20,
            }}
          >{article.title}</motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7, maxWidth: 620,
            }}
          >{article.excerpt}</motion.p>
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 80px' }}>
        {article.content && article.content.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="article-content"
          >
            <BlocksRenderer blocks={article.content} />
          </motion.div>
        ) : (
          /* No content yet — show only excerpt */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              textAlign: 'center', padding: '60px 0',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)', fontWeight: 500 }}>
              Maqola matni hali qo'shilmagan.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Blocks renderer — Strapi v5 rich-text
───────────────────────────────────────────────────────────────────────── */
function renderInline(node: BlockInline, key: number): React.ReactNode {
  if (node.type === 'link') {
    const linkNode = node as BlockLink;
    return (
      <a key={key} href={linkNode.url} target="_blank" rel="noopener noreferrer">
        {linkNode.children.map((c, i) => renderInline(c, i))}
      </a>
    );
  }
  const textNode = node as BlockText;
  let content: React.ReactNode = textNode.text;
  if (textNode.bold)          content = <strong key={key}>{content}</strong>;
  if (textNode.italic)        content = <em key={key}>{content}</em>;
  if (textNode.underline)     content = <u key={key}>{content}</u>;
  if (textNode.strikethrough) content = <s key={key}>{content}</s>;
  if (textNode.code)          content = <code key={key}>{content}</code>;
  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function BlocksRenderer({ blocks }: { blocks: BlockNode[] }) {
  const base: React.CSSProperties = {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 'clamp(15px, 1.5vw, 17px)',
    lineHeight: 1.8,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {blocks.map((block, bi) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={bi} style={{ ...base, margin: 0 }}>
                {block.children.map((c, i) => renderInline(c, i))}
              </p>
            );

          case 'heading': {
            const sizes: Record<number, string> = { 1: '2.2em', 2: '1.75em', 3: '1.4em', 4: '1.15em', 5: '1em', 6: '0.9em' };
            return React.createElement(
              `h${block.level}`,
              {
                key: bi,
                style: {
                  fontSize: sizes[block.level] ?? '1.2em',
                  fontWeight: 800, letterSpacing: '-0.03em',
                  color: '#fff', margin: '8px 0 0',
                  lineHeight: 1.25,
                },
              },
              block.children.map((c, i) => renderInline(c, i)),
            );
          }

          case 'list': {
            const Tag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
              <Tag key={bi} style={{
                ...base, margin: 0,
                paddingLeft: 28,
                display: 'flex', flexDirection: 'column', gap: 8,
                listStyleType: block.format === 'ordered' ? 'decimal' : 'disc',
              }}>
                {block.children.map((item, ii) => (
                  <li key={ii} style={{ paddingLeft: 4 }}>
                    {item.children.map((c, i) => renderInline(c, i))}
                  </li>
                ))}
              </Tag>
            );
          }

          case 'quote':
            return (
              <blockquote key={bi} style={{
                ...base,
                borderLeft: '3px solid #0066CC',
                paddingLeft: 20,
                margin: 0,
                color: 'rgba(255,255,255,0.5)',
                fontStyle: 'italic',
              }}>
                {block.children.map((c, i) => renderInline(c, i))}
              </blockquote>
            );

          case 'code':
            return (
              <pre key={bi} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '20px 24px',
                overflowX: 'auto', margin: 0,
                fontSize: 13, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: "'Space Grotesk', monospace",
              }}>
                <code>{block.children[0].text}</code>
              </pre>
            );

          case 'image': {
            const src = mediaUrl(block.image.url) ?? block.image.url;
            return (
              <figure key={bi} style={{ margin: 0 }}>
                <img
                  src={src}
                  alt={block.image.alternativeText ?? ''}
                  style={{
                    width: '100%', borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'block',
                  }}
                />
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HeroSection
───────────────────────────────────────────────────────────────────────── */
function HeroSection({
  l, catIdx, setCatIdx,
}: {
  l: BlogTr;
  catIdx: number;
  setCatIdx: (i: number) => void;
}) {
  return (
    <section style={{
      background: '#000',
      paddingTop: 120, paddingBottom: 64,
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,102,204,0.09) 0%, transparent 65%)',
      }} />
      {[
        { top: '20%', left: '7%',  size: 2, dur: '9s',   del: '0s'   },
        { top: '65%', left: '6%',  size: 3, dur: '11s',  del: '1.3s' },
        { top: '18%', left: '90%', size: 2, dur: '7.5s', del: '0.5s' },
        { top: '70%', left: '88%', size: 3, dur: '10s',  del: '2s'   },
      ].map((p, i) => (
        <div key={i} aria-hidden style={{
          position: 'absolute', top: p.top, left: p.left,
          width: p.size, height: p.size, borderRadius: '50%',
          background: '#0066CC', pointerEvents: 'none',
          animation: `float-b ${p.dur} ease-in-out ${p.del} infinite`,
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.22em',
            textTransform: 'uppercase' as const, color: '#0066CC',
            display: 'block', marginBottom: 20,
          }}
        >{l.hero_eyebrow}</motion.span>

        <SplitHeading
          text={l.hero_title}
          style={{
            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 900,
            letterSpacing: '-0.055em', lineHeight: 1.02,
            color: '#fff', marginBottom: 20,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 48,
          }}
        >{l.hero_subtitle}</motion.p>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {l.categories.map((cat, i) => {
            const isActive = i === catIdx;
            return (
              <motion.button
                key={i}
                onClick={() => setCatIdx(i)}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '8px 18px', borderRadius: 100,
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
                  cursor: 'pointer', border: 'none', outline: 'none',
                  background: isActive ? '#fff' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#000' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >{cat}</motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FeaturedCard
───────────────────────────────────────────────────────────────────────── */
function FeaturedCard({
  article, l, lang, onClick,
}: {
  article: StrapiArticle;
  l: BlogTr;
  lang: string;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const imgSrc = mediaUrl(article.cover?.url) ?? '/monoblock.png';
  const color  = catColor(article.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginTop: 48, borderRadius: 24,
        border: `1px solid ${hover ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
        background: hover
          ? 'linear-gradient(135deg,#0d0d12 0%,#0a0a10 100%)'
          : 'linear-gradient(135deg,#0a0a0d 0%,#080810 100%)',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.25s ease, background 0.25s ease',
      }}
    >
      {/* Cover image area */}
      <div style={{
        height: 280,
        background: 'linear-gradient(135deg,#0a0e1a 0%,#050810 50%,#080c16 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${color}22 0%, transparent 65%)`,
        }} />
        <motion.img
          src={imgSrc}
          alt={article.title}
          draggable={false}
          animate={{ scale: hover ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '88%', maxWidth: '80%', objectFit: 'contain',
            filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.8))',
            userSelect: 'none',
          }}
        />
        <div style={{
          position: 'absolute', top: 20, left: 20,
          background: '#0066CC', color: '#fff',
          fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          padding: '5px 12px', borderRadius: 8,
        }}>{l.featured_badge}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px 32px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase' as const, color,
          }}>{article.category}</span>
          <Dot />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>
            {fmtDate(article.publishedAt, lang)}
          </span>
          {article.read_time && (
            <>
              <Dot />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>
                {article.read_time} {l.min_read}
              </span>
            </>
          )}
        </div>

        <h2 style={{
          fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 800,
          letterSpacing: '-0.03em', lineHeight: 1.2,
          color: hover ? '#fff' : 'rgba(255,255,255,0.92)',
          marginBottom: 14, transition: 'color 0.2s ease',
        }}>{article.title}</h2>

        <p style={{
          fontSize: 15, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75,
          marginBottom: 24, maxWidth: 640,
        }}>{article.excerpt}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 13, fontWeight: 700,
            color: hover ? '#fff' : 'rgba(255,255,255,0.55)',
            transition: 'color 0.2s ease',
          }}>{l.read_more}</span>
          <motion.div animate={{ x: hover ? 4 : 0 }} transition={{ duration: 0.22 }}>
            <ArrowUpRight size={16} style={{ color: hover ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'color 0.2s ease' }} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PostCard
───────────────────────────────────────────────────────────────────────── */
function PostCard({
  article, l, lang, index, onClick,
}: {
  key?: React.Key;
  article: StrapiArticle;
  l: BlogTr;
  lang: string;
  index: number;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const color  = catColor(article.category);
  const imgSrc = mediaUrl(article.cover?.url) ?? '/monoblock.png';

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 20,
        border: `1px solid ${hover ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.07)'}`,
        background: hover
          ? 'linear-gradient(180deg,#0f0f14 0%,#0a0a0e 100%)'
          : 'linear-gradient(180deg,#0c0c10 0%,#090909 100%)',
        overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        display: 'flex', flexDirection: 'column' as const,
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
        opacity: hover ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }} />

      {/* Thumbnail */}
      {article.cover && (
        <div style={{ height: 160, overflow: 'hidden', background: '#0a0a0e' }}>
          <motion.img
            src={imgSrc}
            alt={article.title}
            draggable={false}
            animate={{ scale: hover ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* Card content */}
      <div style={{ padding: '24px 26px 26px', flex: 1, display: 'flex', flexDirection: 'column' as const }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase' as const, color,
            background: `${color}18`, padding: '4px 10px', borderRadius: 7,
            border: `1px solid ${color}30`,
          }}>{article.category}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontWeight: 500 }}>
            {fmtDate(article.publishedAt, lang)}
          </span>
        </div>

        <h3 style={{
          fontSize: 'clamp(16px, 1.7vw, 20px)', fontWeight: 800,
          letterSpacing: '-0.025em', lineHeight: 1.3,
          color: hover ? '#fff' : 'rgba(255,255,255,0.88)',
          marginBottom: 10, flex: 1,
          transition: 'color 0.2s ease',
        }}>{article.title}</h3>

        <p style={{
          fontSize: 14, color: 'rgba(255,255,255,0.32)', lineHeight: 1.7,
          marginBottom: 20,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
        }}>{article.excerpt}</p>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 14,
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 500 }}>
            {article.read_time ? `${article.read_time} ${l.min_read}` : ''}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: hover ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
              transition: 'color 0.2s ease',
            }}>{l.read_more}</span>
            <motion.div animate={{ x: hover ? 3 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowUpRight size={14} style={{ color: hover ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)', transition: 'color 0.2s ease' }} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Loading skeletons
───────────────────────────────────────────────────────────────────────── */
function SkeletonGrid() {
  return (
    <div style={{ marginTop: 48 }}>
      <div style={{
        borderRadius: 24, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#0a0a0d', marginBottom: 20,
      }}>
        <div className="skeleton" style={{ height: 280 }} />
        <div style={{ padding: '28px 32px 32px' }}>
          <div className="skeleton" style={{ height: 14, width: 180, marginBottom: 18 }} />
          <div className="skeleton" style={{ height: 32, width: '60%', marginBottom: 10 }} />
          <div className="skeleton" style={{ height: 32, width: '40%', marginBottom: 24 }} />
          <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 14, width: '65%', marginBottom: 24 }} />
          <div className="skeleton" style={{ height: 14, width: 100 }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            borderRadius: 20, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)', background: '#0c0c10',
          }}>
            <div style={{ padding: '24px 26px 26px' }}>
              <div className="skeleton" style={{ height: 24, width: 80, borderRadius: 7, marginBottom: 16 }} />
              <div className="skeleton" style={{ height: 20, width: '90%', marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 20 }} />
              <div className="skeleton" style={{ height: 13, width: '100%', marginBottom: 6 }} />
              <div className="skeleton" style={{ height: 13, width: '85%', marginBottom: 6 }} />
              <div className="skeleton" style={{ height: 13, width: '60%', marginBottom: 20 }} />
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 14 }} />
              <div className="skeleton" style={{ height: 12, width: 80 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Empty state
───────────────────────────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ textAlign: 'center', padding: '100px 0' }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: 18, margin: '0 auto 20px',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 28 }}>📝</span>
      </div>
      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.22)', fontWeight: 500 }}>
        Hali maqolalar yo'q
      </p>
    </motion.div>
  );
}

/* ── Dot separator ──────────────────────────────────────────────────────── */
function Dot() {
  return <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />;
}
