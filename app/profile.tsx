import { notFound } from 'next/navigation';
import { ExternalLink, Send } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import type { Metadata } from 'next';
import { content } from './content';
import { projects } from './projects';
import { workProjects } from './work-projects';

export function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'en' }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === 'en';
  return {
    icons: {
      icon: { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    },
    title: en
      ? 'Ruslan Egorov — Lead Frontend Developer'
      : 'Руслан Егоров — ведущий frontend-разработчик',
    description: en
      ? 'Lead Frontend Developer. Angular, TypeScript, enterprise web systems and mobile apps. Based in Krasnodar.'
      : 'Ведущий frontend-разработчик. Angular, TypeScript, корпоративные веб-системы и мобильные приложения. Краснодар.',
    alternates: {
      canonical: `/${en ? 'en' : 'ru'}`,
      languages: { ru: '/ru', en: '/en' },
    },
    metadataBase: new URL('https://eruslan44.github.io'),
  };
}
const skills = [
  'Angular',
  'TypeScript',
  'PrimeNG',
  'Taiga UI',
  'DevExtreme',
  'OpenAPI',
  'OData',
  'WebSockets',
  'Cordova',
  'Firebase',
  'GitLab CI/CD',
  'Figma',
  'Localization',
  'AI Agents',
];
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'ru' && lang !== 'en') notFound();
  const t = content[lang];
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="header">
        <div className="wrap header-inner">
          <a href={`/${lang}`} className="logo" aria-label={t.name}>
            re<span>.</span>
          </a>
          <nav className="navigation" aria-label={t.navLabel}>
            {t.nav.map((n, i) => (
              <a
                key={n}
                href={`#${['approach', 'experience', 'projects', 'about'][i]}`}
              >
                {n}
              </a>
            ))}
          </nav>
          {/* Separate language documents need native navigation to replace the root layout. */}
          <nav className="language" aria-label={t.language}>
            {/* oxlint-disable-next-line next/no-html-link-for-pages -- Load the complete Russian document. */}
            <a
              href="/ru"
              lang="ru"
              hrefLang="ru"
              className={lang === 'ru' ? 'active' : ''}
              aria-current={lang === 'ru' ? 'page' : undefined}
            >
              RU
            </a>
            {/* oxlint-disable-next-line next/no-html-link-for-pages -- Load the complete English document. */}
            <a
              href="/en"
              lang="en"
              hrefLang="en"
              className={lang === 'en' ? 'active' : ''}
              aria-current={lang === 'en' ? 'page' : undefined}
            >
              EN
            </a>
          </nav>
        </div>
      </header>
      <main id="main" className="wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div className="eyebrow">
            <span className="dot" />
            {t.location}
          </div>
          <div className="hero-grid">
            <div>
              <h1 id="hero-title">
                {t.firstName}
                <span>
                  {t.lastName}
                  <span style={{ display: 'inline', color: '#edf2ee' }}>.</span>
                </span>
              </h1>
              <p className="intro">
                <strong style={{ color: '#edf2ee', fontWeight: 500 }}>
                  {t.role}
                </strong>
                <br />
                {t.intro}
              </p>
              <div className="actions">
                <a
                  href="https://t.me/erus44"
                  className="button"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.write}
                  <Send
                    size={18}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="link-icon"
                  />
                </a>
                <a href="#experience" className="text-link">
                  {t.seeExperience}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <div className="code-card" aria-label={t.profile}>
              <div className="code-top">
                <i />
                <i />
                <i />
                <span>developer.ts</span>
              </div>
              <div className="code-body">
                {[
                  <>
                    <span className="code-muted">const</span> developer = {'{'}
                  </>,
                  <>
                    {' '}
                    name:{' '}
                    <span className="code-green">
                      &apos;Ruslan Egorov&apos;
                    </span>
                    ,
                  </>,
                  <>
                    {' '}
                    focus:{' '}
                    <span className="code-green">
                      &apos;Frontend&apos;
                    </span>
                    ,
                  </>,
                  <>
                    {' '}
                    stack: [
                    <span className="code-green">&apos;Angular&apos;</span>,
                    <span className="code-green">&apos;TypeScript&apos;</span>
                    ],
                  </>,
                  <>
                    {' '}
                    workflow:{' '}
                    <span className="code-green">&apos;Code + AI&apos;</span>,
                  </>,
                  <>
                    {' '}
                    remote: <span className="code-green">true</span>,
                  </>,
                  <>
                    {' '}
                    basedIn:{' '}
                    <span className="code-green">&apos;Krasnodar&apos;</span>
                  </>,
                  <>{'};'}</>,
                ].map((line, i) => (
                  <div className="code-line" key={i}>
                    <span className="line-number" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="code-foot">
                <span>
                  <span className="dot" /> {t.codeFoot}
                </span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>
          <div className="stats">
            {t.stats.map(([value, label]) => (
              <div className="stat" key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="section" id="approach">
          <div className="section-head">
            <span className="section-label">01 / {t.nav[0]}</span>
            <h2>{t.approachTitle}</h2>
          </div>
          <div className="principles">
            {t.principles.map(([title, description], i) => (
              <article className="principle" key={title}>
                <span className="index">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="stack" aria-label={t.stackLabel}>
            {skills.map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </section>
        <section className="section" id="experience">
          <div className="section-head">
            <span className="section-label">02 / {t.nav[1]}</span>
            <h2>{t.experienceTitle}</h2>
          </div>
          <div className="timeline">
            {t.jobs.map(([date, company, role, description], i) => (
              <article className="job" key={company}>
                <span className={`job-date ${i === 0 ? 'current' : ''}`}>
                  {date}
                </span>
                <div>
                  <h3>{company}</h3>
                  <p className="job-role">{role}</p>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section" id="projects">
          <div className="section-head">
            <span className="section-label">03 / {t.nav[2]}</span>
            <h2>{t.projectsTitle}</h2>
          </div>
          <div className="project-group">
            <p className="project-group-label">{t.workProjectsHeading}</p>
            <div className="work-projects-grid">
              {workProjects.map((project) => (
                <article className="work-project" key={project.name}>
                  <span className="work-project-category">
                    {project.category[lang]}
                  </span>
                  <h3>{project.name}</h3>
                  <p>{project.description[lang]}</p>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight.en}>{highlight[lang]}</li>
                    ))}
                  </ul>
                  <div className="work-project-stack">
                    {project.stack.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a
                      className="work-project-link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.viewProject}
                      <ExternalLink
                        size={16}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
          <div className="project-group">
            <p className="project-group-label">{t.personalProjectsHeading}</p>
            <div className="projects-list">
              {projects.map((project, index) => {
                const body = (
                  <div>
                    <h3 id={`project-title-${index}`}>
                      {project.title[lang]}{' '}
                      {project.url && (
                        <ExternalLink
                          size={17}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="link-icon"
                        />
                      )}
                    </h3>
                    <p>{project.description[lang]}</p>
                  </div>
                );
                return project.url ? (
                  <a
                    className="projects-panel project-link"
                    key={project.title.en}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-labelledby={`project-title-${index}`}
                  >
                    {body}
                  </a>
                ) : (
                  <article className="projects-panel" key={project.title.en}>
                    {body}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section" id="about">
          <div className="section-head">
            <span className="section-label">04 / {t.nav[3]}</span>
            <h2>{t.aboutTitle}</h2>
          </div>
          <div className="personal-grid">
            <div className="story">
              <div className="route">
                {t.cities.map((city, i) => (
                  <Fragment key={i}>
                    {i > 0 && <b> → </b>}
                    <span>{city}</span>
                  </Fragment>
                ))}
              </div>
              <p>{t.story}</p>
              <div className="personal-note">
                <h3>{t.educationTitle}</h3>
                <p>{t.education}</p>
              </div>
              <div className="personal-note">
                <h3>{t.footballTitle}</h3>
                <p>{t.football}</p>
              </div>
              <div className="personal-note">
                <h3>{t.familyTitle}</h3>
                <p>{t.family}</p>
              </div>
            </div>
            <aside className="place">
              <div className="place-overline">
                <span>{t.roots}</span>
                <span>1616</span>
              </div>
              <h3>
                {t.cities[0]}
                <span style={{ color: 'var(--primary)' }}>.</span>
              </h3>
              <p className="place-intro">{t.placeIntro}</p>
              <div className="facts">
                {t.facts.map(([title, body]) => (
                  <div className="fact" key={title}>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
              <a
                className="source"
                href="https://www.culture.ru/events/2940315/simvol-pyshugskogo-kraya"
                target="_blank"
                rel="noreferrer"
              >
                {t.source}{' '}
                <ExternalLink
                  size={14}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="link-icon"
                />
              </a>
            </aside>
          </div>
        </section>
        <section className="contact" id="contact">
          <span className="section-label">05 / {t.contactLabel}</span>
          <div className="contact-inner">
            <div>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactBody}</p>
              <a
                href="https://t.me/erus44"
                className="button"
                target="_blank"
                rel="noreferrer"
              >
                {t.telegram}
                <Send
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="link-icon"
                />
              </a>
            </div>
            <div className="contacts">
              <a className="email text-link" href="mailto:erus44@ya.ru">
                erus44@ya.ru
              </a>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/erus44"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className="muted">{t.location}</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>
            © {new Date().getFullYear()} {t.name}
          </span>
          <span>{t.footer}</span>
          <a href="#main" className="text-link">
            {t.top} ↑
          </a>
        </div>
      </footer>
    </>
  );
}
