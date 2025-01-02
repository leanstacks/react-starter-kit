import type { Meta, StoryObj } from '@storybook/react';

import SelectField, { SelectFieldOption } from './SelectField';
import { Form, Formik } from 'formik';

const meta = {
  title: 'Common/Form/SelectField',
  component: SelectField,
  decorators: [
    (Story) => (
      <Formik initialValues={{ myField: '' }} onSubmit={() => {}}>
        {() => (
          <Form className="w-60">
            <Story />
          </Form>
        )}
      </Formik>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: SelectFieldOption[] = [
  { label: 'Apples', value: 'apples' },
  { label: 'Bananas', value: 'bananas' },
  { label: 'Grapes', value: 'grapes' },
];

export const WithSupportingText: Story = {
  args: {
    name: 'myField',
    label: 'Fruit',
    options,
    supportingText: 'Select a fruit for your salad.',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'myField',
    label: 'Fruit',
    options,
  },
};
