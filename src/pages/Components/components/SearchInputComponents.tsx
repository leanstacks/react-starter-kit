import { useMemo, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { filter } from 'lodash';
import { map } from 'lodash';

import { BaseComponentProps } from 'common/utils/types';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Text from 'common/components/Text/Text';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import SearchInput from 'common/components/Form/SearchInput';
import SearchResult from 'common/components/Form/SearchResult';

/**
 * The `SearchInputComponents` React component renders a set of examples illustrating
 * the use of the `SearchField` component.
 * @param {BaseComponentProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const SearchInputComponents = ({
  className,
  testId = 'components-search-input',
}: BaseComponentProps): JSX.Element => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'errorText',
      description: 'Optional. Field error text.',
    },
    {
      name: 'isLoading',
      description: 'Optional. Indicates if the results are loading. Default: false',
    },
    {
      name: 'onChange',
      description: 'Function invoked when the input value changes.',
    },
    {
      name: 'searchResults',
      description: 'Optioanl. An array of SearchResult components.',
    },
    {
      name: 'supportingText',
      description: 'Optional. Field help text.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
  ];
  const columnHelper = createColumnHelper<ComponentProperty>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => (
        <span className="font-mono text-sky-700 dark:text-sky-500">{info.getValue()}</span>
      ),
      header: () => 'Name',
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.renderValue(),
      header: () => 'Description',
    }),
  ];

  const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

  const searchResults: JSX.Element[] | undefined = useMemo(() => {
    if (value && value.length > 0) {
      const filteredColors = filter(colors, (color) => {
        return color.toLowerCase().includes(value.toLowerCase());
      });
      const searchResults = map(filteredColors, (color) => (
        <SearchResult
          key={`search-result-${color}`}
          testId={`search-result-${color}`}
          onClick={() => {
            setSelectedValue(color);
          }}
        >
          {color}
        </SearchResult>
      ));
      if (searchResults.length > 0) {
        setError('');
        return searchResults;
      } else {
        setError('No colors found.');
      }
    }
    return undefined;
  }, [value]);

  return (
    <section className={className} data-testid={testId}>
      <Text variant="heading2" className="mb-4">
        Search Field Component
      </Text>

      <div className="my-8">
        The <span className="font-mono font-bold">Search Field</span> component displays a search
        input field.
      </div>

      <div className="my-8">
        <Text variant="heading3" className="mb-2">
          Properties
        </Text>
        <Table<ComponentProperty, string> data={data} columns={columns} />
      </div>

      <Text variant="heading3">Examples</Text>

      <div className="my-8">
        {!!selectedValue && (
          <div className="mb-4" data-testid={`${testId}-value-selected`}>
            You selected: {selectedValue}
          </div>
        )}

        <div className="mb-2 flex place-content-center rounded border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
          <SearchInput
            className="w-full"
            errorText={error}
            onChange={(val) => setValue(val)}
            searchResults={searchResults}
            supportingText="Start typing any color, e.g. blue."
          />
        </div>

        <CodeSnippet
          className="my-2"
          code={`<SearchField
  className="w-full"
  errorText={error}
  onChange={(val) => setValue(val)}
  searchResults={searchResults}
  supportingText="Start typing any color, e.g. blue."
/>`}
        />
      </div>
    </section>
  );
};

export default SearchInputComponents;
