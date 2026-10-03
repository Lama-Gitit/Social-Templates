// JSON-LD builders. One source per claim: the FAQPage for a route is built
// from the same array that renders the visible FAQ on that route, and the
// WebApplication numbers come from the platform data.

import { PLATFORMS } from './platforms';
import { HOME_FAQ, type HomeFaqItem } from './faq';
import { FORMAT_COUNT, HOME_META, PLATFORM_COUNT } from './copy';

const ORIGIN = 'https://socialframes.app';

type JsonLd = Record<string, unknown>;

function faqPage(items: HomeFaqItem[] | { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function webApplication(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Social Frames',
    url: `${ORIGIN}/`,
    description: `Social Frames is a free library of copy-ready SVG frames for ${PLATFORM_COUNT} social media platforms, covering ${FORMAT_COUNT} format sizes from Instagram Stories (1080 x 1920) to YouTube Thumbnails (3840 x 2160).`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      `Copy-ready SVG templates for ${PLATFORM_COUNT} platforms`,
      PLATFORMS.map((p) => p.name).join(', '),
      `${FORMAT_COUNT} social media format sizes`,
      'AI-powered template generator',
      'AI content assistant for social media captions',
    ],
  };
}

/**
 * The structured data for one route. Empty for anything that is not a known
 * page, so the 404 carries no schema.
 */
export function schemaForRoute(path: string): JsonLd[] {
  if (path === '/') {
    return [webApplication(), faqPage(HOME_FAQ)];
  }

  const platform = PLATFORMS.find((p) => `/${p.slug}` === path);
  if (platform) {
    return [faqPage(platform.faqs)];
  }

  return [];
}

/** Serialise for a <script type="application/ld+json"> block. */
export function renderSchemaBlocks(path: string): string {
  return schemaForRoute(path)
    .map(
      (block) =>
        `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`
    )
    .join('\n    ');
}

// Re-exported for the consistency check.
export { HOME_META };
