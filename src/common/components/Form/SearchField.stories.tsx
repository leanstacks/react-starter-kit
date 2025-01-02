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
    errorText: { description: 'Optional. Field error message.' },
    isLoading: { description: 'Indicates if the results are loading.' },
    onChange: { description: 'A function called when the value changes.' },
    renderSearchResults: {
      description: 'A render function which returns one or more `SearchResult` components.',
    },
    supportingText: { description: 'Additional field instructions.' },
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
