import Input from '@/components/common/input/input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'input',
  component: Input,
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
    },
    type: {
      control: 'radio',
      options: ['text', 'textarea'],
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const InputStory: Story = {
  args: {
    value: '',
    type: 'text',
  },
};
