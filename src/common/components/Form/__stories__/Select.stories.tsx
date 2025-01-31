import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import Select from '../Select';

const meta = {
  title: 'Common/Form/Select',
  component: Select,
  decorators: [
    (Story) => {
      const formMethods = useForm({ defaultValues: { color: 'blue' } });
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
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="red">Red</option>
  </>
);

export const WithSupportingText: Story = {
  args: {
    children: options,
    name: 'color',
    label: 'Color',
    supportingText: 'Choose a color.',
  },
};

export const WithLabel: Story = {
  args: {
    children: options,
    name: 'myField',
    label: 'Fruit',
  },
};
