import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sanitizeSVG(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    doc.querySelectorAll('script, set, animate, animateTransform, animateMotion, foreignObject').forEach(s => s.remove());
    doc.querySelectorAll('*').forEach(el => {
        for (const attr of Array.from(el.attributes)) {
            const val = attr.value.toLowerCase();
            if (attr.name.startsWith('on') || val.includes('javascript:') || val.includes('data:text/html')) {
                el.removeAttribute(attr.name);
            }
        }
    });
    return new XMLSerializer().serializeToString(doc.documentElement);
}
