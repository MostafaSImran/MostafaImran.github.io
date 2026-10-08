import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';

// Server-side entry used at build time to prerender the homepage into
// static HTML. This lets search-engine crawlers and social preview bots
// (which do not run JavaScript) see the full page content, metadata and
// structured sections instead of an empty <div id="root">.
export function render(url: string): string {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
}
