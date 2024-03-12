import {defineConfig} from "vitest/config";

export default defineConfig({
  optimizeDeps: {
    include: ["vitest > @vitest/expect > chai"]
  },
  esbuild: false,
  test: {
    environment: 'jsdom',
    deps: {
      interopDefault: true
    },
    alias: {
      "@/utils":  new URL('./dist/cjs/utils.js', import.meta.url).pathname,
      "@/": new URL('./dist/cjs/', import.meta.url).pathname,
      "@/buffers": new URL('./dist/cjs/buffers.js', import.meta.url).pathname
    },
    browser: {
      name: 'chrome',
      enabled: true,
    }

  }
});