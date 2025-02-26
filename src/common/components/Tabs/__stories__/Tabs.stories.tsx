import type { Meta, StoryObj } from '@storybook/react';

import Tabs from '../Tabs';
import TabList from '../TabList';
import Tab from '../Tab';
import TabContent from '../TabContent';

const meta = {
  title: 'Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    defaultValue: { description: 'The default (or initial) active tab.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    defaultValue: 'one',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
      </TabList>
      <TabContent value="one">
        <div className="py-8 text-blue-600">I am the content for tab one!</div>
      </TabContent>
      <TabContent value="two">
        <div className="py-8 text-green-600">I am the content for tab two!</div>
      </TabContent>
    </Tabs>
  ),
};

export const StretchedTabs: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList align="stretch">
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
      </TabList>
      <TabContent value="one">
        <div className="py-8 text-blue-600">I am the content for tab one!</div>
      </TabContent>
      <TabContent value="two">
        <div className="py-8 text-green-600">I am the content for tab two!</div>
      </TabContent>
    </Tabs>
  ),
};
