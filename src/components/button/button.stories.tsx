import Button from '@/components/button/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: '버튼',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'full'],
    },
    accent: {
      control: 'boolean',
      options: ['true', 'false'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
  args: {
    children: 'Button',
    size: 'sm',
    accent: false,
  },
};
