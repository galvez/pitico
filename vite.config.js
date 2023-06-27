import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'node18',
    lib: {
      formats: ['esm', 'cjs'],
      entry: resolve(__dirname, 'index.js'),
      name: 'jtdify',
      fileName: 'jtdify',
    },
    rollupOptions: {
      external: [
        'node:http',
        'jsontypedef',
        'light-my-request',
        'raw-body',
        'ajv/dist/jtd.js'
      ],
    },
  },
})
