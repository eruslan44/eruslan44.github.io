import { content } from './content';
import type { Language } from './seo';

// Vinext beta.5 serializes generic Open Graph metadata, but omits these fields.
export function ProfileOpenGraph({ lang }: { lang: Language }) {
  return (
    <>
      <meta
        property="og:locale:alternate"
        content={lang === 'ru' ? 'en_US' : 'ru_RU'}
      />
      <meta property="profile:first_name" content={content[lang].firstName} />
      <meta property="profile:last_name" content={content[lang].lastName} />
    </>
  );
}
