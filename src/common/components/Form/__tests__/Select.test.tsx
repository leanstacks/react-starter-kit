import { render, screen } from 'test/test-utils';
import { describe, expect, it } from 'vitest';

import WithFormProvider from 'test/wrappers/WithFormProvider';

import Select from '../Select';

describe('Select', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <WithFormProvider formProps={{ defaultValues: { testField: '' } }}>
        <Select name="testField">
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </Select>
      </WithFormProvider>,
    );
    await screen.findByTestId('select');

    // ASSERT
    expect(screen.getByTestId('select')).toBeDefined();
  });

  it('should show label', async () => {
    // ARRANGE
    const label = 'label value';
    render(
      <WithFormProvider formProps={{ defaultValues: { testField: '' } }}>
        <Select name="testField" label={label}>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </Select>
      </WithFormProvider>,
    );
    await screen.findByTestId('select-label');

    // ASSERT
    expect(screen.getByTestId('select-label')).toHaveTextContent(label);
  });

  it('should show supporting test', async () => {
    // ARRANGE
    const supportingText = 'supporting text content';
    render(
      <WithFormProvider formProps={{ defaultValues: { testField: '' } }}>
        <Select name="testField" supportingText={supportingText}>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </Select>
      </WithFormProvider>,
    );
    await screen.findByTestId('select-supporting-text');

    // ASSERT
    expect(screen.getByTestId('select-supporting-text')).toHaveTextContent(supportingText);
  });

  it('should show error message', async () => {
    // ARRANGE
    const error = 'error message';
    render(
      <WithFormProvider
        formProps={{
          defaultValues: { testField: '' },
          errors: { testField: { type: 'string', message: error } },
        }}
      >
        <Select name="testField">
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </Select>
      </WithFormProvider>,
    );
    await screen.findByTestId('select-error');

    // ASSERT
    expect(screen.getByTestId('select-error')).toHaveTextContent(error);
  });
});
