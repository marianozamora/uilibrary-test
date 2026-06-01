import type { Config } from 'tailwindcss'
import { fontFamilies } from './app/theme/tokens'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-display': [...fontFamilies.serif],
        'mono-code':     [...fontFamilies.mono],
      },
    },
  },
  plugins: [],
}
export default config
