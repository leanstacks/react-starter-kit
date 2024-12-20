import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './Dialog';
import DialogHeading from './DialogHeading';
import DialogContent from './DialogContent';
import Divider from '../Divider/Divider';
import DialogButton from './DialogButton';
import DialogButtons from './DialogButtons';

const meta = {
  title: 'Common/Dialog/Dialog',
  component: Dialog,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The content.' },
    className: { description: 'Additional CSS classes.' },
    isOpen: { description: 'Indicates if the dialog is shown. ', control: { type: 'boolean' } },
    onClose: { description: 'Function called when the Dialog closes.' },
    testId: { description: 'The test identifier.' },
  },
  args: {
    isOpen: true,
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Delete: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogHeading>Are you sure?</DialogHeading>
      <DialogContent>Deletion is permanent.</DialogContent>
      <Divider />
      <DialogButtons>
        <DialogButton>Cancel</DialogButton>
        <DialogButton variant="danger">Delete</DialogButton>
      </DialogButtons>
    </Dialog>
  ),
};

export const Info: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogHeading>Bob Smith</DialogHeading>
      <DialogContent className="flex flex-col">
        <div className="font-bold">Manager of Stories</div>
        <div>Raleigh, NC</div>
        <div>+1 123-456-7890</div>
      </DialogContent>
      <DialogButtons>
        <DialogButton>Close</DialogButton>
      </DialogButtons>
    </Dialog>
  ),
};
