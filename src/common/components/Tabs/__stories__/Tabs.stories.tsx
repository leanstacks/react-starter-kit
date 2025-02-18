import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { TabContentProps } from '../TabContent';
import { TabProps } from '../Tab';

import Tabs from '../Tabs';

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
    align: { description: 'Optional. Horizontal appearance of tabs.' },
    tabs: { description: 'An array of `Tab` component properties.' },
    tabContents: { description: 'An array of `TabContent` component properties.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const tabs: TabProps[] = [{ label: 'List' }, { label: 'Detail' }];

const tabContents: TabContentProps[] = [
  { children: <div className="my-4">This is the list tab.</div> },
  { children: <div className="my-4">This is the item detail tab.</div> },
];

export const Default: Story = {
  args: { tabs, tabContents },
};

export const Stretched: Story = {
  args: { tabs, tabContents, align: 'stretch' },
};
