import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import { ToastDetail } from 'common/providers/ToastsContext';

import Toast from './Toast';
import ConfigContextProvider from 'common/providers/ConfigProvider';

const meta = {
  title: 'Common/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <ConfigContextProvider>
          <Story />
        </ConfigContextProvider>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    dismiss: { description: 'A function called when the Toast dismisses.' },
    testId: { description: 'The test identifier.' },
    toast: { description: 'The Toast.' },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const toast: ToastDetail = {
  id: '1',
  text: 'The toast message.',
  createdAt: dayjs().toISOString(),
  isAutoDismiss: false,
};

export const Simple: Story = {
  args: { dismiss: () => {}, toast },
};
