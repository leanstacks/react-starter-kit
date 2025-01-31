import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';
import WithFormProvider from 'test/wrappers/WithFormProvider';

import Input from '../Input';

describe('Input', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <WithFormProvider formProps={{ defaultValues: { testField: '' } }}>
        <Input name="testField" />
      </WithFormProvider>,
    );
    await screen.findByTestId('input');

    // ASSERT
    expect(screen.getByTestId('input')).toBeDefined();
  });

  it('should show label', async () => {
    // ARRANGE
    const label = 'Label text';
    render(
      <WithFormProvider formProps={{ defaultValues: { testField: '' } }}>
        <Input name="testField" label={label} />
      </WithFormProvider>,
    );
    await screen.findByTestId('input-label');

    // ASSERT
    expect(screen.getByTestId('input-label')).toHaveTextContent(label);
  });

  it('should show supporting text', async () => {
    // ARRANGE
    const supportingText = 'Supporting text';
    render(
      <WithFormProvider formProps={{ defaultValues: { testField: '' } }}>
        <Input name="testField" supportingText={supportingText} />
      </WithFormProvider>,
    );
    await screen.findByTestId('input-supporting-text');

    // ASSERT
    expect(screen.getByTestId('input-supporting-text')).toHaveTextContent(supportingText);
  });

  it('should show error message', async () => {
    // ARRANGE
    const errorMessage = 'error message';
    render(
      <WithFormProvider
        formProps={{
          defaultValues: { testField: '' },
          errors: { testField: { type: 'string', message: errorMessage } },
        }}
      >
        <Input name="testField" />
      </WithFormProvider>,
    );
    await screen.findByTestId('input-error');

    // ASSERT
    expect(screen.getByTestId('input-error')).toHaveTextContent(errorMessage);
  });
});
