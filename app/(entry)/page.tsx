export const dynamic = 'force-static';

export default function Home() {
  return (
    <main>
      <meta httpEquiv="refresh" content="0;url=/ru/" />
      {/* Keep a plain link as a fallback when the browser does not follow the refresh. */}
      {/* oxlint-disable-next-line next/no-html-link-for-pages */}
      <a href="/ru/">Русская версия сайта</a>
    </main>
  );
}
