import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../Alert';
import FAIcon from '../../Icon/FAIcon';
import AlertContent from '../AlertContent';
import AlertHeader from '../AlertHeader';
import AlertTitle from '../AlertTitle';
import AlertDescription from '../AlertDescription';

const meta = {
  title: 'Common/Alert/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    variant: {
      description: 'Optional. The style variant.',
      control: { type: 'select' },
      options: ['danger', 'info', 'success', 'warning'],
    },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconOnLeft: Story = {
  render: (args) => (
    <Alert {...args}>
      <FAIcon icon="circleExclamation" size="lg" />
      <AlertContent>
        <AlertHeader>
          <AlertTitle>Something unexpected has happened!</AlertTitle>
        </AlertHeader>
        <AlertDescription>
          Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
          exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
          exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit qui.
          Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque incididunt.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const IconInHeader: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertContent>
        <AlertHeader>
          <FAIcon icon="circleExclamation" size="lg" />
          <AlertTitle>Something unexpected has happened!</AlertTitle>
        </AlertHeader>
        <AlertDescription>
          Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
          exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
          exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit qui.
          Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque incididunt.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const NoIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertContent>
        <AlertHeader>
          <AlertTitle>Something unexpected has happened!</AlertTitle>
        </AlertHeader>
        <AlertDescription>
          Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
          exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
          exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit qui.
          Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque incididunt.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const DescriptionOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
        exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
        exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit qui.
        Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque incididunt.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const HeaderOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertContent>
        <AlertHeader>
          <FAIcon icon="circleExclamation" size="lg" />
          <AlertTitle>Something unexpected has happened!</AlertTitle>
        </AlertHeader>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: 'danger',
  },
};

export const Info: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertContent>
        <AlertHeader>
          <AlertTitle>Something you should know...</AlertTitle>
        </AlertHeader>
        <AlertDescription>
          Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
          exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
          exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit qui.
          Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque incididunt.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: 'info',
  },
};

export const Warning: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertContent>
        <AlertHeader>
          <AlertTitle>Proceed with caution!</AlertTitle>
        </AlertHeader>
        <AlertDescription>
          Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
          exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
          exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit qui.
          Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque incididunt.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: 'warning',
  },
};

export const Success: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertContent>
        <AlertHeader>
          <AlertTitle>You did it!</AlertTitle>
        </AlertHeader>
        <AlertDescription>
          Mollit proident aliqua vel pariatur dolor cupidatat sunt. Tempus quis elit officia ero
          exercitation labore a. Nisi commodo nunc id et. Labore facilisis do nibh fermentum
          exercitation voluptate. Aute et ut est justo veniam. Ut do convallis reprehenderit qui.
          Consectetur nibh nibh est pariatur tempor. Qos laoreet qui labore a neque incididunt.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
  args: {
    variant: 'success',
  },
};
