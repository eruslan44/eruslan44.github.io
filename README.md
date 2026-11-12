# Руслан Егоров — личный сайт

Двуязычный адаптивный сайт-визитка. React 19, TypeScript, Vinext и Vite; статическая сборка для GitHub Pages.

## Разработка

Node.js >= 22.13.0.

```sh
npm ci
npm run dev
```

Канонические страницы: `/ru/` и `/en/`. Корневая страница перенаправляет на `/ru/`.

`npm run dev` запускает сервер разработки с автоматическим обновлением при изменении исходников, включая `app/projects.ts`. Используйте адрес, который сервер напечатает в терминале.

Для проверки статической сборки локально:

```sh
npm run build
```

Готовые HTML, CSS и JavaScript находятся в `dist/client`. После редактирования исходников пересоберите сайт. GitHub Pages не запускает серверную часть Vinext.

```sh
npm run build
npm run lint
npx tsc --noEmit
```

## Публикация на GitHub Pages

Сайт публикуется по адресу `https://eruslan44.github.io/` из репозитория `eruslan44/eruslan44.github.io`. Один раз в настройках репозитория выберите **Settings → Pages → Build and deployment → Source → GitHub Actions**. Поле **Custom domain** оставьте пустым.

Workflow `.github/workflows/pages.yml` собирает сайт и публикует `dist/client` при каждом push в `master`. Для ручного запуска используйте **Actions → Publish GitHub Pages → Run workflow**. Workflow проверяет имя репозитория, сборку, SEO, линтинг и TypeScript перед публикацией. `npm run build` самостоятельно подготавливает файлы GitHub Pages: `ru/index.html`, `en/index.html`, перенаправления со старых `.html`-адресов, `404.html` и `.nojekyll` для обслуживания каталога `_next`. Локальная сборка и CI используют один процесс.

## SEO

Исходное состояние: контент уже отдавался в статическом HTML, были `lang`, адаптивная вёрстка, заголовки, description и базовые canonical/hreflang. Отсутствовали robots.txt, sitemap, социальные карточки, JSON-LD и проверка результата экспорта. Canonical и языковые ссылки использовали адреса без завершающего `/`, хотя GitHub Pages обслуживает языковые страницы из каталогов.

- `app/seo.ts` — единый источник метаданных RU/EN: title, description, абсолютные canonical, взаимные hreflang и `x-default`, Open Graph, Twitter Cards, robots и иконки.
- `app/seo-head.tsx` — поля Open Graph, которые пока не сериализует Vinext beta.5: альтернативная локаль и имя владельца профиля.
- JSON-LD `WebSite`, `Person`, `ProfilePage` связывает обе версии с одним человеком. Факты взяты из видимого контента; рейтинги, отзывы и другие неподтверждённые сведения не добавляются.
- `public/sitemap.xml` включает только две канонические страницы и их языковые альтернативы. `lastmod` намеренно отсутствует: дата сборки не равна дате изменения контента.
- `public/robots.txt` разрешает обход страниц и ресурсов, указывает sitemap. Страница ошибки `404.html` запрещает индексацию; GitHub Pages возвращает для отсутствующих адресов HTTP 404.
- `public/social/` — локализованные PNG 1200×630 и редактируемые исходники SVG. После изменения SVG обновите соответствующий PNG. Поисковые и социальные роботы получают метаданные и контент без выполнения JavaScript.
- `scripts/prepare-pages.mjs` — подготовка канонических каталогов и совместимых перенаправлений. Корень и старые `.html` используют мгновенный meta refresh с canonical и обычной ссылкой: GitHub Pages не позволяет настроить собственный серверный 301. `trailingSlash: true` не используется из-за ошибки предварительного рендеринга в Vinext beta.5.
- `npm run check:seo` проверяет готовый `dist/client`: метаданные в `<head>`, canonical/hreflang, sitemap, robots, JSON-LD, размеры PNG, наличие текста без JS, единственный H1, внутренние ссылки, ресурсы, перенаправления и страницу 404. Проверка также запускается автоматически в конце сборки.

После публикации добавьте сайт в Google Search Console и Яндекс Вебмастер от аккаунта владельца и отправьте `https://eruslan44.github.io/sitemap.xml`. Проверку владения нужно выполнить выданным сервисом HTML-файлом или метатегом; токены в проект не добавлены. Затем проверьте `/ru/` и `/en/` через URL Inspection / проверку URL, а разметку — через [Rich Results Test](https://search.google.com/test/rich-results). Core Web Vitals проверяйте на опубликованном сайте через PageSpeed Insights и полевые данные Search Console: локальная сборка не показывает реальные LCP, INP и CLS посетителей.

Основа реализации: рекомендации Google по [языковым версиям](https://developers.google.com/search/docs/specialty/international/localized-versions), [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page) и [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Индексация и расширенное отображение зависят от поисковой системы и не гарантируются наличием разметки.

## Контент

- `app/content.ts` — тексты обеих языковых версий и опыт работы.
- `app/work-projects.ts` — рабочие проекты из CV: описание, результаты и стек на двух языках.
- `app/projects.ts` — личные проекты; для проекта без публичной ссылки поле `url` необязательно.
- `app/profile.tsx` — структура, контакты и подключение SEO.
- `app/globals.css` — палитра, адаптивная сетка и стили.

Информация о роли, опыте, навыках и рабочих проектах обновлена по CV от 28 сентября 2026 года. Биография дополнена по сообщению владельца. Источник фактов о Пыщуге: https://www.culture.ru/events/2940315/simvol-pyshugskogo-kraya (краеведческий музей «Пыщуганье»). Ссылка также размещена на сайте. Телефон, фотография и исходный PDF в публичную папку не копируются.

Сгенерированный сторонний каталог `components/ui` и его `hooks/use-mobile.ts` исключены из линтинга: они содержат исходные диагностические ошибки шаблона и в текущем интерфейсе не используются. TypeScript проверяет весь проект.
