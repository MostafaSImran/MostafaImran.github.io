// Prerender the React app into static HTML at build time.
// Runs after the client build (`vite build`) and the SSR bundle build
// (`vite build --ssr`). Injects server-rendered HTML into <div id="root">
// for the homepage and every insights article, so crawlers see full content.
// Also generates dist/sitemap.xml covering all prerendered pages.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const { render, articles } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const SITE = 'https://mostafasimran.com';
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error('Could not find <div id="root"></div> placeholder in dist/index.html');
}

const inject = (tpl, html) => tpl.replace(placeholder, `<div id="root">${html}</div>`);

// --- Homepage ---
const homeHtml = render('/');
if (!homeHtml || homeHtml.length < 1000) {
  throw new Error(`Prerender produced suspiciously little HTML (${homeHtml?.length ?? 0} chars)`);
}
writeFileSync(path.join(distDir, 'index.html'), inject(template, homeHtml));
console.log(`Homepage: prerendered ${homeHtml.length} chars into dist/index.html`);

// --- Insight articles ---
// Asset URLs in the template are relative ("./assets/...") — rewrite them to
// absolute for pages served from /insights/<slug>/ so scripts and CSS resolve.
const articleTemplate = template.replaceAll('"./assets/', '"/assets/');

for (const article of articles) {
  const html = render(`/insights/${article.slug}`);
  if (!html || html.length < 1000) {
    throw new Error(`Article ${article.slug} rendered only ${html?.length ?? 0} chars`);
  }

  let page = inject(articleTemplate, html)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeXml(article.metaTitle)}</title>`)
    .replace(
      /(name="description"[^>]*content=")[^"]*(")/s,
      `$1${escapeXml(article.metaDescription)}$2`,
    )
    .replace(
      /(property="og:title"[^>]*content=")[^"]*(")/s,
      `$1${escapeXml(article.title)}$2`,
    )
    .replace(
      /(property="og:description"[^>]*content=")[^"]*(")/s,
      `$1${escapeXml(article.excerpt)}$2`,
    )
    .replace(
      /(property="og:url"[^>]*content=")[^"]*(")/s,
      `$1${SITE}/insights/${article.slug}/$2`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${SITE}/insights/${article.slug}/" />`,
    );

  const dir = path.join(distDir, 'insights', article.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), page);
  console.log(`Article:  ${article.slug} (${html.length} chars)`);
}

// --- Sitemap ---
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, lastmod: today, priority: '1.0' },
  ...articles.map((a) => ({
    loc: `${SITE}/insights/${a.slug}/`,
    lastmod: a.date,
    priority: '0.8',
  })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`Sitemap:  ${urls.length} URLs written to dist/sitemap.xml`);

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
