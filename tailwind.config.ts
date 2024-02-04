import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.75rem',
        lg: '1.25rem',
        full: '9999px',
      },
      colors: {
        theme_primary: '#626FE5',
        theme_secondary: '#4A82EE',
        theme_tertiary: '#B0B8C1',
        theme_accent: '#191F28',
        text_primary: '#4E5968',
        text_secondary: '#979799',
        text_placeholder: '#B8B8B8',
        app_bg: '#F7F6F5',
        button_default_bg: '#F2F4F6',
        button_default_text: '#D9D9D9',
        tag_blue_bg: '#D6E6FD',
        tag_blue_text: '#3281F7',
        tag_red_bg: '#FCDADC',
        tag_red_text: '#F04452',
        icons_bg: '#DEE9FD',
        card_bg: '#ffffff',
        error: '#DA4237',
        tag_yellow_bg: '#FAF6CF',
        tag_yellow_text: '#1C2B36',
        tag_orange_bg: '#FCDDC7',
        tag_orange_text: '#8F3415',
        timeline_bg: '#DFE4E8',
      },
    },
  },
  plugins: [],
};
export default config;
