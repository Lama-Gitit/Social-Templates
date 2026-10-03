// Single source for the homepage FAQ. Both the visible list in App.tsx and the
// FAQPage JSON-LD that the prerender injects are built from this array, so the
// markup and the page can no longer drift apart (audit finding O4).

export type HomeFaqItem = {
  q: string;
  a: string;
  link?: string;
};

export const HOME_FAQ: HomeFaqItem[] = [
  {
    q: 'What size is an Instagram Story?',
    a: 'Instagram Stories are 1080 x 1920 pixels with a 9:16 aspect ratio. This same vertical format is used for Instagram Reels and other full-screen mobile content.',
    link: '/instagram-templates',
  },
  {
    q: 'What size is a YouTube Thumbnail?',
    a: 'YouTube recommends 3840 x 2160 pixels (4K, 16:9) for thumbnails. 1280 x 720 pixels is the accepted minimum and still looks clean on phones, but 4K holds up on smart TVs and large displays.',
    link: '/youtube-templates',
  },
  {
    q: 'What size is a LinkedIn Banner?',
    a: 'LinkedIn personal profile banners are 1584 x 396 pixels. LinkedIn company page covers are 1128 x 191 pixels. For LinkedIn feed posts, 1080 x 1350 pixels (4:5 ratio) gets the most screen real estate.',
    link: '/linkedin-templates',
  },
  {
    q: 'What size is a TikTok video?',
    a: 'TikTok videos are 1080 x 1920 pixels with a 9:16 aspect ratio. This full-screen vertical format is the standard for all TikTok content including videos, ads, and stories.',
    link: '/tiktok-templates',
  },
  {
    q: 'What size is a Facebook Cover Photo?',
    a: 'Facebook desktop covers are 820 x 312 pixels. Mobile covers are 640 x 360 pixels, and group covers are 1640 x 856 pixels. Keep critical text centered, since desktop crops top and bottom while mobile crops the sides.',
    link: '/facebook-templates',
  },
  {
    q: 'What are the standard social media image sizes?',
    a: 'The most common sizes: Instagram Post 1080 x 1350 (4:5), Instagram Story 1080 x 1920 (9:16), Facebook Cover 820 x 312, YouTube Thumbnail 3840 x 2160 (4K) with 1280 x 720 as the minimum, LinkedIn Banner 1584 x 396, TikTok 1080 x 1920, Pinterest Pin 1000 x 1500, and X Post 1080 x 1350.',
  },
  {
    q: 'What is Social Frames?',
    a: 'Social Frames is a free library of copy-ready SVG frames for 11 social media platforms, covering 60 format sizes. Pick a platform, choose a format, and instantly copy the perfect SVG frame into Figma, Sketch, or any design tool.',
  },
];
