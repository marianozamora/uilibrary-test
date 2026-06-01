import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'app/components/atoms/**/*.tsx',
        'app/components/molecules/**/*.tsx',
        'app/components/organisms/**/*.tsx',
        'app/theme/**/*.ts',
      ],
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.test.ts',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@theme': path.resolve(__dirname, './app/theme/index.ts'),
      '@data': path.resolve(__dirname, './app/data'),
    },
  },
})
