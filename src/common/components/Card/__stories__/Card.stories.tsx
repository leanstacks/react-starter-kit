import type { Meta, StoryObj } from '@storybook/react';

import Card from '../Card';

const meta = {
  title: 'Common/Card/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content.',
      control: { type: 'select' },
      options: ['TextContent', 'ComplexContent'],
      mapping: {
        TextContent: 'This is a card with plain text content.',
        ComplexContent: (
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">Card Title</div>
            <div>This is a card with more complex content.</div>
            <div>You may pass any desired content as children to the Card component.</div>
          </div>
        ),
      },
    },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: 'ComplexContent',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    children: 'TextContent',
  },
};

export const Complex: Story = {};

export const Styled: Story = {
  args: {
    className: 'bg-blue-600/80 text-white',
  },
};
