import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '../Dropdown';
import Button from '../../Button/Button';
import DropdownContent from '../DropdownContent';
import DropdownItem from '../DropdownItem';
import FAIcon from '../../Icon/FAIcon';

const meta = {
  title: 'Common/Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <div className="h-48">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    content: { description: 'The content.' },
    testId: { description: 'The test identifier.' },
    toggle: { description: 'Element that toggles showing the dropdown.' },
  },
  args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    toggle: <Button>Toggle</Button>,
    content: (
      <DropdownContent>
        <DropdownItem>One</DropdownItem>
        <DropdownItem>Two</DropdownItem>
      </DropdownContent>
    ),
  },
  render: (args) => <Dropdown {...args}></Dropdown>,
};

export const IconToggle: Story = {
  args: {
    toggle: (
      <Button variant="text">
        <FAIcon icon="language" size="2x" title="Select Language" />
      </Button>
    ),
    content: (
      <DropdownContent>
        <DropdownItem>English</DropdownItem>
        <DropdownItem>Spanish</DropdownItem>
      </DropdownContent>
    ),
  },
  render: (args) => <Dropdown {...args}></Dropdown>,
};
