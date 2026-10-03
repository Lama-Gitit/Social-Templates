// Copy that contains counts, derived from the platform data so the numbers can
// not go stale. Used by the app (usePageMeta) and the prerender, which must
// agree on the homepage head.

import { PLATFORMS } from './platforms';

export const PLATFORM_COUNT = PLATFORMS.length;

export const FORMAT_COUNT = PLATFORMS.reduce(
  (total, platform) => total + platform.templates.length,
  0
);

export const HOME_META = {
  title: 'Social Frames | Free SVG Templates for Every Social Media Platform',
  description: `Free copy-ready SVG templates for ${PLATFORM_COUNT} social platforms. Perfectly sized frames for Instagram Stories, YouTube Thumbnails, LinkedIn Banners, TikTok and ${FORMAT_COUNT} formats.`,
};

/**
 * Rows for the "Full Size Guide" table on the homepage. Built from the same
 * data as everything else, so a format can never be listed here after being
 * renamed or removed. One row per format, grouped by platform.
 */
export type SizeGuideRow = {
  platform: string;
  slug: string;
  format: string;
  dimensions: string;
  ratio: string;
};

function ratioLabel(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const d = gcd(width, height);
  const w = width / d;
  const h = height / d;
  // Only show a clean integer ratio; otherwise fall back to a decimal like 1.91:1
  if (w < 40 && h < 40) return `${w}:${h}`;
  return `${(width / height).toFixed(2)}:1`;
}

export const SIZE_GUIDE: SizeGuideRow[] = PLATFORMS.flatMap((platform) =>
  platform.templates.map((template) => ({
    platform: platform.name,
    slug: platform.slug,
    format: template.label,
    dimensions: `${template.width} \u00d7 ${template.height}`,
    ratio: ratioLabel(template.width, template.height),
  }))
);
