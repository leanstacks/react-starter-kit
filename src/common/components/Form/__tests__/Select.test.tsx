import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { render, screen } from 'test/test-utils';

import Select, { SelectProps } from '../Select';

const formSchema = object({
  color: string().oneOf(['blue'], 'Must select a value in the list.'),
});

type FormValues = InferType<typeof formSchema>;

/**
 * A wrapper for testing the `Select` component which requires some
 * react-hook-form objects passed as props.
 */
const SelectWrapper = (props: Omit<SelectProps<FormValues>, 'control'>) => {
  const form = useForm<FormValues>({
    defaultValues: { color: '' },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form">
      <Select {...props} control={form.control} />
      <button type="submit" data-testid="button-submit">
        submit
      </button>
    </form>
  );
};

describe('Select', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <SelectWrapper name="color">
        <option value="blue">Blue</option>
        <option value="red">Red</option>
      </SelectWrapper>,
    );
    await screen.findByTestId('select');

    // ASSERT
    expect(screen.getByTestId('select')).toBeDefined();
  });

  it('should show label', async () => {
    // ARRANGE
    const label = 'label value';
    render(
      <SelectWrapper name="color" label={label}>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
      </SelectWrapper>,
    );
    await screen.findByTestId('select-label');

    // ASSERT
    expect(screen.getByTestId('select-label')).toHaveTextContent(label);
  });

  it('should show supporting test', async () => {
    // ARRANGE
    const supportingText = 'supporting text content';
    render(
      <SelectWrapper name="color" supportingText={supportingText}>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
      </SelectWrapper>,
    );
    await screen.findByTestId('select-supporting-text');

    // ASSERT
    expect(screen.getByTestId('select-supporting-text')).toHaveTextContent(supportingText);
  });

  it('should show error message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <SelectWrapper name="color">
        <option value="blue" data-testid="option-blue">
          Blue
        </option>
        <option value="red" data-testid="option-red">
          Red
        </option>
      </SelectWrapper>,
    );
    await screen.findByTestId('select-select');

    // ACT
    await user.click(screen.getByTestId('option-red'));
    await user.click(screen.getByTestId('button-submit'));
    await screen.findByTestId('select-error');

    // ASSERT
    expect(screen.getByTestId('select-error')).toHaveTextContent(
      /must select a value in the list/i,
    );
  });
});
