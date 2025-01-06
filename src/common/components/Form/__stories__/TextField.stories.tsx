import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import TextField from '../TextField';

const meta = {
  title: 'Common/Form/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <Formik initialValues={{ myField: '' }} onSubmit={() => {}}>
        {() => (
          <Form className="w-72">
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
    supportingText: { description: 'Additional field instructions.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSupportingText: Story = {
  args: {
    name: 'myField',
    label: 'Name',
    supportingText: 'Enter your full name.',
  },
};

export const WithLabel: Story = {
  args: {
    name: 'myField',
    label: 'Name',
  },
};
