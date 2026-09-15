import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                character: resolve(__dirname, 'character.html'),
                path: resolve(__dirname, 'path.html')
            }
        }
    }
});