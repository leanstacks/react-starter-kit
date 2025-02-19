import type { Meta, StoryObj } from '@storybook/react';

import DialogButton from '../DialogButton';

const meta = {
  title: 'Common/Dialog/DialogButton',
  component: DialogButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
    variant: { description: 'The variant.' },
  },
  args: {
    children: 'Label',
    variant: 'primary',
  },
} satisfies Meta<typeof DialogButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};
