import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-refresh';

import laravel from 'laravel-vite-plugin';
export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/jsx/main.jsx',
            ],
            refresh: true,
        }),
    ], build: {
        outDir: 'dist', // Ensure this is set to 'dist'
    },
});
