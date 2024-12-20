import type { Meta, StoryObj } from '@storybook/react';

import Divider from './Divider';

const meta = {
  title: 'Common/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {};

export const Colored: Story = {
  args: {
    className: '!border-blue-600',
  },
};

export const Thick: Story = {
  args: {
    className: 'border-4',
  },
};
