import { createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Text from 'common/components/Text/Text';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import Heading from 'common/components/Text/Heading';

/**
 * Properties for the `TextComponents` React component.
 * @see {@link BaseComponentProps}
 */
interface TextComponentsProps extends BaseComponentProps {}

/**
 * The `TextComponents` React component renders a set of examples illustrating
 * the use of the text family of components.
 * @param {TextComponentsProps} props - Component properties.
 * @returns {JSX.Element} JSX
 */
const TextComponents = ({
  className,
  testId = 'components-text',
}: TextComponentsProps): JSX.Element => {
  const textData: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'testId',
      description: 'Optional. Identifier for testing.',
    },
    {
      name: 'variant',
      description: 'Optional. Applies default styling. Default: body copy',
    },
  ];
  const headingData: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to be displayed.',
    },
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'level',
      description: 'Optional. The heading level 1 through 6. Default: 2',
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

  return (
    <section className={className} data-testid={testId}>
      <div className="mb-16">
        <Heading level={2} className="mb-4">
          Heading Component
        </Heading>

        <div className="my-8">
          The <span className="font-mono font-bold">Heading</span> component displays blocks of text
          as HTML heading elements.
        </div>

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty, string> data={headingData} columns={columns} />
        </div>

        <Heading level={3}>Examples</Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={1}>Heading 1</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={1}>Heading 1</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={2}>Heading 2</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={2}>Heading 2</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={3}>Heading 3</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={3}>Heading 3</Heading>`} />
        </div>
      </div>

      <div className="mb-16">
        <Heading level={2} className="mb-4">
          Text Component
        </Heading>

        <div className="my-8">
          The <span className="font-mono font-bold">Text</span> component displays blocks of text
          using stylized variations.
        </div>

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty, string> data={textData} columns={columns} />
        </div>

        <Heading level={3}>Examples</Heading>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={1}>Heading 1</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={1}>Heading 1</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={2}>Heading 2</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={2}>Heading 2</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Heading level={3}>Heading 3</Heading>
          </div>
          <CodeSnippet className="my-2" code={`<Heading level={3}>Heading 3</Heading>`} />
        </div>

        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            <Text>
              This is standard body copy text. It may be styled in various ways such as{' '}
              <span className="font-bold">bold</span> or <span className="italic">italic</span>, as{' '}
              <span className="underline">underlined</span> or{' '}
              <span className="line-through">strikethrough</span>.
            </Text>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Text>
  This is the standard body copy text. It may be styled in various ways such as{' '}
  <span className="font-bold">bold</span> or <span className="italic">italic</span>, as{' '}
  <span className="underline">underlined</span> or{' '}
  <span className="line-through">strikethrough</span>.
</Text>`}
          />
        </div>
      </div>
    </section>
  );
};

export default TextComponents;
