import { createColumnHelper } from '@tanstack/react-table';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Popover from 'common/components/Popover/Popover';
import Card from 'common/components/Card/Card';

/**
 * The `PopoverComponents` component renders a set of examples illustrating
 * the use of the `Popover` component.
 */
const PopoverComponents = ({
  className,
  testId = 'components-toast',
}: BaseComponentProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'children',
      description: 'The content to display within the Popover.',
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
        Popover Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Popover</span> component displays rich content
          within a portal, triggered by clicking a target element. The content can be any React
          component, such as a menu, form, or dialog.
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

        <Heading level={4} className="my-2">
          Basic
        </Heading>
        <div className="mb-4 opacity-85">
          This is the most basic use of the Popover component. A popover consists of a trigger and
          content. When the trigger is clicked, the content is shown. The content is displayed over
          a full-screen backdrop. Clicking the backdrop or the trigger will close the popover.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <Popover>
              <Popover.Trigger className="max-w-fit">Open</Popover.Trigger>
              <Popover.Content>
                <Card className="bg-neutral-900 text-white">
                  <Card.Body>Hello world!</Card.Body>
                </Card>
              </Popover.Content>
            </Popover>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<Popover>
  <Popover.Trigger>Open popover</Popover.Trigger>
  <Popover.Content>
    <Card className="bg-neutral-900 text-white">
      <Card.Body>Hello world!</Card.Body>
    </Card>
  </Popover.Content>
</Popover>`}
          />
        </div>
      </div>
    </section>
  );
};

export default PopoverComponents;
