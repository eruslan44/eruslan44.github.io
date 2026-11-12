import '../globals.css';
import { ProfileOpenGraph } from '../seo-head';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <ProfileOpenGraph lang="ru" />
      </head>
      <body>{children}</body>
    </html>
  );
}
