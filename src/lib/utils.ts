import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
