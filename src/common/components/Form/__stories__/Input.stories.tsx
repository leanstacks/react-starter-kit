import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { default as MyInput } from '../Input';
import { InputProps } from '../Input';

const formSchema = object({
  color: string().required('Required'),
});

type FormValues = InferType<typeof formSchema>;

/**
 * A wrapper for the `Input` component.  Provides the RHF form `control`
 * to the `Input` component.
 */
const Input = (props: Omit<InputProps<FormValues>, 'control'>) => {
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
      <MyInput control={form.control} {...props} />
    </form>
  );
};

const meta = {
  title: 'Common/Form/Input',
  component: Input,
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
} satisfies Meta<typeof MyInput>;

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

export const Required: Story = {
  args: {
    name: 'color',
    label: 'Color',
    required: true,
  },
};
