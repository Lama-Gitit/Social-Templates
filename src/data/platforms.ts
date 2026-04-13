import {
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    Youtube,
    Video,
    Smartphone,
    Hash,
    Share2,
    Camera,
} from 'lucide-react';

// --- Types ---
export type TemplateCategory = 'profile' | 'post' | 'story' | 'cover' | 'ad';

export type Template = {
    label: string;
    width: number;
    height: number;
    desc: string;
    category: TemplateCategory;
};

export type PlatformFAQ = { q: string; a: string };

export type PlatformData = {
    id: string;
    slug: string;
    name: string;
    icon: React.ElementType;
    color: string;
    brandColor: string;
    bg: string;
    intro: string;
    metaTitle: string;
    metaDescription: string;
    tips: string[];
    templates: Template[];
    geoCopy: string;
    faqs: PlatformFAQ[];
};

// --- Data: 2025 Social Media Standards ---
export const PLATFORMS: PlatformData[] = [
    {
        id: 'youtube',
        slug: 'youtube-templates',
        name: 'YouTube',
        icon: Youtube,
        color: '#FF0000',
        brandColor: '#FF0000',
        bg: 'bg-red-50',
        intro: "The video search engine. Channel banners are displayed on TVs (huge) but cropped heavily for Mobile.",
        metaTitle: "YouTube SVG Templates | Free Thumbnail, Banner & Shorts Frames",
        metaDescription: "Free copy-ready SVG templates for YouTube. Grab perfectly sized frames for Thumbnails (1280x720), Channel Banners (2560x1440), Shorts (1080x1920), and more.",
        tips: [
            "Place logo/text in the 'Safe Zone' (center 1546x423).",
            "Thumbnails are critical."
        ],
        templates: [
            { label: 'Channel Banner', width: 2560, height: 1440, desc: '16:9 • TV size', category: 'cover' },
            { label: 'Video Thumbnail', width: 1280, height: 720, desc: '16:9 • CTR Driver', category: 'cover' },
            { label: 'Podcast Thumbnail', width: 1280, height: 1280, desc: '1:1 • Podcast art', category: 'cover' },
            { label: 'Profile Picture', width: 800, height: 800, desc: '1:1 • Channel icon', category: 'profile' },
            { label: 'Shorts', width: 1080, height: 1920, desc: '9:16 • Vertical', category: 'story' },
        ],
        geoCopy: "YouTube requires five key image sizes: Channel Banners at 2560x1440 pixels (safe area 1546x423 in the center), Video Thumbnails at 1280x720 pixels (16:9), Podcast Thumbnails at 1280x1280 pixels (1:1), Profile Pictures at 800x800 pixels, and Shorts at 1080x1920 pixels (9:16). Thumbnails are the single most important visual on YouTube because they directly affect click-through rates. Always place logos and text within the banner safe zone since YouTube crops banners differently on TV, desktop, and mobile.",
        faqs: [
            { q: 'What size is a YouTube Thumbnail?', a: 'YouTube Thumbnails are 1280 x 720 pixels (16:9 aspect ratio). This is the recommended size for clear thumbnails that display well across all devices.' },
            { q: 'What size is a YouTube Channel Banner?', a: 'YouTube Channel Banners are 2560 x 1440 pixels. The safe area for text and logos is 1546 x 423 pixels in the center, since YouTube crops the banner differently on TV, desktop, and mobile.' },
            { q: 'What size are YouTube Shorts?', a: 'YouTube Shorts use a 1080 x 1920 pixel format (9:16 vertical aspect ratio), the same dimensions as Instagram Stories and TikTok videos.' },
        ],
    },
    {
        id: 'instagram',
        slug: 'instagram-templates',
        name: 'Instagram',
        icon: Instagram,
        color: '#E1306C',
        brandColor: '#E1306C',
        bg: 'bg-pink-50',
        intro: "The visual king. Reels and Stories have significant UI overlays at the top (header) and bottom (comments/timeline).",
        metaTitle: "Instagram SVG Templates | Free Story, Post & Reel Frames",
        metaDescription: "Free copy-ready SVG templates for Instagram. Perfectly sized frames for Stories (1080x1920), Feed Posts (1080x1350), Reels, and Square Posts.",
        tips: [
            "Keep text centered in Reels to avoid buttons.",
            "Profile pictures are circular.",
            "Square posts are still safe, but 4:5 takes more screen."
        ],
        templates: [
            { label: 'Profile Picture', width: 320, height: 320, desc: '1:1 • Circular mask', category: 'profile' },
            { label: 'Square Post', width: 1080, height: 1080, desc: '1:1 • Classic format', category: 'post' },
            { label: 'Vertical Feed', width: 1080, height: 1350, desc: '4:5 • Maximize feed', category: 'post' },
            { label: 'Landscape Feed', width: 1080, height: 566, desc: '1.91:1 • Cinematic', category: 'post' },
            { label: 'Stories & Reels', width: 1080, height: 1920, desc: '9:16 • Watch UI zones', category: 'story' },
        ],
        geoCopy: "Instagram supports five main image formats: Profile Pictures at 320x320 pixels (displayed as a circle), Square Posts at 1080x1080 pixels (1:1), Vertical Feed Posts at 1080x1350 pixels (4:5), Landscape Posts at 1080x566 pixels (1.91:1), and Stories/Reels at 1080x1920 pixels (9:16). The 4:5 vertical format takes up the most screen real estate in the feed and typically generates the highest engagement. For Stories and Reels, keep important text centered since the top 15% and bottom 20% of the screen are covered by Instagram's UI elements.",
        faqs: [
            { q: 'What size is an Instagram Story?', a: 'Instagram Stories are 1080 x 1920 pixels (9:16 aspect ratio). The same dimensions apply to Instagram Reels.' },
            { q: 'What size is an Instagram Post?', a: 'The best Instagram feed post size is 1080 x 1350 pixels (4:5 ratio). This vertical format takes up the most screen space and drives higher engagement than square (1080x1080) posts.' },
            { q: 'Are Instagram profile pictures circular?', a: 'Yes. Instagram displays profile pictures as a circle cropped from a 320 x 320 pixel square. Keep important elements centered.' },
        ],
    },
    {
        id: 'x',
        slug: 'x-templates',
        name: 'X (Twitter)',
        icon: Twitter,
        color: '#FFFFFF',
        brandColor: '#FFFFFF',
        bg: 'bg-slate-100',
        intro: "Real-time conversation. X covers are unique because the profile picture overlaps the bottom-left area heavily on mobile.",
        metaTitle: "X (Twitter) SVG Templates | Free Header, Post & Card Frames",
        metaDescription: "Free copy-ready SVG templates for X (Twitter). Perfectly sized frames for Headers (1500x500), Posts (1080x1350), Card Images (800x418), and more.",
        tips: [
            "Keep text out of the bottom-left corner of headers.",
            "Vertical posts (4:5) are the most engaging format.",
            "Card Validator is your best friend for link previews."
        ],
        templates: [
            { label: 'Header Image', width: 1500, height: 500, desc: '3:1 • Watch bottom-left corner', category: 'cover' },
            { label: 'Profile Picture', width: 400, height: 400, desc: '1:1 • Circular display', category: 'profile' },
            { label: 'Post (Landscape)', width: 1200, height: 675, desc: '16:9 • Standard single image', category: 'post' },
            { label: 'Post (Vertical)', width: 1080, height: 1350, desc: '4:5 • Mobile optimized', category: 'post' },
            { label: 'Post (Square)', width: 1200, height: 1200, desc: '1:1 • Balanced view', category: 'post' },
            { label: 'Card Image', width: 800, height: 418, desc: '1.91:1 • Link preview', category: 'ad' },
        ],
        geoCopy: "X (formerly Twitter) uses six image formats: Header Images at 1500x500 pixels (3:1), Profile Pictures at 400x400 pixels (circular crop), Landscape Posts at 1200x675 pixels (16:9), Vertical Posts at 1080x1350 pixels (4:5), Square Posts at 1200x1200 pixels (1:1), and Link Card Images at 800x418 pixels (1.91:1). On mobile, the profile picture overlaps the bottom-left corner of the header image, so avoid placing important content in that area. Vertical 4:5 posts take up the most feed space and tend to outperform other formats.",
        faqs: [
            { q: 'What size is an X (Twitter) header?', a: 'X header images are 1500 x 500 pixels (3:1 ratio). Keep text out of the bottom-left corner because the profile picture overlaps that area on mobile.' },
            { q: 'What is the best X post image size?', a: 'The best X post size is 1080 x 1350 pixels (4:5 vertical). This format takes up the most feed space on mobile and drives higher engagement.' },
            { q: 'What size is an X Card Image?', a: 'X link card preview images are 800 x 418 pixels (1.91:1 ratio). Use the Card Validator tool to preview how your link cards will appear.' },
        ],
    },
    {
        id: 'facebook',
        slug: 'facebook-templates',
        name: 'Facebook',
        icon: Facebook,
        color: '#1877F2',
        brandColor: '#1877F2',
        bg: 'bg-blue-50',
        intro: "The universal directory. Covers here are tricky because they display differently on desktop vs. mobile.",
        metaTitle: "Facebook SVG Templates | Free Cover, Post & Story Frames",
        metaDescription: "Free copy-ready SVG templates for Facebook. Perfectly sized frames for Covers (851x315), Event Covers (1920x1005), Posts (1080x1350), and Stories.",
        tips: [
            "Desktop crops top/bottom; Mobile crops sides.",
            "Keep critical text in the center of covers.",
            "Event covers are huge."
        ],
        templates: [
            { label: 'Profile Picture', width: 320, height: 320, desc: '1:1 • Recommended size', category: 'profile' },
            { label: 'Cover (Desktop)', width: 851, height: 315, desc: '16:9 • Main header', category: 'cover' },
            { label: 'Cover (Mobile)', width: 640, height: 360, desc: '16:9 • Mobile optimized', category: 'cover' },
            { label: 'Event Cover', width: 1920, height: 1005, desc: '16:9 • High impact', category: 'cover' },
            { label: 'Group Cover', width: 1640, height: 856, desc: '1.91:1 • Community', category: 'cover' },
            { label: 'Vertical Post', width: 1080, height: 1350, desc: '4:5 • Feed standard', category: 'post' },
            { label: 'Stories', width: 1080, height: 1920, desc: '9:16 • Full screen', category: 'story' },
        ],
        geoCopy: "Facebook uses seven image formats across its features: Profile Pictures at 320x320 pixels (displayed as a circle), Desktop Covers at 851x315 pixels, Mobile Covers at 640x360 pixels, Event Covers at 1920x1005 pixels, Group Covers at 1640x856 pixels, Vertical Posts at 1080x1350 pixels (4:5), and Stories at 1080x1920 pixels (9:16). Facebook cover photos display differently on desktop and mobile. Desktop crops the top and bottom while mobile crops the sides, so always keep critical text and logos in the center of your cover image.",
        faqs: [
            { q: 'What size is a Facebook Cover Photo?', a: 'Facebook desktop covers are 851 x 315 pixels. Mobile covers are 640 x 360 pixels. Keep critical text centered since desktop crops top/bottom and mobile crops the sides.' },
            { q: 'What size is a Facebook Event Cover?', a: 'Facebook Event covers are 1920 x 1005 pixels (16:9 ratio). These are high-impact visuals that display prominently on event pages.' },
            { q: 'What size is a Facebook Post?', a: 'The best Facebook feed post size is 1080 x 1350 pixels (4:5 vertical). Shared link images perform best at 1200 x 630 pixels.' },
        ],
    },
    {
        id: 'threads',
        slug: 'threads-templates',
        name: 'Threads',
        icon: Hash,
        color: '#FFFFFF',
        brandColor: '#FFFFFF',
        bg: 'bg-gray-100',
        intro: "Text-first but visually immersive. Threads supports full 9:16 visuals natively without cropping.",
        metaTitle: "Threads SVG Templates | Free Post & Carousel Frames",
        metaDescription: "Free copy-ready SVG templates for Threads. Perfectly sized frames for Posts (1080x1920), Carousels, and Profile Pictures.",
        tips: [
            "Images can be full screen (9:16).",
            "Carousels are swipeable.",
            "Profile picture syncs with Instagram."
        ],
        templates: [
            { label: 'Profile Picture', width: 640, height: 640, desc: '1:1 • Circular crop', category: 'profile' },
            { label: 'Portrait Post', width: 1080, height: 1350, desc: '4:5 • Highest engagement', category: 'post' },
            { label: 'Square Post', width: 1080, height: 1080, desc: '1:1 • Classic format', category: 'post' },
            { label: 'Post & Video', width: 1080, height: 1920, desc: '9:16 • Mobile optimized', category: 'post' },
            { label: 'Carousel Slide', width: 1080, height: 1920, desc: '9:16 • Consistent height', category: 'post' },
        ],
        geoCopy: "Threads supports five image formats: Profile Pictures at 640x640 pixels (synced with your Instagram profile), Portrait Posts at 1080x1350 pixels (4:5), Square Posts at 1080x1080 pixels (1:1), full-screen Posts and Videos at 1080x1920 pixels (9:16), and Carousel Slides at 1080x1920 pixels (9:16). The 4:5 portrait format currently delivers the highest engagement on Threads. Unlike many platforms, Threads displays full 9:16 vertical images without cropping, making it one of the most visually immersive text-first platforms.",
        faqs: [
            { q: 'What size is a Threads post?', a: 'Threads posts and videos are 1080 x 1920 pixels (9:16). Threads displays full vertical images without cropping.' },
            { q: 'Does Threads sync with Instagram?', a: 'Yes. Your Threads profile picture syncs automatically with your Instagram profile picture at 320 x 320 pixels.' },
        ],
    },
    {
        id: 'linkedin',
        slug: 'linkedin-templates',
        name: 'LinkedIn',
        icon: Linkedin,
        color: '#2D84D7',
        brandColor: '#2D84D7',
        bg: 'bg-blue-50',
        intro: "The professional network. Covers are much narrower (4:1) than other platforms.",
        metaTitle: "LinkedIn SVG Templates | Free Banner, Post & Cover Frames",
        metaDescription: "Free copy-ready SVG templates for LinkedIn. Perfectly sized frames for Personal Banners (1584x396), Company Covers (1128x191), Posts (1080x1350), and more.",
        tips: [
            "Profile pic sits on the left of personal covers.",
            "Company covers are even wider.",
            "Link posts (1.91:1) are standard."
        ],
        templates: [
            { label: 'Profile Picture', width: 400, height: 400, desc: '1:1 • Headshot', category: 'profile' },
            { label: 'Personal Cover', width: 1584, height: 396, desc: '4:1 • Narrow banner', category: 'cover' },
            { label: 'Company Cover', width: 1128, height: 191, desc: '5.9:1 • Business page', category: 'cover' },
            { label: 'Link Post / Ad', width: 1200, height: 627, desc: '1.91:1 • Link preview', category: 'post' },
            { label: 'Article Cover', width: 1920, height: 1080, desc: '16:9 • Article Header', category: 'cover' },
            { label: 'Portrait Post', width: 1080, height: 1350, desc: '4:5 • Feed push', category: 'post' },
        ],
        geoCopy: "LinkedIn uses six image formats: Profile Pictures at 400x400 pixels (headshot), Personal Cover Banners at 1584x396 pixels (4:1), Company Page Covers at 1128x191 pixels (5.9:1), Link Post/Ad Images at 1200x627 pixels (1.91:1), Article Cover Images at 1920x1080 pixels (16:9), and Portrait Posts at 1080x1350 pixels (4:5). LinkedIn covers are much narrower than other platforms with a 4:1 aspect ratio. The profile picture overlaps the left side of personal covers, so keep that area clear of important text.",
        faqs: [
            { q: 'What size is a LinkedIn Banner?', a: 'LinkedIn personal profile banners are 1584 x 396 pixels (4:1 ratio). Company page covers are 1128 x 191 pixels (5.9:1). Keep text away from the left side where the profile picture overlaps.' },
            { q: 'What size is a LinkedIn Post?', a: 'The best LinkedIn feed post size is 1080 x 1350 pixels (4:5 portrait). Link post preview images are 1200 x 627 pixels (1.91:1).' },
            { q: 'What size is a LinkedIn Article Cover?', a: 'LinkedIn article cover images are 1920 x 1080 pixels (16:9 ratio).' },
        ],
    },
    {
        id: 'bluesky',
        slug: 'bluesky-templates',
        name: 'Bluesky',
        icon: Share2,
        color: '#0085FF',
        brandColor: '#0085FF',
        bg: 'bg-sky-50',
        intro: "The decentralized contender. Very similar to X, but vertical posts can be slightly taller (4:5).",
        metaTitle: "Bluesky SVG Templates | Free Header & Post Frames",
        metaDescription: "Free copy-ready SVG templates for Bluesky. Perfectly sized frames for Headers (1500x500), Vertical Posts (1200x1500), and Square Posts.",
        tips: [
            "Headers behave similarly to X.",
            "Clean, simple visuals work best."
        ],
        templates: [
            { label: 'Header Image', width: 1500, height: 500, desc: '3:1 • Profile header', category: 'cover' },
            { label: 'Profile Picture', width: 400, height: 400, desc: '1:1 • Avatar', category: 'profile' },
            { label: 'Post (Vertical)', width: 800, height: 1000, desc: '4:5 • 1000px max', category: 'post' },
            { label: 'Post (Landscape)', width: 1000, height: 563, desc: '16:9 • 1000px max', category: 'post' },
            { label: 'Post (Square)', width: 1000, height: 1000, desc: '1:1 • 1000px max', category: 'post' },
        ],
        geoCopy: "Bluesky uses five image formats: Header Images at 1500x500 pixels (3:1), Profile Pictures at 400x400 pixels, Vertical Posts at 800x1000 pixels (4:5), Landscape Posts at 1000x563 pixels (16:9), and Square Posts at 1000x1000 pixels (1:1). Bluesky caps post images at 1000 pixels on the longest side and 1MB per image, which is the strictest image spec of any major platform. Larger images will be downscaled automatically, so design at 1000px or below to preserve quality.",
        faqs: [
            { q: 'What size is a Bluesky header?', a: 'Bluesky header images are 1500 x 500 pixels (3:1), similar to X (Twitter). Headers behave the same way across both platforms.' },
            { q: 'What size is a Bluesky post?', a: 'Bluesky caps post images at 1000 pixels on the longest side and 1MB per image. Use 800 x 1000 pixels for vertical (4:5), 1000 x 563 for landscape (16:9), and 1000 x 1000 for square (1:1).' },
        ],
    },
    {
        id: 'tiktok',
        slug: 'tiktok-templates',
        name: 'TikTok',
        icon: Video,
        color: '#EE1D52',
        brandColor: '#EE1D52',
        bg: 'bg-pink-50',
        intro: "Video native. The UI overlays (caption, music, buttons) cover the bottom ~20% and right side.",
        metaTitle: "TikTok SVG Templates | Free Video & Carousel Frames",
        metaDescription: "Free copy-ready SVG templates for TikTok. Perfectly sized frames for Videos (1080x1920), Carousel Slides, and Profile Pictures.",
        tips: [
            "Avoid the 'Right Rail' where like/share buttons sit.",
            "Bottom area is for captions.",
            "Keep action in the center."
        ],
        templates: [
            { label: 'Video / Story', width: 1080, height: 1920, desc: '9:16 • Watch UI', category: 'story' },
            { label: 'Profile Picture', width: 200, height: 200, desc: '1:1 • Minimum size', category: 'profile' },
            { label: 'Carousel Slide', width: 1080, height: 1920, desc: '9:16 • Photo mode', category: 'post' },
        ],
        geoCopy: "TikTok uses three image formats: Videos and Stories at 1080x1920 pixels (9:16), Profile Pictures at 200x200 pixels minimum, and Carousel Slides at 1080x1920 pixels (9:16). TikTok is a video-native platform where the UI covers approximately 20% of the bottom of the screen (captions, music info) and the right side (like, share, comment buttons). Keep all important visual content in the center of the frame to avoid being hidden by interface elements.",
        faqs: [
            { q: 'What size is a TikTok video?', a: 'TikTok videos are 1080 x 1920 pixels (9:16 vertical). The bottom 20% is covered by captions and the right side has like/share buttons, so keep important content centered.' },
            { q: 'What size is a TikTok profile picture?', a: 'TikTok profile pictures are 200 x 200 pixels minimum (1:1 square, displayed as a circle).' },
        ],
    },
    {
        id: 'pinterest',
        slug: 'pinterest-templates',
        name: 'Pinterest',
        icon: Camera,
        color: '#FF0022',
        brandColor: '#FF0022',
        bg: 'bg-red-50',
        intro: "Vertical is the standard. 2:3 ratio is unique to Pinterest.",
        metaTitle: "Pinterest SVG Templates | Free Pin & Board Cover Frames",
        metaDescription: "Free copy-ready SVG templates for Pinterest. Perfectly sized frames for Standard Pins (1000x1500), Square Pins (1000x1000), and Board Covers.",
        tips: [
            "Tall images dominate.",
            "Text overlays help."
        ],
        templates: [
            { label: 'Standard Pin', width: 1000, height: 1500, desc: '2:3 • Gold standard', category: 'post' },
            { label: 'Square Pin', width: 1000, height: 1000, desc: '1:1 • Acceptable', category: 'post' },
            { label: 'Board Cover', width: 600, height: 600, desc: '1:1 • Collection', category: 'cover' },
        ],
        geoCopy: "Pinterest uses three image formats: Standard Pins at 1000x1500 pixels (2:3), Square Pins at 1000x1000 pixels (1:1), and Board Covers at 600x600 pixels (1:1). The 2:3 vertical ratio is unique to Pinterest and is the gold standard for the platform. Tall images naturally dominate Pinterest's masonry grid layout, and pins with text overlays tend to perform better because they communicate the pin's value at a glance while scrolling.",
        faqs: [
            { q: 'What size is a Pinterest Pin?', a: 'The standard Pinterest Pin size is 1000 x 1500 pixels (2:3 ratio). This vertical format dominates the Pinterest masonry grid and gets the most visibility.' },
            { q: 'What size is a Pinterest Board Cover?', a: 'Pinterest Board Covers are 600 x 600 pixels (1:1 square).' },
        ],
    },
    {
        id: 'snapchat',
        slug: 'snapchat-templates',
        name: 'Snapchat',
        icon: Smartphone,
        color: '#FFFC00',
        brandColor: '#FFFC00',
        bg: 'bg-yellow-50',
        intro: "Full screen vertical. Leave massive buffers for header and footer UI.",
        metaTitle: "Snapchat SVG Templates | Free Story, Ad & Geofilter Frames",
        metaDescription: "Free copy-ready SVG templates for Snapchat. Perfectly sized frames for Stories (1080x1920), Ads, and Geofilters (1080x2340).",
        tips: [
            "Top 150px and Bottom 150px are usually covered.",
        ],
        templates: [
            { label: 'Snap / Story / Ad', width: 1080, height: 1920, desc: '9:16 • Full screen', category: 'story' },
            { label: 'Geofilter', width: 1080, height: 2340, desc: '9:19.5 • Tall device', category: 'ad' },
        ],
        geoCopy: "Snapchat uses two main image formats: Snaps, Stories, and Ads at 1080x1920 pixels (9:16) and Geofilters at 1080x2340 pixels (9:19.5 for taller devices). Snapchat is entirely full-screen vertical. The top 150 pixels and bottom 150 pixels are typically covered by Snapchat's header and footer UI, so always leave generous buffers and keep critical content in the middle 75% of the screen.",
        faqs: [
            { q: 'What size is a Snapchat Story?', a: 'Snapchat Stories and Ads are 1080 x 1920 pixels (9:16). Keep critical content in the middle 75% of the screen since the top and bottom 150px are covered by UI.' },
            { q: 'What size is a Snapchat Geofilter?', a: 'Snapchat Geofilters are 1080 x 2340 pixels (9:19.5 ratio) to accommodate taller device screens.' },
        ],
    }
];

// --- Helper: Generate Advanced "Blueprint" SVG ---
export const generateSVG = (template: Template, brandColor: string) => {
    const { width, height, category, label } = template;
    const color = brandColor;
    const labelColor = '#F5F1F0';
    const secondaryLabelColor = '#888888';

    let content = `
    <g id="${label} - Frame bg">
        <rect width="${width}" height="${height}" fill="#0A0A0B" stroke="#2E2E33" stroke-width="4"/>
    </g>
    <g id="${label} - Center Guides (delete me)">
        <line x1="${width / 2}" y1="${height * 0.45}" x2="${width / 2}" y2="${height * 0.55}" stroke="#FF3B2D" stroke-width="2"/>
        <line x1="${width * 0.45}" y1="${height / 2}" x2="${width * 0.55}" y2="${height / 2}" stroke="#FF3B2D" stroke-width="2"/>
    </g>
  `;

    if (category === 'profile') {
        const cx = width / 2;
        const cy = height / 2;
        const r = Math.min(width, height) / 2;
        content += `
    <g id="${label} - Circular Crop Guide (delete me)">
        <circle cx="${cx}" cy="${cy}" r="${r - 2}" stroke="${color}" stroke-width="2" stroke-dasharray="8 8" fill="none"/>
        <text x="${cx}" y="${cy}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 10}" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.2">CROP</text>
    </g>`;
    } else if (category === 'cover') {
        const profSize = height * 0.6;
        content += `
    <g id="${label} - Profile Pic Overlap (delete me)">
        <circle cx="${height * 0.2 + profSize / 2}" cy="${height - profSize / 3}" r="${profSize / 2}" fill="#1A1A1C" stroke="${color}" stroke-width="2" stroke-dasharray="4 4" opacity="0.7"/>
        <text x="${height * 0.2 + profSize / 2}" y="${height - profSize / 3}" font-family="Arial, sans-serif" font-size="${profSize / 5}" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.6">Profile Pic</text>
    </g>`;
    } else if (category === 'story') {
        const safeZoneH = 250;
        content += `
    <g id="${label} - UI Overlay Zones (delete me)">
        <rect x="0" y="0" width="${width}" height="${safeZoneH}" fill="${color}" fill-opacity="0.1"/>
        <line x1="0" y1="${safeZoneH}" x2="${width}" y2="${safeZoneH}" stroke="${color}" stroke-width="2" stroke-dasharray="10 5"/>
        <text x="${width / 2}" y="${safeZoneH / 2}" font-family="Arial, sans-serif" font-size="40" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.5">UI OVERLAY</text>
        <rect x="0" y="${height - safeZoneH}" width="${width}" height="${safeZoneH}" fill="${color}" fill-opacity="0.1"/>
        <line x1="0" y1="${height - safeZoneH}" x2="${width}" y2="${height - safeZoneH}" stroke="${color}" stroke-width="2" stroke-dasharray="10 5"/>
        <text x="${width / 2}" y="${height - (safeZoneH / 2)}" font-family="Arial, sans-serif" font-size="40" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.5">UI OVERLAY</text>
    </g>`;
    }

    content += `
    <g id="${label} - Info (delete me)">
        <text x="50%" y="33%" font-family="Arial, sans-serif" font-weight="bold" font-size="${Math.max(24, width / 20)}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">${label}</text>
        <text x="50%" y="33%" font-family="Arial, sans-serif" font-size="${Math.max(16, width / 30)}" fill="${secondaryLabelColor}" text-anchor="middle" dominant-baseline="middle" dy="${Math.max(24, width / 20) * 1.2}">${width} x ${height} px</text>
    </g>
  `;

    return `<svg id="${label}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};

// --- Fallback Helper: Generate Creative Layout SVG ---
export const generateCreativeSVG = (width: number, height: number, brandColor: string, styleIndex: number, platformName: string) => {
    // Styles: 0 = Diagonal Split, 1 = Modern Grid, 2 = Editorial Frame
    const labelColor = brandColor;

    const styleName = ['Diagonal Split', 'Modern Grid', 'Editorial Frame'][styleIndex];

    let content = `
    <g id="${platformName} ${styleName} - Frame bg">
        <rect width="${width}" height="${height}" fill="#0A0A0B"/>
    </g>`;

    if (styleIndex === 0) {
        content += `
      <g id="${platformName} ${styleName} - Layout">
        <path d="M0 0 L${width} ${height} L0 ${height} Z" fill="${brandColor}" fill-opacity="0.1"/>
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${brandColor}" stroke-width="3"/>
      </g>
      <g id="${platformName} ${styleName} - Placeholders (delete me)">
        <text x="${width * 0.25}" y="${height * 0.75}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 15}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">IMAGE 1</text>
        <text x="${width * 0.75}" y="${height * 0.25}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 15}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">IMAGE 2</text>
        <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.3}" height="${height * 0.05}" fill="${brandColor}"/>
        <text x="${width * 0.25}" y="${height * 0.125}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 30}" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${platformName.toUpperCase()}</text>
      </g>
    `;
    } else if (styleIndex === 1) {
        const splitY = height * 0.65;
        const splitX = width * 0.5;

        content += `
      <g id="${platformName} ${styleName} - Layout">
        <rect x="0" y="0" width="${width}" height="${splitY}" fill="${brandColor}" fill-opacity="0.05"/>
        <line x1="0" y1="${splitY}" x2="${width}" y2="${splitY}" stroke="${brandColor}" stroke-width="3"/>
        <line x1="${splitX}" y1="${splitY}" x2="${splitX}" y2="${height}" stroke="${brandColor}" stroke-width="3"/>
      </g>
      <g id="${platformName} ${styleName} - Placeholders (delete me)">
        <text x="${width / 2}" y="${splitY / 2}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 12}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle" opacity="0.3">FEATURE IMAGE</text>
        <text x="${splitX / 2}" y="${splitY + (height - splitY) / 2}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 20}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">DETAIL 1</text>
        <text x="${splitX + splitX / 2}" y="${splitY + (height - splitY) / 2}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 20}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">DETAIL 2</text>
      </g>
    `;
    } else {
        const margin = width * 0.08;
        content += `
      <g id="${platformName} ${styleName} - Layout">
        <rect x="${margin}" y="${margin}" width="${width - margin * 2}" height="${height - margin * 2}" stroke="${brandColor}" stroke-width="2" fill="none"/>
        <rect x="${margin}" y="${height - margin * 4}" width="${width - margin * 2}" height="${margin * 3}" fill="#1A1A1C" stroke="${brandColor}" stroke-width="1"/>
      </g>
      <g id="${platformName} ${styleName} - Placeholders (delete me)">
        <text x="${width / 2}" y="${height / 2 - margin}" font-family="Arial, sans-serif" font-weight="bold" font-size="${width / 10}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle" opacity="0.1">PHOTO AREA</text>
        <line x1="${margin * 2}" y1="${height - margin * 3}" x2="${width - margin * 2}" y2="${height - margin * 3}" stroke="${brandColor}" stroke-width="4" stroke-linecap="round"/>
        <line x1="${margin * 2}" y1="${height - margin * 2}" x2="${width * 0.6}" y2="${height - margin * 2}" stroke="${brandColor}" stroke-width="2" stroke-linecap="round"/>
      </g>
    `;
    }

    return `<svg id="${platformName} ${styleName}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};
