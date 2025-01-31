import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import Input from '../Input';

const meta = {
  title: 'Common/Form/Input',
  component: Input,
  decorators: [
    (Story) => {
      const formMethods = useForm({ defaultValues: { color: '' } });
      return (
        <FormProvider {...formMethods}>
          <form className="w-80">
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    label: { description: 'The field label.' },
    name: { description: 'The form field name.' },
    supportingText: { description: 'Additional field instructions.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSupportingText: Story = {
  args: {
    name: 'color',
    label: 'Color',
    supportingText: 'Enter your favorite color.',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'color',
    label: 'Color',
  },
};
