import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../Alert';
import FAIcon from '../../Icon/FAIcon';

const meta = {
  title: 'Common/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The Alert content.',
      control: { type: 'select' },
      options: ['Icon', 'No_Icon'],
      mapping: {
        Icon: (
          <>
            <FAIcon icon="circleExclamation" />
            <div>This is an alert with an icon.</div>
          </>
        ),
        No_Icon: <>This is an alert with only text.</>,
      },
    },
    className: { description: 'Additional CSS classes.' },
    variant: { description: 'The Alert variant.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    children: 'Icon',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};
