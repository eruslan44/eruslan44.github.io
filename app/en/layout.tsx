import '../globals.css';
import { ProfileOpenGraph } from '../seo-head';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ProfileOpenGraph lang="en" />
      </head>
      <body>{children}</body>
    </html>
  );
}
