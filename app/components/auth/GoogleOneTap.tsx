"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { useUser } from "../providers/UserProvider";

// --- Type declarations for Google Identity Services ---

interface GoogleCredentialResponse {
  credential: string;
}

interface PromptMomentNotification {
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  isSkippedMoment: () => boolean;
  getSkippedReason: () => string;
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          prompt: (callback: (notification: PromptMomentNotification) => void) => void;
        };
      };
    };
  }
}

/**
 * GoogleOneTap Component
 *
 * Initializes Google Identity Services and triggers the One Tap prompt.
 * Uses a ref guard to prevent React StrictMode double-initialization.
 */
export default function GoogleOneTap() {
  const initialized = useRef(false);
  const { setUser } = useUser();

  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        if (!res.ok) throw new Error(`Auth failed: ${res.status}`);

        const data = await res.json();
        console.log("Authenticated successfully:", data);

        // Persist user to global context + localStorage
        if (data.user) {
          setUser(data.user);
        }

      } catch (error) {
        console.error("Backend auth error:", error);
      }
    },
    [setUser]
  );

  const initializeOneTap = useCallback(() => {
    // Guard: prevent double-initialization from StrictMode or hot-reloads
    if (initialized.current || !window.google) return;
    initialized.current = true;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    console.log("[GoogleOneTap] client_id:", clientId); // Debug: confirm env var is loaded

    window.google.accounts.id.initialize({
      client_id: clientId ?? "",
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      prompt_parent_id: "oneTapPrompt",
      use_fedcm_for_prompt: true,
    });

    window.google.accounts.id.prompt((notification: PromptMomentNotification) => {
      if (notification.isNotDisplayed()) {
        console.warn("One Tap not displayed:", notification.getNotDisplayedReason());
      } else if (notification.isSkippedMoment()) {
        console.log("One Tap skipped:", notification.getSkippedReason());
      } else if (notification.isDismissedMoment()) {
        console.log("One Tap dismissed:", notification.getDismissedReason());
      }
    });
  }, [handleCredentialResponse]);

  // Fallback: if the script was cached and already loaded before mount
  useEffect(() => {
    if (window.google) {
      initializeOneTap();
    }
  }, [initializeOneTap]);

  return (
    <>
      <div id="oneTapPrompt" className="fixed top-20 right-4 z-[100]" />
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={initializeOneTap}
        strategy="afterInteractive"
      />
    </>
  );
}
