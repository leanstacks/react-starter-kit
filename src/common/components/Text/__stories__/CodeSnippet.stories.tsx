import type { Meta, StoryObj } from '@storybook/react';

import { withProviders } from '../../../../../.storybook/decorators/withProviders';

import CodeSnippet from '../CodeSnippet';

const meta = {
  title: 'Common/Text/CodeSnippet',
  component: CodeSnippet,
  decorators: [withProviders()],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { description: 'Additional CSS classes.' },
    code: { description: 'The code snippet.' },
    testId: { description: 'The test identifier.' },
  },
} satisfies Meta<typeof CodeSnippet>;

export default meta;

type Story = StoryObj<typeof meta>;

const badge = '<Badge>3</Badge>';

const text = `<Text>
  I am the first line.
  <Divider />
  I am another line.
</Text>
`;

export const Simple: Story = {
  args: { code: badge },
};

export const MultiLine: Story = {
  args: { code: text },
};
