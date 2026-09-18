import { useEffect, useRef } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleSignInButton({ onCredential, onError }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      onError?.('Google sign-in is not configured (missing VITE_GOOGLE_CLIENT_ID).');
      return;
    }

    let cancelled = false;

    function init() {
      if (cancelled || !window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => onCredential(response.credential),
      });

      if (buttonRef.current) {
        // Size to the actual available width (capped at Google's 400px max)
        // instead of a hardcoded value, so it never overflows on narrow phones.
        const width = Math.min(400, buttonRef.current.offsetWidth || 300);
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width,
        });
      }
    }

    if (window.google?.accounts?.id) {
      init();
    } else {
      // The GSI script loads async — poll briefly until it's ready.
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }
  }, [onCredential, onError]);

  return <div ref={buttonRef} className="w-full flex justify-center" />;
}

export default GoogleSignInButton;
