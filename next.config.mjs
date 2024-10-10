import { withSentryConfig } from '@sentry/nextjs';
import withPWA from 'next-pwa';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/matchHistory',
        destination: 'https://www.aom.gg/api/matchHistory',
      },
      {
        source: '/api/getRecentMatchHistory',
        destination: 'https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory',
      },
    ];
  },
  env: {
    API_SECRET_KEY: process.env.API_SECRET_KEY,
  },
};

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
};

const withPWAConfig = withPWA(pwaConfig)(nextConfig);

const sentryWebpackPluginOptions = {
  org: 'khani-tv',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default withSentryConfig(withPWAConfig, sentryWebpackPluginOptions);