import type { Meta, StoryObj } from '@storybook/react';

import Badge from '../Badge';

const meta = {
  title: 'Common/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: '3',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Counter: Story = {
  args: {
    children: '99+',
  },
};

export const Label: Story = {
  args: {
    children: 'NEW',
    className: '!bg-blue-700',
  },
};
