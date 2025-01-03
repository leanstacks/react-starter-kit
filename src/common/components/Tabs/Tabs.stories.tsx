import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { TabProps } from './Tab';
import { TabContentProps } from './TabContent';

import Tabs from './Tabs';

const meta = {
  title: 'Common/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <div className="w-96">
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: { description: 'An array of `Tab` component properties.' },
    tabContents: { description: 'An array of `TabContent` component properties.' },
    testId: { description: 'The test identifier.' },
    variant: { description: 'Optional. The tab display behavior.' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const tabs: TabProps[] = [
  { isActive: true, label: 'List' },
  { isActive: false, label: 'Detail' },
];

const tabContents: TabContentProps[] = [
  { children: <div className="my-4">This is the list tab.</div> },
  { children: <div className="my-4">This is the item detail tab.</div> },
];

export const Standard: Story = {
  args: { tabs, tabContents },
};

export const FullWidth: Story = {
  args: { tabs, tabContents, variant: 'fullWidth' },
};
