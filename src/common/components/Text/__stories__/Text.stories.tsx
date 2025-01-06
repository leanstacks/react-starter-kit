import type { Meta, StoryObj } from '@storybook/react';

import Text from '../Text';

const meta = {
  title: 'Common/Text/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    variant: { description: 'Optional. The style variant.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: { children: 'I am the text.' },
};

export const Styled: Story = {
  args: { children: 'I am the text.', className: 'text-red-600' },
};
