import type { Metadata } from 'next';
import { content } from './content';

export const siteUrl = 'https://eruslan44.github.io';
export const languages = ['ru', 'en'] as const;
export type Language = (typeof languages)[number];
export const languageUrls = {
  ru: `${siteUrl}/ru/`,
  en: `${siteUrl}/en/`,
  'x-default': `${siteUrl}/ru/`,
};

export function profileMetadata(lang: Language): Metadata {
  const title =
    lang === 'en'
      ? 'Ruslan Egorov — Lead Frontend Developer'
      : 'Руслан Егоров — ведущий frontend-разработчик';
  const description =
    lang === 'en'
      ? 'Lead Frontend Developer with 7+ years of frontend experience. Angular, TypeScript, enterprise web systems and mobile apps. Krasnodar, remote work.'
      : 'Руслан Егоров — ведущий frontend-разработчик: 7+ лет во frontend, Angular, TypeScript, корпоративные веб-системы и мобильные приложения. Краснодар, удалённо.';
  const image = {
    url: `${siteUrl}/social/profile-${lang}.png`,
    width: 1200,
    height: 630,
    alt: `${content[lang].name} — Lead Frontend Developer · Angular / TypeScript`,
  };
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: content[lang].name,
    authors: [{ name: content[lang].name, url: languageUrls[lang] }],
    creator: content[lang].name,
    alternates: { canonical: languageUrls[lang], languages: languageUrls },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'profile',
      url: languageUrls[lang],
      title,
      description,
      siteName: content[lang].name,
      locale: lang === 'en' ? 'en_US' : 'ru_RU',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
        { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      ],
      apple: {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    },
  };
}

export function profileStructuredData(
  lang: Language,
  skills: readonly string[],
) {
  const t = content[lang];
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${siteUrl}/`,
        name: 'Руслан Егоров / Ruslan Egorov',
        inLanguage: languages,
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: t.name,
        alternateName: lang === 'en' ? content.ru.name : content.en.name,
        url: languageUrls[lang],
        jobTitle: 'Lead Frontend Developer',
        description: t.intro,
        homeLocation: {
          '@type': 'Place',
          name: lang === 'en' ? 'Krasnodar' : 'Краснодар',
        },
        knowsAbout: skills,
        sameAs: ['https://t.me/erus44', 'https://www.linkedin.com/in/erus44'],
        mainEntityOfPage: { '@id': `${languageUrls[lang]}#profile` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${languageUrls[lang]}#profile`,
        url: languageUrls[lang],
        name: `${t.name} — Lead Frontend Developer`,
        description: t.intro,
        inLanguage: lang,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
      },
    ],
  };
}
