import type { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';

interface TipCalloutProps {
  children: ReactNode;
}

/**
 * The design tip banner at the top of a platform page.
 *
 * Filled with the platform accent rather than a tinted box, so the platform
 * colour is unmistakably present. The text token is --primary-foreground,
 * which resolves to near-black: measured against all 11 platform colours in
 * PLATFORMS, dark text wins every time (worst case 4.56:1 on Web indigo),
 * while white text fails AA on most of them and collapses on X and Threads
 * where the platform colour is white.
 */
export function TipCallout({ children }: TipCalloutProps) {
  return (
    <aside
      className="tip-callout mb-12 p-5 md:p-6 rounded-sm flex items-start gap-4 bg-primary text-primary-foreground animate-in fade-in slide-in-from-bottom-1 duration-700"
      data-testid="tip-callout"
    >
      <Lightbulb
        size={16}
        aria-hidden="true"
        className="tip-callout__icon flex-shrink-0 mt-0.5"
      />
      <p className="tip-callout__text text-[11px] font-bold uppercase tracking-wider leading-relaxed">
        {children}
      </p>
    </aside>
  );
}
