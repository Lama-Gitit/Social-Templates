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

export type PlatformData = {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    intro: string;
    tips: string[];
    templates: Template[];
};

// --- Data: 2025 Social Media Standards ---
export const PLATFORMS: PlatformData[] = [
    {
        id: 'x',
        name: 'X (Twitter)',
        icon: Twitter,
        color: '#000000',
        bg: 'bg-slate-100',
        intro: "Real-time conversation. X covers are unique because the profile picture overlaps the bottom-left area heavily on mobile.",
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
        ]
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: Instagram,
        color: '#E1306C',
        bg: 'bg-pink-50',
        intro: "The visual king. Reels and Stories have significant UI overlays at the top (header) and bottom (comments/timeline).",
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
        ]
    },
    {
        id: 'threads',
        name: 'Threads',
        icon: Hash,
        color: '#000000',
        bg: 'bg-gray-100',
        intro: "Text-first but visually immersive. Threads supports full 9:16 visuals natively without cropping.",
        tips: [
            "Images can be full screen (9:16).",
            "Carousels are swipeable.",
            "Profile picture syncs with Instagram."
        ],
        templates: [
            { label: 'Profile Picture', width: 320, height: 320, desc: '1:1 • Circular crop', category: 'profile' },
            { label: 'Post & Video', width: 1080, height: 1920, desc: '9:16 • Mobile optimized', category: 'post' },
            { label: 'Carousel Slide', width: 1080, height: 1920, desc: '9:16 • Consistent height', category: 'post' },
        ]
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: Facebook,
        color: '#1877F2',
        bg: 'bg-blue-50',
        intro: "The universal directory. Covers here are tricky because they display differently on desktop vs. mobile.",
        tips: [
            "Desktop crops top/bottom; Mobile crops sides.",
            "Keep critical text in the center of covers.",
            "Event covers are huge."
        ],
        templates: [
            { label: 'Profile Picture', width: 196, height: 196, desc: '1:1 • Min size', category: 'profile' },
            { label: 'Cover (Desktop)', width: 851, height: 315, desc: '16:9 • Main header', category: 'cover' },
            { label: 'Cover (Mobile)', width: 640, height: 360, desc: '16:9 • Mobile optimized', category: 'cover' },
            { label: 'Event Cover', width: 1920, height: 1005, desc: '16:9 • High impact', category: 'cover' },
            { label: 'Group Cover', width: 1640, height: 856, desc: '1.91:1 • Community', category: 'cover' },
            { label: 'Vertical Post', width: 1080, height: 1350, desc: '4:5 • Feed standard', category: 'post' },
            { label: 'Stories', width: 1080, height: 1920, desc: '9:16 • Full screen', category: 'story' },
        ]
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: Linkedin,
        color: '#0A66C2', // Adjusted for dark mode visibility (original was #0077B5)
        bg: 'bg-blue-50',
        intro: "The professional network. Covers are much narrower (4:1) than other platforms.",
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
        ]
    },
    {
        id: 'bluesky',
        name: 'Bluesky',
        icon: Share2,
        color: '#0085FF',
        bg: 'bg-sky-50',
        intro: "The decentralized contender. Very similar to X, but vertical posts can be slightly taller (4:5).",
        tips: [
            "Headers behave similarly to X.",
            "Clean, simple visuals work best."
        ],
        templates: [
            { label: 'Header Image', width: 1500, height: 500, desc: '3:1 • Profile header', category: 'cover' },
            { label: 'Profile Picture', width: 400, height: 400, desc: '1:1 • Avatar', category: 'profile' },
            { label: 'Post (Vertical)', width: 1200, height: 1500, desc: '4:5 • Wider vertical', category: 'post' },
            { label: 'Post (Landscape)', width: 1200, height: 675, desc: '16:9 • Wide', category: 'post' },
            { label: 'Post (Square)', width: 1200, height: 1200, desc: '1:1 • Balanced', category: 'post' },
        ]
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: Video,
        color: '#ff0050',
        bg: 'bg-pink-50',
        intro: "Video native. The UI overlays (caption, music, buttons) cover the bottom ~20% and right side.",
        tips: [
            "Avoid the 'Right Rail' where like/share buttons sit.",
            "Bottom area is for captions.",
            "Keep action in the center."
        ],
        templates: [
            { label: 'Video / Story', width: 1080, height: 1920, desc: '9:16 • Watch UI', category: 'story' },
            { label: 'Profile Picture', width: 200, height: 200, desc: '1:1 • Minimum size', category: 'profile' },
            { label: 'Carousel Slide', width: 1080, height: 1920, desc: '9:16 • Photo mode', category: 'post' },
        ]
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: Youtube,
        color: '#FF0000',
        bg: 'bg-red-50',
        intro: "The video search engine. Channel banners are displayed on TVs (huge) but cropped heavily for Mobile.",
        tips: [
            "Place logo/text in the 'Safe Zone' (center 1546x423).",
            "Thumbnails are critical."
        ],
        templates: [
            { label: 'Channel Banner', width: 2560, height: 1440, desc: '16:9 • TV size', category: 'cover' },
            { label: 'Video Thumbnail', width: 1280, height: 720, desc: '16:9 • CTR Driver', category: 'cover' },
            { label: 'Profile Picture', width: 800, height: 800, desc: '1:1 • Channel icon', category: 'profile' },
            { label: 'Shorts', width: 1080, height: 1920, desc: '9:16 • Vertical', category: 'story' },
        ]
    },
    {
        id: 'pinterest',
        name: 'Pinterest',
        icon: Camera,
        color: '#BD081C',
        bg: 'bg-red-50',
        intro: "Vertical is the standard. 2:3 ratio is unique to Pinterest.",
        tips: [
            "Tall images dominate.",
            "Text overlays help."
        ],
        templates: [
            { label: 'Standard Pin', width: 1000, height: 1500, desc: '2:3 • Gold standard', category: 'post' },
            { label: 'Square Pin', width: 1000, height: 1000, desc: '1:1 • Acceptable', category: 'post' },
            { label: 'Board Cover', width: 600, height: 600, desc: '1:1 • Collection', category: 'cover' },
        ]
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        icon: Smartphone,
        color: '#FFFC00',
        bg: 'bg-yellow-50',
        intro: "Full screen vertical. Leave massive buffers for header and footer UI.",
        tips: [
            "Top 150px and Bottom 150px are usually covered.",
        ],
        templates: [
            { label: 'Snap / Story / Ad', width: 1080, height: 1920, desc: '9:16 • Full screen', category: 'story' },
            { label: 'Geofilter', width: 1080, height: 2340, desc: '9:19.5 • Tall device', category: 'ad' },
        ]
    }
];

// --- Helper: Generate Advanced "Blueprint" SVG ---
export const generateSVG = (template: Template, color: string) => {
    const { width, height, category, label } = template;

    // Note: For dark mode support, we adjust standard colors to be visible on slate-900 or slate-950
    // Background used in preview is slate-950/50, but if user copies, it should likely be transparent or white-ish background for use in design tools.
    // Actually, usually these SVGs act as guides, so a light bg is safer, OR we stick to the user's implementation which had #F9FAFB.
    // Given this is for copying into design tools, preserving the user's light bg (F9FAFB) is probably safest for visibility in typical tools,
    // but for the in-app preview we might want to override.
    // Let's stick to the user's logic for the "Copied" SVG, but we might tweak opacity for better looking preview if needed.

    // 1. Background & Border (Blueprint style)
    let content = `
    <rect width="${width}" height="${height}" fill="#F9FAFB"/>
    <rect width="${width}" height="${height}" fill="${color}" fill-opacity="0.05"/>
    <rect width="${width}" height="${height}" stroke="${color}" stroke-width="4" fill="none"/>
  `;

    // 2. Safe Zones / Overlays based on Category
    if (category === 'profile') {
        // Circle Guide
        const cx = width / 2;
        const cy = height / 2;
        const r = Math.min(width, height) / 2;
        content += `
      <circle cx="${cx}" cy="${cy}" r="${r - 2}" stroke="${color}" stroke-width="2" stroke-dasharray="8 8" fill="none"/>
      <text x="${cx}" y="${cy}" font-family="Arial" font-weight="bold" font-size="${width / 10}" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.2">CROP</text>
    `;
    } else if (category === 'cover') {
        // Profile Picture Obstruction Area (Bottom Left usually, simplistic assumption from user code)
        const profSize = height * 0.6;
        content += `
      <circle cx="${height * 0.2 + profSize / 2}" cy="${height - profSize / 3}" r="${profSize / 2}" fill="white" stroke="${color}" stroke-width="2" stroke-dasharray="4 4" opacity="0.7"/>
      <text x="${height * 0.2 + profSize / 2}" y="${height - profSize / 3}" font-family="Arial" font-size="${profSize / 5}" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.6">Profile Pic</text>
    `;
    } else if (category === 'story') {
        // Safe Zones (Top & Bottom bars)
        const safeZoneH = 250;
        // Top Bar
        content += `
      <rect x="0" y="0" width="${width}" height="${safeZoneH}" fill="${color}" fill-opacity="0.1"/>
      <line x1="0" y1="${safeZoneH}" x2="${width}" y2="${safeZoneH}" stroke="${color}" stroke-width="2" stroke-dasharray="10 5"/>
      <text x="${width / 2}" y="${safeZoneH / 2}" font-family="Arial" font-size="40" fill="${color}" text-anchor="middle" opacity="0.5">RESTRICTED UI ZONE</text>
    `;
        // Bottom Bar
        content += `
      <rect x="0" y="${height - safeZoneH}" width="${width}" height="${safeZoneH}" fill="${color}" fill-opacity="0.1"/>
      <line x1="0" y="${height - safeZoneH}" x2="${width}" y2="${height - safeZoneH}" stroke="${color}" stroke-width="2" stroke-dasharray="10 5"/>
      <text x="${width / 2}" y="${height - safeZoneH / 2}" font-family="Arial" font-size="40" fill="${color}" text-anchor="middle" opacity="0.5">RESTRICTED UI ZONE</text>
    `;
    }

    // 3. Center Crosshairs (Blueprint feel)
    content += `
    <line x1="${width / 2}" y1="${height * 0.45}" x2="${width / 2}" y2="${height * 0.55}" stroke="${color}" stroke-width="2" opacity="0.3"/>
    <line x1="${width * 0.45}" y1="${height / 2}" x2="${width * 0.55}" y2="${height / 2}" stroke="${color}" stroke-width="2" opacity="0.3"/>
  `;

    // 4. Labels
    content += `
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-weight="bold" font-size="${Math.max(24, width / 20)}" fill="${color}" text-anchor="middle" dominant-baseline="middle" dy="-20">${label}</text>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.max(16, width / 30)}" fill="#555" text-anchor="middle" dominant-baseline="middle" dy="20">${width} x ${height} px</text>
  `;

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};

// --- Fallback Helper: Generate Creative Layout SVG ---
export const generateCreativeSVG = (width: number, height: number, color: string, styleIndex: number, platformName: string) => {
    // Styles: 0 = Diagonal Split, 1 = Modern Grid, 2 = Editorial Frame

    let content = `<rect width="${width}" height="${height}" fill="#F9FAFB"/>`;

    if (styleIndex === 0) {
        // Style 1: Diagonal Split (Bold)
        content += `
      <path d="M0 0 L${width} ${height} L0 ${height} Z" fill="${color}" fill-opacity="0.1"/>
      <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="3"/>
      <text x="${width * 0.25}" y="${height * 0.75}" font-family="Arial" font-weight="bold" font-size="${width / 15}" fill="${color}" text-anchor="middle">IMAGE 1</text>
      <text x="${width * 0.75}" y="${height * 0.25}" font-family="Arial" font-weight="bold" font-size="${width / 15}" fill="${color}" text-anchor="middle">IMAGE 2</text>
      <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.3}" height="${height * 0.05}" fill="${color}"/>
      <text x="${width * 0.25}" y="${height * 0.135}" font-family="Arial" font-size="${width / 30}" fill="white" text-anchor="middle">${platformName.toUpperCase()}</text>
    `;
    } else if (styleIndex === 1) {
        // Style 2: Modern Grid (Asymmetrical)
        const splitY = height * 0.65;
        const splitX = width * 0.5;

        content += `
      <rect x="0" y="0" width="${width}" height="${splitY}" fill="${color}" fill-opacity="0.05"/>
      <line x1="0" y1="${splitY}" x2="${width}" y2="${splitY}" stroke="${color}" stroke-width="3"/>
      <line x1="${splitX}" y1="${splitY}" x2="${splitX}" y2="${height}" stroke="${color}" stroke-width="3"/>
      
      <text x="${width / 2}" y="${splitY / 2}" font-family="Arial" font-weight="bold" font-size="${width / 12}" fill="${color}" text-anchor="middle" opacity="0.3">FEATURE IMAGE</text>
      
      <text x="${splitX / 2}" y="${splitY + (height - splitY) / 2}" font-family="Arial" font-size="${width / 20}" fill="${color}" text-anchor="middle">DETAIL 1</text>
      <text x="${splitX + splitX / 2}" y="${splitY + (height - splitY) / 2}" font-family="Arial" font-size="${width / 20}" fill="${color}" text-anchor="middle">DETAIL 2</text>
    `;
    } else {
        // Style 3: Editorial Frame (Clean)
        const margin = width * 0.08;
        content += `
      <rect x="${margin}" y="${margin}" width="${width - margin * 2}" height="${height - margin * 2}" stroke="${color}" stroke-width="2" fill="none"/>
      <rect x="${margin}" y="${height - margin * 4}" width="${width - margin * 2}" height="${margin * 3}" fill="white" stroke="${color}" stroke-width="1"/>
      
      <text x="${width / 2}" y="${height / 2 - margin}" font-family="Arial" font-weight="bold" font-size="${width / 10}" fill="${color}" text-anchor="middle" opacity="0.1">PHOTO AREA</text>
      
      <line x1="${margin * 2}" y1="${height - margin * 3}" x2="${width - margin * 2}" y2="${height - margin * 3}" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
      <line x1="${margin * 2}" y1="${height - margin * 2}" x2="${width * 0.6}" y2="${height - margin * 2}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    `;
    }

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};
