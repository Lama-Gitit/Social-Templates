Here is a concrete, GDPR-friendly Vercel Analytics setup for a Next.js 14 App Router project, including consent gating and URL filtering.

1. Install and basic wiring
bash
pnpm add @vercel/analytics
# or
npm install @vercel/analytics
In app/layout.tsx (or app/layout.ts):

tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { VercelAnalyticsConsent } from "@/components/analytics/vercel-analytics-consent";

export const metadata: Metadata = {
  title: "My App",
  description: "GDPR-aware Vercel Analytics example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Only loads analytics if consent is granted */}
        <VercelAnalyticsConsent />
      </body>
    </html>
  );
}
This keeps analytics wiring in the root layout, but the actual <Analytics /> is gated by a dedicated client component.

2. Consent utility (reads your cookie/LS)
Example minimal implementation; replace with your real consent logic or your existing CMP hook.

ts
// lib/client-cookie-utils.ts
"use client";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_STORAGE_KEY = "cookie-consent";

export function getConsentState(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function shouldShowAnalytics(): boolean {
  const state = getConsentState();
  return Boolean(state?.analytics);
}
Your cookie banner should write a JSON blob like:

ts
// Somewhere in your cookie banner accept handler
window.localStorage.setItem(
  "cookie-consent",
  JSON.stringify({
    necessary: true,
    analytics: true,
    marketing: false,
  }),
);

// Notify other tabs / listeners that consent changed
window.dispatchEvent(new Event("consentUpdated"));
This mirrors the pattern used in production examples.

3. Consent-gated Analytics component
This is the main piece that ensures Vercel Analytics only runs when consent is granted and also re-checks consent in beforeSend to block events if the user later opts out.

tsx
// components/analytics/vercel-analytics-consent.tsx
"use client";

import { useEffect, useState } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { shouldShowAnalytics } from "@/lib/client-cookie-utils";

export function VercelAnalyticsConsent() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial consent read after hydration
  useEffect(() => {
    setHasConsent(shouldShowAnalytics());
    setIsLoaded(true);
  }, []);

  // Listen for consent changes (e.g. from banner or other tabs)
  useEffect(() => {
    const handleConsentChange = () => {
      setHasConsent(shouldShowAnalytics());
    };

    window.addEventListener("storage", handleConsentChange);
    window.addEventListener("consentUpdated", handleConsentChange);

    return () => {
      window.removeEventListener("storage", handleConsentChange);
      window.removeEventListener("consentUpdated", handleConsentChange);
    };
  }, []);

  // Final guard before sending any event
  const handleBeforeSend = (event: BeforeSendEvent) => {
    // If user revoked consent, drop all events
    if (!shouldShowAnalytics()) {
      return null;
    }

    // Optionally redact or drop sensitive URLs
    if (event.url.includes("/admin") || event.url.includes("/settings")) {
      return null;
    }

    // You can also strip query params or hashes if you ever encode IDs there
    try {
      const url = new URL(event.url);
      url.search = "";
      url.hash = "";
      return { ...event, url: url.toString() };
    } catch {
      return event;
    }
  };

  // Don’t render anything until we know consent status and it is granted
  if (!isLoaded || !hasConsent) return null;

  return (
    <Analytics
      beforeSend={handleBeforeSend}
      debug={process.env.NODE_ENV === "development"}
    />
  );
}
This follows the pattern recommended in detailed guides on GDPR-safe Vercel Analytics and uses the officially documented beforeSend API.

4. Minimal cookie banner wiring (example)
If you do not yet have a CMP, a simple banner component can set consent and trigger the events that the analytics wrapper listens to.

tsx
// components/cookies/banner.tsx
"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (!existing) setVisible(true);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
      }),
    );
    window.dispatchEvent(new Event("consentUpdated"));
    setVisible(false);
  };

  const rejectAnalytics = () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      }),
    );
    window.dispatchEvent(new Event("consentUpdated"));
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-50 rounded-md border bg-white p-4 shadow-lg">
      <p className="text-sm">
        We use cookies for essential site functionality and, with your consent,
        anonymous analytics.
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          onClick={rejectAnalytics}
          className="rounded border px-3 py-1 text-sm"
        >
          Only necessary
        </button>
        <button
          onClick={acceptAll}
          className="rounded bg-black px-3 py-1 text-sm text-white"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
Include it in app/layout.tsx:

tsx
import { CookieBanner } from "@/components/cookies/banner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieBanner />
        <VercelAnalyticsConsent />
      </body>
    </html>
  );
}
This gives you an end‑to‑end example: cookie banner → consent state in localStorage → consent-aware analytics loading → beforeSend guard and URL redaction, all compatible with Next.js 14 App Router.

Do you already have a specific consent manager (Cookiebot, CookieYes, etc.) that you want this integrated with, or are you fine rolling this lightweight custom version?