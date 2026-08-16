import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/CrackDown/',

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                character: resolve(__dirname, 'character.html')
            }
        }
    }
});