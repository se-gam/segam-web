import React from 'react';
import type { Preview } from '@storybook/react';
import '@/app/global.css';

export const withDecorator = (Story) => (
  <div
    style={{
      width: '390px',
      height: '844px',
      padding: '16px',
      backgroundColor: '#F7F6F5',
    }}
  >
    <Story />
  </div>
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [withDecorator],
};

export default preview;
