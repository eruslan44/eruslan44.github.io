import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist/client');
// GitHub Pages serves directories at /ru/ and /en/. Older .html URLs remain
// usable, but redirect to the canonical document instead of duplicating it.
for (const lang of ['ru', 'en']) {
  const directory = resolve(output, lang);
  const page = resolve(directory, 'index.html');
  await mkdir(directory, { recursive: true });
  try {
    await readFile(page);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await copyFile(resolve(output, `${lang}.html`), page);
  }
  const url = `https://eruslan44.github.io/${lang}/`;
  await writeFile(
    resolve(output, `${lang}.html`),
    `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${lang === 'ru' ? 'Руслан Егоров' : 'Ruslan Egorov'}</title><link rel="canonical" href="${url}"><meta http-equiv="refresh" content="0;url=/${lang}/"></head><body><a href="/${lang}/">${lang === 'ru' ? 'Перейти на сайт' : 'Visit the website'}</a></body></html>\n`,
  );
}
await copyFile(resolve('public/404.html'), resolve(output, '404.html'));
await rm(resolve(output, '.vite'), { recursive: true, force: true });
await rm(resolve(output, '.assetsignore'), { force: true });
await writeFile(resolve(output, '.nojekyll'), '');
console.log(
  'GitHub Pages output prepared: canonical /ru/ and /en/, legacy redirects, 404.',
);
