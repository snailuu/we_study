import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    base: './',
    server: {
        host: '0.0.0.0',
        port: 8888,
    },
    build: {
        outDir: 'dist',
    },
});