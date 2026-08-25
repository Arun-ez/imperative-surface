import * as vite from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default vite.defineConfig({
    plugins: [
        react(),
        dts({ insertTypesEntry: true }),
        cssInjectedByJsPlugin()
    ],
    build: {
        target: 'esnext',
        emptyOutDir: true,
        lib: {
            entry: 'src/index.ts',
            name: 'ImperativeSurface',
            fileName: 'imperative-surface',
            formats: ['es']
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-dom/client'],
            output: {
                banner: "'use client';",
                entryFileNames: 'imperative-surface.mjs',
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});