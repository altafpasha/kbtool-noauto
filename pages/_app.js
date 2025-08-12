import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import Script from 'next/script';
import { io } from 'socket.io-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    // Connect to WebSocket server
    fetch('/api/socket');
    const socket = io({ path: '/api/socket_io' });

    socket.on('shutdown', () => {
      window.location.href = '/maintenance';
    });

    socket.on('resume', () => {
      window.location.href = '/';
    });

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      socket.disconnect();
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <script
        defer
        src="https://umami-m084wo8o0k0skog4cswwo0co.codesec.me/script.js"
        data-website-id="e334b626-f7dc-49f2-88f0-954337adfa5b"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default MyApp;
