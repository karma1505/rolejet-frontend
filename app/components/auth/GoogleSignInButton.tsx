'use client';

import { useCallback, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useUser } from '../providers/UserProvider';

interface GoogleCredentialResponse {
  credential: string;
}



export default function GoogleSignInButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { loginWithCredential } = useUser();
  const initialized = useRef(false);

  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      await loginWithCredential(response.credential);
    },
    [loginWithCredential]
  );

  const renderGoogleButton = useCallback(() => {
    if (!window.google || !containerRef.current) return;

    // We initialize again just in case One Tap hasn't yet, or we're on a page without it.
    // Calling initialize multiple times with the same client_id is safe.
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    window.google.accounts.id.initialize({
      client_id: clientId ?? "",
      callback: handleCredentialResponse,
    });

    // Render the actual button
    (window as any).google.accounts.id.renderButton(containerRef.current, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
    });
    
    initialized.current = true;
  }, [handleCredentialResponse]);

  // Fallback for when the script caches and mounts immediately
  useEffect(() => {
    if (window.google) {
      renderGoogleButton();
    }
  }, [renderGoogleButton]);

  return (
    <>
      <div ref={containerRef} className="h-10 flex items-center justify-center overflow-hidden rounded-md" />
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={renderGoogleButton}
        strategy="afterInteractive"
      />
    </>
  );
}
