import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path'

export default defineConfig({
    plugins: [dts({rollupTypes: true, outDir: 'dist/types'})],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'fsUtilsLib',
            fileName: (format) => `fs-utils-lib.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
