import type { Meta, StoryObj } from '@storybook/react';

import SearchInput from '../SearchInput';
import SearchResult from '../SearchResult';

const meta = {
  title: 'Common/Form/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    errorText: { description: 'Optional. Field error message.' },
    isLoading: { description: 'Indicates if the results are loading.' },
    onChange: { description: 'A function called when the value changes.' },
    searchResults: {
      description: 'Optional. An array of `SearchResult` components.',
    },
    supportingText: { description: 'Additional field instructions.' },
    testId: { description: 'The test identifier.' },
  },
  args: {},
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

// const fruits = ['Apples', 'Bananas', 'Grapes'];

export const Simple: Story = {
  args: {
    onChange: () => {},
    searchResults: [<SearchResult onClick={() => {}}>Apples</SearchResult>],
  },
};

export const MultipleResults: Story = {
  args: {
    onChange: () => {},
    searchResults: [<SearchResult onClick={() => {}}>Apples</SearchResult>],
  },
};
