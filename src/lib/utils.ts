import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hexToHSL(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const COPY_COUNTS_KEY = 'copy_counts';

export function trackCopy(platformId: string, label: string) {
    const key = `${platformId}:${label}`;
    const counts = JSON.parse(localStorage.getItem(COPY_COUNTS_KEY) || '{}');
    counts[key] = (counts[key] || 0) + 1;
    localStorage.setItem(COPY_COUNTS_KEY, JSON.stringify(counts));
}


/** Allowlisted SVG elements — anything not on this list gets removed. */
const ALLOWED_ELEMENTS = new Set([
    'svg', 'g', 'defs', 'clippath', 'mask', 'use', 'symbol',
    'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'path',
    'text', 'tspan', 'textpath',
    'lineargradient', 'radialgradient', 'stop', 'pattern',
    'filter', 'fegaussianblur', 'feoffset', 'feblend', 'fecolormatrix',
    'fecomposite', 'feflood', 'femerge', 'femergenode',
    'image', 'title', 'desc',
]);

/** Dangerous attribute prefixes and values */
const DANGEROUS_ATTR_RE = /^on/i;
const DANGEROUS_VALUE_RE = /javascript:|data:\s*text\/html|data:\s*image\/svg/i;

export function sanitizeSVG(svg: string): string {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');

        // Check for parse errors
        const parseError = doc.querySelector('parsererror');
        if (parseError) {
            return '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
        }

        // Remove any element not in the allowlist
        const allElements = Array.from(doc.querySelectorAll('*'));
        for (const el of allElements) {
            if (!ALLOWED_ELEMENTS.has(el.tagName.toLowerCase())) {
                el.remove();
                continue;
            }

            // Scrub dangerous attributes
            for (const attr of Array.from(el.attributes)) {
                const name = attr.name.toLowerCase();
                const val = attr.value;

                if (
                    DANGEROUS_ATTR_RE.test(name) ||
                    name === 'href' && DANGEROUS_VALUE_RE.test(val) ||
                    name === 'xlink:href' && DANGEROUS_VALUE_RE.test(val) ||
                    DANGEROUS_VALUE_RE.test(val)
                ) {
                    el.removeAttribute(attr.name);
                }
            }
        }

        return new XMLSerializer().serializeToString(doc.documentElement);
    } catch {
        // If anything goes wrong, return an empty SVG
        return '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    }
}

// Word-prefix search: every query word must prefix-match a word in the
// haystack, so "x" finds "X (Twitter)" without matching every string that
// merely contains an x. Same logic as the Figma plugin search.
export function matchesQuery(query: string, haystack: string): boolean {
    const tokens = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const queryWords = tokens(query);
    const hayWords = tokens(haystack);
    return queryWords.every(qw => hayWords.some(hw => hw.startsWith(qw)));
}

/**
 * Return a variant of an "H S% L%" theme colour that is legible as text on the
 * dark surfaces (background #050506, card #0A0A0B).
 *
 * Platform brand colours are chosen for identity, not for contrast, so some
 * of them (indigo, mid-blue) land just under WCAG AA when used as text. Rather
 * than hand-tuning each platform, the accent is lifted in lightness until it
 * passes. Colours that already pass are returned unchanged, so brand fidelity
 * is preserved wherever possible.
 *
 * 4.5:1 is the AA floor for normal text. Against the card surface, the
 * strictest of the dark surfaces.
 */
export function readableHSL(hsl: string, minRatio = 4.5): string {
    const m = hsl.match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
    if (!m) return hsl;
    const h = parseFloat(m[1]), s = parseFloat(m[2]) / 100;
    const l = parseFloat(m[3]) / 100;

    const surface: [number, number, number] = [10, 10, 11]; // --card, the lightest dark surface
    const lum = ([r, g, b]: [number, number, number]) => {
        const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ratio = (rgb: [number, number, number]) => {
        const a = lum(rgb), b = lum(surface);
        const hi = Math.max(a, b), lo = Math.min(a, b);
        return (hi + 0.05) / (lo + 0.05);
    };
    const toRGB = (lightness: number): [number, number, number] => {
        const q = lightness < 0.5 ? lightness * (1 + s) : lightness + s - lightness * s;
        const pp = 2 * lightness - q;
        const chan = (t: number) => {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1 / 6) return pp + (q - pp) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return pp + (q - pp) * (2 / 3 - t) * 6;
            return pp;
        };
        const hn = h / 360;
        return [chan(hn + 1 / 3) * 255, chan(hn) * 255, chan(hn - 1 / 3) * 255];
    };

    if (ratio(toRGB(l)) >= minRatio) return hsl;
    let lo = l, hi = 1;
    for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        if (ratio(toRGB(mid)) < minRatio) lo = mid; else hi = mid;
    }
    const newL = Math.ceil(hi * 100);
    return `${m[1]} ${m[2]}% ${newL}%`;
}
