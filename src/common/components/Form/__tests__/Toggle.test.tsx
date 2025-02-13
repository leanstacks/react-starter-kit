import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, InferType, object } from 'yup';

import { describe, expect, it } from 'vitest';
import { render, screen } from 'test/test-utils';

import Toggle, { ToggleProps } from '../Toggle';

const formSchema = object({
  myField: boolean().oneOf([false]),
});

type FormValues = InferType<typeof formSchema>;

/**
 * A wrapper for testing the `Toggle` component which requires some
 * react-hook-form objects passed as props.
 */
const ToggleWrapper = (props: Omit<ToggleProps<FormValues>, 'control'>) => {
  const form = useForm<FormValues>({
    defaultValues: { myField: false },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} data-testid="form">
      <Toggle {...props} control={form.control} />
      <button type="submit" data-testid="button-submit">
        submit
      </button>
    </form>
  );
};

describe('Toggle', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<ToggleWrapper name="myField" />);
    await screen.findByTestId('toggle');

    // ASSERT
    expect(screen.getByTestId('toggle')).toBeDefined();
  });

  it('should show label', async () => {
    // ARRANGE
    const text = 'my label';
    render(<ToggleWrapper name="myField" label={text} />);
    await screen.findByTestId('toggle-label');

    // ASSERT
    expect(screen.getByTestId('toggle-label')).toHaveTextContent(text);
  });

  it('should show supporting text', async () => {
    // ARRANGE
    const text = 'my label';
    render(<ToggleWrapper name="myField" supportingText={text} />);
    await screen.findByTestId('toggle-supporting-text');

    // ASSERT
    expect(screen.getByTestId('toggle-supporting-text')).toHaveTextContent(text);
  });

  it('should show error message', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(<ToggleWrapper name="myField" />);
    await screen.findByTestId('button-submit');

    // ACT
    await user.click(screen.getByTestId('toggle-button'));
    await user.click(screen.getByTestId('button-submit'));
    await screen.findByTestId('toggle-error');

    // ASSERT
    expect(screen.getByTestId('toggle-error')).toHaveTextContent(/must be one of the following/i);
  });
});
