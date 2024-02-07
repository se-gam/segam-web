import Tag from '@/components/tag/tag';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  title: '태그',
  component: Tag,
  argTypes: {
    label: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'done', 'warning', 'orange', 'yellow', 'danger'],
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagStory: Story = {
  args: {
    label: 'Tag',
    size: 'sm',
    variant: 'default',
  },
};
