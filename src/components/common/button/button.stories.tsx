import Button from '@/components/common/button/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: '버튼',
  component: Button,
  argTypes: {
    label: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'full'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'selected', 'disabled'],
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
  args: {
    label: 'Button',
    size: 'sm',
    variant: 'default',
  },
};
