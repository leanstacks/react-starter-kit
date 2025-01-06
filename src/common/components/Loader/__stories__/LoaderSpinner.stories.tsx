import type { Meta, StoryObj } from '@storybook/react';

import LoaderSpinner from '../LoaderSpinner';

const meta = {
  title: 'Common/Loader/LoaderSpinner',
  component: LoaderSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    icon: { description: 'Optional. The icon name.' },
    iconClassName: { description: 'Optional. CSS class names for the icon.' },
    testId: { description: 'The test identifier.' },
    text: { description: 'Optional. The loader text.' },
    textClassName: { description: 'Optional. CSS class names for the text.' },
  },
} satisfies Meta<typeof LoaderSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Larger: Story = {
  args: {
    iconClassName: 'text-2xl',
  },
};

export const Colored: Story = {
  args: {
    iconClassName: 'text-blue-600',
  },
};

export const WithText: Story = {
  args: {
    text: 'Engaging warp engines Captain...',
  },
};

export const WithAlternativeIcon: Story = {
  args: {
    icon: 'circleXmark',
  },
};
