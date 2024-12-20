import type { Meta, StoryObj } from '@storybook/react';

import DialogHeading from './DialogHeading';

const meta = {
  title: 'Common/Dialog/DialogHeading',
  component: DialogHeading,
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
    children: 'Are you sure?',
  },
} satisfies Meta<typeof DialogHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Confirm: Story = {};

export const Info: Story = {
  args: {
    children: (
      <>
        <span className="font-bold">About:</span> Widgets
      </>
    ),
  },
};
