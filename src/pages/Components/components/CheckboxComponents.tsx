import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import noop from 'lodash/noop';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseComponentProps } from 'common/utils/types';
import { ComponentProperty } from '../model/components';
import Table from 'common/components/Table/Table';
import CodeSnippet from 'common/components/Text/CodeSnippet';
import Heading from 'common/components/Text/Heading';
import Button from 'common/components/Button/Button';
import Checkbox from 'common/components/Form/Checkbox';

/**
 * The `CheckboxComponents` component renders a set of examples illustrating
 * the use of the `Checkbox` component.
 */
const CheckboxComponents = ({
  className,
  testId = 'components-checkbox',
}: BaseComponentProps): JSX.Element => {
  const data: ComponentProperty[] = [
    {
      name: 'className',
      description: 'Optional. Additional CSS class names.',
    },
    {
      name: 'control',
      description: 'The React Hook Form control object.',
    },
    {
      name: 'label',
      description: 'The label text.',
    },
    {
      name: 'name',
      description: 'The form control name.',
    },
    {
      name: 'supportingText',
      description: 'Optional. The supporting or help text.',
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
  ] as ColumnDef<ComponentProperty>[];

  /* example setup */
  const formSchema = z.object({
    isAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      isAccepted: false,
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = noop;

  return (
    <section className={className} data-testid={testId}>
      <Heading level={2} className="mb-4">
        Checkbox Component
      </Heading>

      <div className="my-8">
        <div className="mb-4">
          The <span className="font-mono font-bold">Input</span> component renders a HTML input
          element. It is used to capture a single line of text input. The Input component internally
          uses the Label, HelpText, and FieldError components.
        </div>
        <div className="mb-4">
          In addition to the custom properties listed below, the Input component also accepts all
          standard HTML input element attribute React properties.
        </div>

        <div className="my-8">
          <Heading level={3} className="mb-2">
            Properties
          </Heading>
          <Table<ComponentProperty> data={data} columns={columns} />
        </div>

        <Heading level={3} className="mb-2">
          Examples
        </Heading>

        <Heading level={4} className="my-2">
          Basic
        </Heading>
        <div className="mb-4 opacity-85">
          This is the most basic use of the Input component. It has no label or supporting text. It
          is integrated with React Hook Form through the "control" and "reset" values obtained from
          the "useForm" hook (see the React Hook Form documentation for more information).
        </div>
        <div className="mb-4 opacity-85">
          To view an example validation error message, click or tab into the Last Name input and
          then exit the field without entering a value.
        </div>
        <div className="my-8">
          <div className="mb-2 flex flex-col place-content-center rounded-sm border border-neutral-500/10 p-4 dark:bg-neutral-700/25">
            {/* Example */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Checkbox
                control={control}
                name="isAccepted"
                label="I accept the terms & conditions"
                className="mb-4"
                supportingText="Do you accept the terms and conditions?"
              />
              <Button
                onClick={() => reset()}
                size="sm"
                variant="outline"
                className="ml-auto"
                testId="reset-1"
              >
                Reset
              </Button>
            </form>
          </div>
          <CodeSnippet
            className="my-2"
            code={`<form onSubmit={handleSubmit(onSubmit)}>
  <Input control={control} name="firstName" className="mb-4" />
  <Button onClick={() => reset()} size="sm" variant="outline" className="ml-auto">
    Reset
  </Button>
</form>`}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckboxComponents;
