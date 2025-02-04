import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test/test-utils';
import userEvent from '@testing-library/user-event';

import SearchInput from '../SearchInput';
import SearchResult from '../SearchResult';

describe('SearchInput', () => {
  const mockOnChange = vi.fn();
  const searchResults = [
    <SearchResult onClick={() => {}} key="1">
      Apples
    </SearchResult>,
  ];

  it('should render successfully', async () => {
    // ARRANGE
    render(<SearchInput onChange={mockOnChange} searchResults={searchResults} />);
    await screen.findByTestId('input-search');

    // ASSERT
    expect(screen.getByTestId('input-search')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(
      <SearchInput onChange={mockOnChange} searchResults={searchResults} testId="custom-testId" />,
    );
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <SearchInput
        className="custom-className"
        onChange={mockOnChange}
        searchResults={searchResults}
      />,
    );
    await screen.findByTestId('input-search');

    // ASSERT
    expect(screen.getByTestId('input-search').classList).toContain('custom-className');
  });

  it('should display supporting text', async () => {
    // ARRANGE
    render(
      <SearchInput
        supportingText="supporting"
        onChange={mockOnChange}
        searchResults={searchResults}
      />,
    );
    await screen.findByTestId('field-search-supporting-text');

    // ASSERT
    expect(screen.getByTestId('field-search-supporting-text').textContent).toBe('supporting');
  });

  it('should display error text', async () => {
    // ARRANGE
    render(<SearchInput errorText="error" onChange={mockOnChange} searchResults={searchResults} />);
    await screen.findByTestId('field-search-error');

    // ASSERT
    expect(screen.getByTestId('field-search-error').textContent).toBe('error');
  });

  it('should call onChange when input changes', async () => {
    // ARRANGE
    render(<SearchInput onChange={mockOnChange} searchResults={searchResults} />);
    await screen.findByTestId('input-search');

    // ACT
    await userEvent.type(screen.getByTestId('field-search-input'), 'test');

    // ASSERT
    expect(screen.getByTestId<HTMLInputElement>('field-search-input').value).toBe('test');
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
