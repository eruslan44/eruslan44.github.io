import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist/client');
const origin = 'https://eruslan44.github.io';
const read = (path) => readFile(resolve(output, path), 'utf8');
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map((m) => [
      m[1].toLowerCase(),
      m[2],
    ]),
  );
const tags = (html, tag) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(([tag]) =>
    attrs(tag),
  );
const languages = {
  ru: `${origin}/ru/`,
  en: `${origin}/en/`,
  'x-default': `${origin}/ru/`,
};
const sitemap = await read('sitemap.xml');
const robots = await read('robots.txt');
assert.match(robots, /User-agent: \*\s+Allow: \/\s/);
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(
  !/Disallow:\s*\//i.test(robots),
  'Do not block crawling or rendering assets',
);
assert.ok(
  sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
);
assert.ok(sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'));
assert.deepEqual(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => m[1])
    .sort((a, b) => a.localeCompare(b)),
  [languages.en, languages.ru],
);
assert.ok(
  !sitemap.includes('<lastmod>'),
  'Do not invent modification dates on every build',
);

for (const lang of ['ru', 'en']) {
  const html = await read(`${lang}/index.html`);
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert.ok(head, `${lang}: metadata must be in the initial HTML head`);
  assert.equal(tags(html, 'html')[0].lang, lang);
  assert.equal([...head.matchAll(/<title>/g)].length, 1);
  assert.match(
    head,
    new RegExp(lang === 'ru' ? 'Руслан Егоров' : 'Ruslan Egorov'),
  );
  const meta = tags(head, 'meta');
  assert.ok(!meta.some((m) => m['http-equiv']?.toLowerCase() === 'refresh'));
  const value = (key) =>
    meta.find((m) => (m.name || m.property) === key)?.content;
  const links = tags(head, 'link');
  assert.deepEqual(
    links.filter((link) => link.rel === 'canonical').map((link) => link.href),
    [languages[lang]],
  );
  assert.ok(value('description')?.length >= 100);
  assert.match(value('viewport'), /width=device-width/);
  assert.match(value('robots'), /index,\s*follow/);
  assert.ok(!/noindex/i.test(value('robots')));
  assert.match(value('googlebot'), /max-image-preview:large/);
  assert.equal(value('og:url'), languages[lang]);
  assert.equal(value('og:type'), 'profile');
  assert.equal(value('og:locale'), lang === 'ru' ? 'ru_RU' : 'en_US');
  assert.equal(value('og:locale:alternate'), lang === 'ru' ? 'en_US' : 'ru_RU');
  assert.ok(value('profile:first_name'));
  assert.ok(value('profile:last_name'));
  assert.equal(value('og:image:width'), '1200');
  assert.equal(value('og:image:height'), '630');
  assert.ok(value('og:image:alt'));
  assert.equal(value('twitter:card'), 'summary_large_image');
  assert.equal(value('twitter:image'), value('og:image'));
  for (const key of [
    'og:title',
    'og:description',
    'twitter:title',
    'twitter:description',
  ])
    assert.ok(value(key), `${lang}: ${key}`);
  for (const [code, url] of Object.entries(languages)) {
    assert.deepEqual(
      links
        .filter((l) => l.rel === 'alternate' && l.hreflang === code)
        .map((l) => l.href),
      [url],
    );
    for (const block of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      assert.ok(
        tags(block[1], 'xhtml:link').some(
          (l) => l.hreflang === code && l.href === url,
        ),
      );
    }
  }
  for (const key of ['og:image', 'twitter:image']) {
    const url = new URL(value(key));
    assert.equal(url.origin, origin);
    const png = await readFile(resolve(output, `.${url.pathname}`));
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok(
    [...html.matchAll(/<h2\b/g)].length >= 5,
    'Content must be present without JavaScript',
  );
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  const schemas = scripts
    .filter((m) => attrs(m[1]).type === 'application/ld+json')
    .map((m) => JSON.parse(m[2]));
  assert.equal(schemas.length, 1);
  const data = schemas[0];
  assert.equal(data['@context'], 'https://schema.org');
  const person = data['@graph'].find((item) => item['@type'] === 'Person');
  const page = data['@graph'].find((item) => item['@type'] === 'ProfilePage');
  assert.ok(person.name && person.knowsAbout.includes('Angular'));
  assert.equal(page.url, languages[lang]);
  assert.equal(page.inLanguage, lang);
  assert.equal(page.mainEntity['@id'], person['@id']);
  // Check native links, fragments and all referenced local assets in the export.
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const link of tags(html, 'a')) {
    if (link.href?.startsWith('#'))
      assert.ok(ids.has(link.href.slice(1)), `Missing anchor ${link.href}`);
    if (link.hreflang) assert.equal(link.href, `/${link.hreflang}/`);
  }
  for (const tag of [...links, ...tags(html, 'script'), ...tags(html, 'a')]) {
    const path = tag.src || tag.href;
    if (path?.startsWith('/') && !path.startsWith('//')) {
      const file = path.endsWith('/')
        ? `${path}index.html`
        : path.split('?')[0];
      assert.ok(
        (await stat(resolve(output, `.${file}`))).isFile(),
        `Missing ${file}`,
      );
    }
  }
  console.log(
    `SEO OK: /${lang}/ — head, hreflang, social images, JSON-LD, content, assets and links`,
  );
}
for (const [path, lang] of [
  ['index.html', 'ru'],
  ['ru.html', 'ru'],
  ['en.html', 'en'],
]) {
  const html = await read(path);
  assert.ok(
    tags(html, 'meta').some(
      (m) =>
        m['http-equiv']?.toLowerCase() === 'refresh' &&
        m.content === `0;url=/${lang}/`,
    ),
  );
  assert.ok(
    tags(html, 'link').some(
      (l) => l.rel === 'canonical' && l.href === languages[lang],
    ),
  );
}
assert.ok(
  tags(await read('404.html'), 'meta').some(
    (m) => m.name === 'robots' && m.content.includes('noindex'),
  ),
);
await stat(resolve(output, '.nojekyll'));
console.log(
  'SEO OK: sitemap, robots.txt, redirects, noindex 404 and GitHub Pages files',
);
