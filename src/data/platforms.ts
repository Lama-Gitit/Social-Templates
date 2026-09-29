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
    Globe,
} from 'lucide-react';

// --- Types ---
export type TemplateCategory = 'profile' | 'post' | 'story' | 'cover' | 'ad' | 'web';

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
        metaDescription: "Free copy-ready SVG templates for YouTube. Grab perfectly sized frames for Thumbnails (3840x2160 4K), Channel Banners (2560x1440), Shorts (1080x1920), and more.",
        tips: [
            "Place logo/text in the 'Safe Zone' (center 1546x423).",
            "Thumbnails are critical.",
            "Design thumbnails at 4K — TVs expose soft 720p art."
        ],
        templates: [
            { label: 'Channel Banner', width: 2560, height: 1440, desc: '16:9 • TV size', category: 'cover' },
            { label: 'Video Thumbnail (4K)', width: 3840, height: 2160, desc: '16:9 • Recommended', category: 'cover' },
            { label: 'Video Thumbnail (Min)', width: 1280, height: 720, desc: '16:9 • Baseline size', category: 'cover' },
            { label: 'Podcast Thumbnail', width: 1280, height: 1280, desc: '1:1 • Podcast art', category: 'cover' },
            { label: 'Profile Picture', width: 800, height: 800, desc: '1:1 • Channel icon', category: 'profile' },
            { label: 'Shorts', width: 1080, height: 1920, desc: '9:16 • Vertical', category: 'story' },
            { label: 'Community Post', width: 1000, height: 1000, desc: '1:1 • Channel tab', category: 'post' },
        ],
        geoCopy: "YouTube requires seven key image sizes: Channel Banners at 2560x1440 pixels (safe area 1546x423 in the center), Video Thumbnails at 3840x2160 pixels (4K, 16:9 — the current recommended size) with 1280x720 pixels as the accepted minimum, Podcast Thumbnails at 1280x1280 pixels (1:1), Profile Pictures at 800x800 pixels, Shorts at 1080x1920 pixels (9:16), and Community Posts at 1000x1000 pixels (1:1). YouTube raised its recommended thumbnail resolution to 4K to serve the growing share of viewing on smart TVs and large displays, where a 1280x720 thumbnail looks noticeably soft. Thumbnail file size caps at 50MB on desktop and 2MB on mobile. Thumbnails are the single most important visual on YouTube because they directly affect click-through rates. Always place logos and text within the banner safe zone since YouTube crops banners differently on TV, desktop, and mobile.",
        faqs: [
            { q: 'What size is a YouTube Thumbnail?', a: 'YouTube now recommends 3840 x 2160 pixels (4K, 16:9) for thumbnails. 1280 x 720 pixels remains the accepted minimum and still looks clean on phones and in search, but 4K holds up on smart TVs and large displays. File size caps at 50MB on desktop and 2MB on mobile.' },
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
            { label: 'Tall Portrait', width: 1080, height: 1440, desc: '3:4 • New 2026 grid standard', category: 'post' },
            { label: 'Vertical Feed', width: 1080, height: 1350, desc: '4:5 • Legacy max', category: 'post' },
            { label: 'Square Post', width: 1080, height: 1080, desc: '1:1 • Classic format', category: 'post' },
            { label: 'Landscape Feed', width: 1080, height: 566, desc: '1.91:1 • Cinematic', category: 'post' },
            { label: 'Stories & Reels', width: 1080, height: 1920, desc: '9:16 • Watch UI zones', category: 'story' },
            { label: 'Reel Cover', width: 420, height: 654, desc: '~3:4.65 • Profile-grid frame', category: 'cover' },
        ],
        geoCopy: "Instagram supports six main image formats: Profile Pictures at 320x320 pixels (displayed as a circle), Tall Portrait Posts at 1080x1440 pixels (3:4 — added natively in 2026 and now the gold standard since the profile grid moved from square to 3:4), Vertical Feed Posts at 1080x1350 pixels (4:5 — still supported but no longer the recommended max), Square Posts at 1080x1080 pixels (1:1), Landscape Posts at 1080x566 pixels (1.91:1), and Stories/Reels at 1080x1920 pixels (9:16). Reel Cover frames are 420x654 pixels. The 3:4 tall portrait format fills both the feed and the new 3:4 profile grid uncropped and currently drives the highest engagement. For Stories and Reels, keep important text centered since the top 15% and bottom 20% of the screen are covered by Instagram's UI elements.",
        faqs: [
            { q: 'What size is an Instagram Post in 2026?', a: 'The best Instagram feed post size is now 1080 x 1440 pixels (3:4 tall portrait). Instagram added 3:4 as a native upload size in 2026 after moving the profile grid from square to 3:4 thumbnails. A 1080x1440 image fills both the feed and the grid with no crop. The older 1080x1350 (4:5) format is still supported.' },
            { q: 'What size is an Instagram Story?', a: 'Instagram Stories are 1080 x 1920 pixels (9:16 aspect ratio). The same dimensions apply to Instagram Reels.' },
            { q: 'What size is a Reel Cover?', a: 'Instagram Reel Covers are 420 x 654 pixels. This is the frame shown on your profile grid for a Reel — design it to read clearly at thumbnail size.' },
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
            { label: 'Cover (Desktop)', width: 820, height: 312, desc: '~2.6:1 • Main header', category: 'cover' },
            { label: 'Cover (Mobile)', width: 640, height: 360, desc: '16:9 • Mobile optimized', category: 'cover' },
            { label: 'Event Cover', width: 1920, height: 1005, desc: '16:9 • High impact', category: 'cover' },
            { label: 'Group Cover', width: 1640, height: 856, desc: '1.91:1 • Community', category: 'cover' },
            { label: 'Vertical Post', width: 1080, height: 1350, desc: '4:5 • Feed standard', category: 'post' },
            { label: 'Stories', width: 1080, height: 1920, desc: '9:16 • Full screen', category: 'story' },
        ],
        geoCopy: "Facebook uses seven image formats across its features: Profile Pictures at 320x320 pixels (displayed as a circle), Desktop Covers at 820x312 pixels, Mobile Covers at 640x360 pixels, Event Covers at 1920x1005 pixels, Group Covers at 1640x856 pixels, Vertical Posts at 1080x1350 pixels (4:5), and Stories at 1080x1920 pixels (9:16). Facebook cover photos display differently on desktop and mobile. Desktop crops the top and bottom while mobile crops the sides, so always keep critical text and logos in the center of your cover image.",
        faqs: [
            { q: 'What size is a Facebook Cover Photo?', a: 'Facebook desktop covers are 820 x 312 pixels. Mobile covers are 640 x 360 pixels. Keep critical text centered since desktop crops top/bottom and mobile crops the sides.' },
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
            { label: 'Landscape Post', width: 1080, height: 566, desc: '1.91:1 • Wide format', category: 'post' },
            { label: 'Post & Video', width: 1080, height: 1920, desc: '9:16 • Mobile optimized', category: 'post' },
            { label: 'Carousel Slide', width: 1080, height: 1920, desc: '9:16 • Consistent height', category: 'post' },
        ],
        geoCopy: "Threads supports six image formats: Profile Pictures at 640x640 pixels (synced with your Instagram profile), Portrait Posts at 1080x1350 pixels (4:5), Square Posts at 1080x1080 pixels (1:1), Landscape Posts at 1080x566 pixels (1.91:1), full-screen Posts and Videos at 1080x1920 pixels (9:16), and Carousel Slides at 1080x1920 pixels (9:16). The 4:5 portrait format currently delivers the highest engagement on Threads. Unlike many platforms, Threads displays full 9:16 vertical images without cropping, making it one of the most visually immersive text-first platforms.",
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
            { label: 'Event Cover', width: 1776, height: 444, desc: '4:1 • Event banner', category: 'cover' },
            { label: 'Link Post / Ad', width: 1200, height: 627, desc: '1.91:1 • Link preview', category: 'post' },
            { label: 'Article Cover', width: 1920, height: 1080, desc: '16:9 • Article Header', category: 'cover' },
            { label: 'Video Thumbnail', width: 1280, height: 720, desc: '16:9 • Native video', category: 'cover' },
            { label: 'Portrait Post', width: 1080, height: 1350, desc: '4:5 • Feed push', category: 'post' },
        ],
        geoCopy: "LinkedIn uses eight image formats: Profile Pictures at 400x400 pixels (headshot), Personal Cover Banners at 1584x396 pixels (4:1), Company Page Covers at 1128x191 pixels (5.9:1), Event Covers at 1776x444 pixels (4:1), Link Post/Ad Images at 1200x627 pixels (1.91:1), Article Cover Images at 1920x1080 pixels (16:9), Video Thumbnails at 1280x720 pixels (16:9), and Portrait Posts at 1080x1350 pixels (4:5). LinkedIn covers are much narrower than other platforms with a 4:1 aspect ratio. The profile picture overlaps the left side of personal covers, so keep that area clear of important text.",
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
            { label: 'Post (Vertical)', width: 1200, height: 1500, desc: '4:5 • Highest engagement', category: 'post' },
            { label: 'Post (Landscape)', width: 1600, height: 900, desc: '16:9 • Wide format', category: 'post' },
            { label: 'Post (Square)', width: 1200, height: 1200, desc: '1:1 • Balanced view', category: 'post' },
        ],
        geoCopy: "Bluesky uses five image formats: Header Images at 1500x500 pixels (3:1), Profile Pictures at 400x400 pixels, Vertical Posts at 1200x1500 pixels (4:5), Landscape Posts at 1600x900 pixels (16:9), and Square Posts at 1200x1200 pixels (1:1). Since the April 2026 update Bluesky accepts post images up to 2MB and 4000 pixels on the longest side, a significant increase from the previous 1MB and 2000 pixel caps. Bluesky also displays multi-image posts as a swipeable carousel, so mixed aspect ratios are shown without cropping.",
        faqs: [
            { q: 'What size is a Bluesky header?', a: 'Bluesky header images are 1500 x 500 pixels (3:1), similar to X (Twitter). Headers behave the same way across both platforms.' },
            { q: 'What size is a Bluesky post?', a: 'Bluesky accepts post images up to 4000 pixels on the longest side and 2MB per image. Use 1200 x 1500 pixels for vertical (4:5), 1600 x 900 for landscape (16:9), and 1200 x 1200 for square (1:1).' },
            { q: 'How many images can a Bluesky post have?', a: 'Bluesky supports up to four images per post, displayed as a swipeable carousel. Mixed aspect ratios are shown without cropping, so images do not need to match each other.' },
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
            { label: 'Idea Pin', width: 1080, height: 1920, desc: '9:16 • Full-screen vertical', category: 'story' },
            { label: 'Board Cover', width: 1000, height: 1000, desc: '1:1 • Collection', category: 'cover' },
        ],
        geoCopy: "Pinterest uses four image formats: Standard Pins at 1000x1500 pixels (2:3), Square Pins at 1000x1000 pixels (1:1), Idea Pins at 1080x1920 pixels (9:16 full-screen vertical), and Board Covers at 1000x1000 pixels (1:1). The 2:3 vertical ratio is the gold standard for the main feed and is unique to Pinterest, while Idea Pins use the same 9:16 canvas as Stories and Reels. Tall images naturally dominate Pinterest's masonry grid layout, and pins with text overlays tend to perform better because they communicate the pin's value at a glance while scrolling.",
        faqs: [
            { q: 'What size is a Pinterest Pin?', a: 'The standard Pinterest Pin size is 1000 x 1500 pixels (2:3 ratio). This vertical format dominates the Pinterest masonry grid and gets the most visibility.' },
            { q: 'What size is a Pinterest Idea Pin?', a: 'Pinterest Idea Pins are 1080 x 1920 pixels (9:16) — the same full-screen vertical canvas as Instagram Stories and TikTok videos. Keep important elements centered to avoid the Pinterest UI overlays.' },
            { q: 'What size is a Pinterest Board Cover?', a: 'Pinterest Board Covers are 1000 x 1000 pixels (1:1 square). Pinterest displays the final cover at 222 x 150, but uploading at 1000 x 1000 preserves quality across desktop and mobile.' },
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
            "Top 150px is reserved for the profile/UI.",
            "Bottom 330px is reserved for the call-to-action.",
            "Geofilters must be transparent PNG.",
        ],
        templates: [
            { label: 'Profile Picture', width: 320, height: 320, desc: '1:1 • Bitmoji or photo', category: 'profile' },
            { label: 'Snap / Story / Ad', width: 1080, height: 1920, desc: '9:16 • Full screen', category: 'story' },
            { label: 'Geofilter', width: 1080, height: 2340, desc: '~21:9 • Transparent PNG, ≤300KB', category: 'ad' },
        ],
        geoCopy: "Snapchat uses three main image formats: Profile Pictures at 320x320 pixels (1:1, usually a Bitmoji or photo), Snaps, Stories, and Ads at 1080x1920 pixels (9:16), and Geofilters at 1080x2340 pixels saved as transparent PNG under 300KB. The Geofilter canvas is taller than a standard Snap because it has to cover edge-to-edge on modern tall phone screens, with roughly a 210 pixel buffer at the top and bottom. Snapchat is entirely full-screen vertical. The top 150 pixels are reserved for the profile/UI and the bottom 330 pixels are reserved for the call-to-action button, so always leave generous buffers in those zones and keep critical content centered.",
        faqs: [
            { q: 'What size is a Snapchat Profile Picture?', a: 'Snapchat Profile Pictures are 320 x 320 pixels (1:1). Most people use a Bitmoji, but a photo works at the same spec.' },
            { q: 'What size is a Snapchat Story?', a: 'Snapchat Stories and Ads are 1080 x 1920 pixels (9:16). Keep critical content centered — the top 150px and bottom 330px are reserved for Snapchat UI.' },
            { q: 'What size is a Snapchat Geofilter?', a: 'Snapchat Geofilters are 1080 x 2340 pixels and must be saved as a transparent PNG under 300KB. The canvas is taller than a standard Snap so it covers edge-to-edge on tall phone screens — leave roughly 210 pixels clear at the top and bottom.' },
        ],
    },
    {
        id: 'web',
        slug: 'og-image-templates',
        name: 'Web',
        icon: Globe,
        color: '#6366F1',
        brandColor: '#6366F1',
        bg: 'bg-indigo-50',
        intro: "Your link's first impression. The Open Graph image is the card that renders when your site is shared on iMessage, Slack, WhatsApp, Discord, LinkedIn, and X — design it once and it works everywhere.",
        metaTitle: "Open Graph Image Templates | Free OG Image, Favicon & Web Frames",
        metaDescription: "Free copy-ready SVG templates for your website's metadata. Perfectly sized frames for Open Graph images (1200x630), X summary cards, favicons (48x48), and Apple touch icons (180x180).",
        tips: [
            "Open Graph images are 1200x630 — keep text away from the edges, since some apps crop the card to a square.",
            "One og:image powers the preview on iMessage, Slack, WhatsApp, Discord, Facebook, and LinkedIn.",
            "Design favicons to read at 16px — simplify to a single shape or letter.",
        ],
        templates: [
            { label: 'Open Graph Image', width: 1200, height: 630, desc: '1.91:1 • Universal share card', category: 'web' },
            { label: 'X Summary Card', width: 1200, height: 628, desc: '1.91:1 • summary_large_image', category: 'web' },
            { label: 'Favicon', width: 48, height: 48, desc: '1:1 • Scales to 16/32', category: 'web' },
            { label: 'Apple Touch Icon', width: 180, height: 180, desc: '1:1 • iOS home screen', category: 'web' },
        ],
        geoCopy: "Websites need four key image sizes for sharing and branding: the Open Graph Image at 1200x630 pixels (1.91:1), which renders as the link-preview card across iMessage, Slack, WhatsApp, Discord, Facebook, and LinkedIn from a single og:image meta tag; the X Summary Card at 1200x628 pixels (1.91:1) for Twitter's summary_large_image; the Favicon at 48x48 pixels (1:1), which browsers scale down to 16 and 32 pixels in tabs and bookmarks; and the Apple Touch Icon at 180x180 pixels (1:1), shown when a site is saved to an iOS home screen. Keep important text and logos away from the edges of the Open Graph image because some apps crop it to a square, and simplify favicons to a single shape or letter so they stay legible at 16 pixels.",
        faqs: [
            { q: 'What size is an Open Graph (OG) image?', a: 'The standard Open Graph image is 1200 x 630 pixels (1.91:1 aspect ratio). This is the card shown when your link is shared on Facebook, LinkedIn, iMessage, Slack, WhatsApp, and Discord. Reference it with the og:image meta tag.' },
            { q: 'What size is a Twitter/X card image?', a: 'The X (Twitter) summary_large_image card is 1200 x 628 pixels (1.91:1) — effectively the same as a standard Open Graph image, so one 1200x630 graphic works for both.' },
            { q: 'What size should a favicon be?', a: 'Provide a favicon at 48 x 48 pixels and browsers will scale it down to 16 and 32 pixels for tabs and bookmarks. Keep the design to a single shape or letter so it stays clear at the smallest size.' },
            { q: 'What size is an Apple touch icon?', a: 'The Apple touch icon is 180 x 180 pixels (1:1). iOS uses it when someone saves your site to their home screen, applying rounded corners automatically.' },
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
        <text x="${cx}" y="${cy}" font-family="Arial" font-weight="bold" font-size="${width / 10}" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.2">CROP</text>
    </g>`;
    } else if (category === 'cover') {
        const profSize = height * 0.6;
        content += `
    <g id="${label} - Profile Pic Overlap (delete me)">
        <circle cx="${height * 0.2 + profSize / 2}" cy="${height - profSize / 3}" r="${profSize / 2}" fill="#1A1A1C" stroke="${color}" stroke-width="2" stroke-dasharray="4 4" opacity="0.7"/>
        <text x="${height * 0.2 + profSize / 2}" y="${height - profSize / 3}" font-family="Arial" font-size="${profSize / 5}" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.6">Profile Pic</text>
    </g>`;
    } else if (category === 'story') {
        const safeZoneH = 250;
        content += `
    <g id="${label} - UI Overlay Zones (delete me)">
        <rect x="0" y="0" width="${width}" height="${safeZoneH}" fill="${color}" fill-opacity="0.1"/>
        <line x1="0" y1="${safeZoneH}" x2="${width}" y2="${safeZoneH}" stroke="${color}" stroke-width="2" stroke-dasharray="10 5"/>
        <text x="${width / 2}" y="${safeZoneH / 2}" font-family="Arial" font-size="40" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.5">UI OVERLAY</text>
        <rect x="0" y="${height - safeZoneH}" width="${width}" height="${safeZoneH}" fill="${color}" fill-opacity="0.1"/>
        <line x1="0" y1="${height - safeZoneH}" x2="${width}" y2="${height - safeZoneH}" stroke="${color}" stroke-width="2" stroke-dasharray="10 5"/>
        <text x="${width / 2}" y="${height - (safeZoneH / 2)}" font-family="Arial" font-size="40" fill="${color}" text-anchor="middle" dominant-baseline="middle" opacity="0.5">UI OVERLAY</text>
    </g>`;
    }

    content += `
    <g id="${label} - Info (delete me)">
        <text x="50%" y="33%" font-family="Arial" font-weight="bold" font-size="${Math.max(24, width / 20)}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">${label}</text>
        <text x="50%" y="33%" font-family="Arial" font-size="${Math.max(16, width / 30)}" fill="${secondaryLabelColor}" text-anchor="middle" dominant-baseline="middle" dy="${Math.max(24, width / 20) * 1.2}">${width} x ${height} px</text>
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
        <text x="${width * 0.25}" y="${height * 0.75}" font-family="Arial" font-weight="bold" font-size="${width / 15}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">IMAGE 1</text>
        <text x="${width * 0.75}" y="${height * 0.25}" font-family="Arial" font-weight="bold" font-size="${width / 15}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">IMAGE 2</text>
        <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.3}" height="${height * 0.05}" fill="${brandColor}"/>
        <text x="${width * 0.25}" y="${height * 0.125}" font-family="Arial" font-weight="bold" font-size="${width / 30}" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${platformName.toUpperCase()}</text>
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
        <text x="${width / 2}" y="${splitY / 2}" font-family="Arial" font-weight="bold" font-size="${width / 12}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle" opacity="0.3">FEATURE IMAGE</text>
        <text x="${splitX / 2}" y="${splitY + (height - splitY) / 2}" font-family="Arial" font-weight="bold" font-size="${width / 20}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">DETAIL 1</text>
        <text x="${splitX + splitX / 2}" y="${splitY + (height - splitY) / 2}" font-family="Arial" font-weight="bold" font-size="${width / 20}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle">DETAIL 2</text>
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
        <text x="${width / 2}" y="${height / 2 - margin}" font-family="Arial" font-weight="bold" font-size="${width / 10}" fill="${labelColor}" text-anchor="middle" dominant-baseline="middle" opacity="0.1">PHOTO AREA</text>
        <line x1="${margin * 2}" y1="${height - margin * 3}" x2="${width - margin * 2}" y2="${height - margin * 3}" stroke="${brandColor}" stroke-width="4" stroke-linecap="round"/>
        <line x1="${margin * 2}" y1="${height - margin * 2}" x2="${width * 0.6}" y2="${height - margin * 2}" stroke="${brandColor}" stroke-width="2" stroke-linecap="round"/>
      </g>
    `;
    }

    return `<svg id="${platformName} ${styleName}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};
