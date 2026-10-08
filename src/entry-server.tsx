import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { articleSlugs, articles } from './insights/articles';

export { articleSlugs, articles };

// Server-side entry used at build time to prerender the homepage and every
// insights article into static HTML. This lets search-engine crawlers and
// social preview bots (which do not run JavaScript) read the full content.
export function render(url: string): string {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </MemoryRouter>,
  );
}
