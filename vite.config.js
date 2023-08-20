import path from 'node:path';
import { loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

const CWD = process.cwd();

export default (params) => {
  const { mode } = params;
  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@/assets': path.resolve(__dirname, './src/assets'),
        '@/routes': path.resolve(__dirname, './src/routes'),
        '@/pages': path.resolve(__dirname, './src/pages'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/styles': path.resolve(__dirname, './src/styles'),
        '@/layouts': path.resolve(__dirname, './src/layouts'),
        '@/requests': path.resolve(__dirname, './src/requests'),
      },
    },

    plugins: [svgr(), react()],

    build: {
      cssCodeSplit: false,
    },

    server: {
      host: '0.0.0.0',
      port: 1003,
    },
  };
};
