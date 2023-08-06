/// <reference types="vite-plugin-svgr/client" />

declare interface ImportMeta {
  env: {
    MODE: 'development' | 'test' | 'release';
  };
}

declare module '*.css';
