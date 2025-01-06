import type { Meta, StoryObj } from '@storybook/react';

import LoaderSkeleton from '../LoaderSkeleton';

const meta = {
  title: 'Common/Loader/LoaderSkeleton',
  component: LoaderSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof LoaderSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    className: 'h-4 w-64',
  },
};

export const Height: Story = {
  args: {
    className: 'h-24 w-64',
  },
};

export const Width: Story = {
  args: {
    className: 'h-4 w-96',
  },
};

export const BackgroundColor: Story = {
  args: {
    className: 'h-4 w-64 bg-sky-200',
  },
};
