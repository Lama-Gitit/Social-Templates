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
