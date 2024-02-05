import type { Meta, StoryObj } from '@storybook/react';
import Tag from '@/components/tag/tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    className: {
      control: 'radio',
      options: [
        'bg-button_default_bg text-text_primary',
        'bg-tag_blue_bg text-tag_blue_text',
        'bg-tag_orange_bg text-tag_orange_text',
        'bg-tag_yellow_bg text-tag_red_text',
        'bg-tag_yellow_bg text-tag_yellow_text',
        'bg-button_default_bg text-error',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TagStory: Story = {
  args: {
    children: 'Tag',
    size: 'sm',
    className: 'bg-button_default_bg text-text_primary',
  },
};
