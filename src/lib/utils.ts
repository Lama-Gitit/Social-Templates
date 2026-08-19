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
