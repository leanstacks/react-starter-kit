import type { Meta, StoryObj } from '@storybook/react';

import SearchField from './SearchField';
import SearchResult from './SearchResult';

const meta = {
  title: 'Common/Form/SearchField',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

const fruits = ['Apples', 'Bananas', 'Grapes'];

export const Simple: Story = {
  args: {
    onChange: () => {},
    renderSearchResults: () => [<SearchResult onClick={() => {}}>Apples</SearchResult>],
  },
};

export const MultipleResults: Story = {
  args: {
    onChange: () => {},
    renderSearchResults: () =>
      fruits.map((fruit) => <SearchResult onClick={() => {}}>{fruit}</SearchResult>),
  },
};
