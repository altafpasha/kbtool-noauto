// next.config.mjs
const nextConfig = {
    // ... your existing config
    serverRuntimeConfig: {
      // Will only be available on the server side
      ADMIN_SECRET: process.env.ADMIN_SECRET,
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    async headers() {
      return [
        {
          source: '/sw.js',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
