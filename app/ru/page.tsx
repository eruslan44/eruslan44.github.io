import Profile, { generateMetadata as profileMetadata } from '../profile';

export const dynamic = 'force-static';

export function generateMetadata() {
  return profileMetadata({ params: Promise.resolve({ lang: 'ru' }) });
}
export default function Page() {
  return Profile({ params: Promise.resolve({ lang: 'ru' }) });
}
