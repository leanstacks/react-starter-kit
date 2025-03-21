import { createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Accordion from 'common/components/Accordion/Accordion';

/**
 * The `AccordionComponents` component renders a set of examples illustrating
 * the use of the `Accordion` component.
 */
const AccordionComponents = ({
  className,
  testId = 'components-accordion',
}: BaseComponentProps): JSX.Element => {
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
      <Heading level={2} className="mb-4">
        Accordion Component
      </Heading>

      <div className="my-8">
        <div>
          The <span className="font-mono font-bold">Accordion</span> component organizes content
          into vertically stacked sections. Each section has a heading which, when clicked, reveals
          the content.
        </div>
        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty, string> data={data} columns={columns} />
        </div>

        <Heading level={3} className="mb-2">
          Examples
        </Heading>

        <Heading level={4} className="mb-2">
          Basic
        </Heading>
        <div className="mb-4 opacity-85">
          This is the most basic use of the Accordion component.
        </div>
        <div className="my-8">
          <div className="mb-2 flex place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Accordion className="w-full">
              <Accordion.Item value="section-1">
                <Accordion.Trigger>Section 1</Accordion.Trigger>
                <Accordion.Content>Content for section 1.</Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="section-2">
                <Accordion.Trigger>Section 2</Accordion.Trigger>
                <Accordion.Content>Content for section 2.</Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <CodeSnippet className="my-2" code={`<Accordion></Accordion>`} />
        </div>
      </div>
    </section>
  );
};

export default AccordionComponents;
