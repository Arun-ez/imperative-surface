import fs from 'node:fs';
import path from 'node:path';
import * as vite from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default vite.defineConfig({
    plugins: [
        react(),
        dts({ insertTypesEntry: true }),
        cssInjectedByJsPlugin(),
        {
            name: 'move-use-client-to-top',

            writeBundle(options) {
                const outDir = options.dir || 'dist';
                const filePath = path.resolve(
                    outDir,
                    'imperative-surface.mjs'
                );

                if (!fs.existsSync(filePath)) {
                    return;
                }

                let code = fs.readFileSync(filePath, 'utf8');

                code = code.replace(
                    /^\s*['"]use client['"];?\s*/gm,
                    ''
                );

                code = `'use client';\n${code}`;

                fs.writeFileSync(filePath, code);
            },
        },
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
                entryFileNames: 'imperative-surface.mjs',
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                }
            },
        },
    },
});