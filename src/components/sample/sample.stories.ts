import type { Meta, StoryObj } from '@storybook/react';
import Sample from '@/components/sample/sample';

const meta: Meta<typeof Sample> = {
  component: Sample,
  argTypes: {
    label: {
      control: 'text',
    },
    type: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sample>;

export const SampleStory: Story = {
  args: {
    label: 'Sample',
    type: 'primary',
  },
};
