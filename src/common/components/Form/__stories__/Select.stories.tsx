import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { default as MySelect } from '../Select';
import { SelectProps } from '../Select';

const formSchema = object({
  color: string().required('Required. ').oneOf(['blue', 'green'], 'Must be blue or green. '),
});

type FormValues = InferType<typeof formSchema>;

/**
 * A wrapper for the `Select` component.  Provides the RHF form `control`
 * to the `Select` component.
 */
const Select = (props: Omit<SelectProps<FormValues>, 'control'>) => {
  const form = useForm({
    defaultValues: {
      color: '',
    },
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form className="w-96" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <MySelect control={form.control} {...props}></MySelect>
    </form>
  );
};

const meta = {
  title: 'Common/Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    control: {
      description: 'Object containing methods for registering components into React Hook Form.',
    },
    label: { description: 'The field label.' },
    name: { description: 'The form field name.' },
    supportingText: { description: 'Additional field instructions.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof MySelect>;

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
    name: 'color',
    label: 'Color',
  },
};

export const Required: Story = {
  args: {
    children: options,
    name: 'color',
    label: 'Color',
    required: true,
  },
};
