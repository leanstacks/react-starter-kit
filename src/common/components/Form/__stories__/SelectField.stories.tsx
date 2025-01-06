import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import SelectField, { SelectFieldOption } from '../SelectField';

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
    label: { description: 'The field label.' },
    name: { description: 'The form field name.' },
    onChange: { description: 'A function called when the value changes.' },
    options: { description: 'The collection of available options.' },
    supportingText: { description: 'Additional field instructions.' },
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
