import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { name } from './package.json';
import dts from "vite-plugin-dts";

const getPackageName = () => {
  return name.includes('@') ? name.split('/')[1] : name;
};

const NAME = 'CubicBezier';

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.js`,
};

export default defineConfig({
  base: './',
  plugins: [
    dts({
      outDir: 'dist',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => fileName[format],
    },
    sourcemap: true,
  },
});
