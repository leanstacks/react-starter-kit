import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import TabContent from '../TabContent';
import Tabs from '../Tabs';

describe('TabContent', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabContent value="one" />
      </Tabs>,
    );
    await screen.findByTestId('tab-content');

    // ASSERT
    expect(screen.getByTestId('tab-content')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabContent value="one" testId="custom-testId" />
      </Tabs>,
    );
    await screen.findByTestId('custom-testId');

    // ASSERT
    expect(screen.getByTestId('custom-testId')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabContent value="one" className="custom-className" />
      </Tabs>,
    );
    await screen.findByTestId('tab-content');

    // ASSERT
    expect(screen.getByTestId('tab-content').classList).toContain('custom-className');
  });

  it('should render children', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabContent value="one">
          <div data-testid="children"></div>
        </TabContent>
      </Tabs>,
    );
    await screen.findByTestId('children');

    // ASSERT
    expect(screen.getByTestId('children')).toBeDefined();
  });

  it('should be displayed when active', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabContent value="one">
          <div data-testid="children"></div>
        </TabContent>
      </Tabs>,
    );
    await screen.findByTestId('tab-content');

    // ASSERT
    expect(screen.getByTestId('tab-content')).toBeDefined();
    expect(screen.getByTestId('tab-content')).toHaveClass('block');
  });

  it('should be hidden when inactive', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="some-other-tab">
        <TabContent value="one">
          <div data-testid="children"></div>
        </TabContent>
      </Tabs>,
    );
    await screen.findByTestId('tab-content');

    // ASSERT
    expect(screen.getByTestId('tab-content')).toBeDefined();
    expect(screen.getByTestId('tab-content')).toHaveClass('hidden');
  });
});
