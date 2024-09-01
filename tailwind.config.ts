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
      flexGrow: {
        '5.5': '5.5',
        '4.5': '4.5',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.625rem',
        lg: '0.75rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      colors: {
        theme_primary: '#626FE5',
        theme_secondary: '#4A82EE',
        theme_tertiary: '#B0B8C1',
        theme_accent: '#191F28',
        nav_bg: '#FCFCFC',
        text_primary: '#4E5968',
        text_secondary: '#979799',
        text_placeholder: '#B8B8B8',
        app_bg: '#F7F6F5',
        button_default_bg: '#F2F4F6',
        button_default_text: '#D9D9D9',
        tag_blue_bg: '#D6E6FD',
        tag_deep_blue_bg: '#B5D9FF',
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
        roulette_bg: 'rgba(150, 201, 255, 0.5)',
        bg_chicken: '#DEB292',
        bg_cake: '#DC90A4',
        bg_frenchFries: '#DCBEC5',
        bg_hamburger: '#F4A374',
        bg_hotdog: '#FFA868',
        bg_pizza: '#FFBC8E',
        bg_kebab: '#DB9849',
        bg_noodle: '#ECBF6A',
        bg_sushi: '#FF7E76',
        bg_bibimbab: '#B7CA93',
        bg_corndog: '#C4B07E',
        bg_jjigae: '#C15B5B',
        bg_kimbab: '#959595',
        bg_pudding: '#C9C15B',
        bg_ramen: '#E9C690',
        bg_stick: '#E2B29D',
        bg_tteokguk: '#F5E5A0',
        bg_yackgwa: '#FFE5C4',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(30%)' },
          '100%': { transform: 'translateX(-30%)' },
        },
        slide_reverse: {
          '0%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(30%)' },
        },
        slideIn: {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(49.65%)' },
        },
      },
      animation: {
        slide: 'slide 60s infinite linear',
        slide_reverse: 'slide_reverse 60s infinite linear',
        slide_forever: 'slideIn 300s infinite linear',
        slideIn: 'slideIn 3s',
      },
    },
  },

  plugins: [],
};
export default config;
