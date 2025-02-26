import { describe, expect, it } from 'vitest';

import { render, screen } from 'test/test-utils';

import Tabs from '../Tabs';
import TabList from '../TabList';
import Tab from '../Tab';

describe('TabList', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab-list');

    // ASSERT
    expect(screen.getByTestId('tab-list')).toBeDefined();
  });

  it('should display with align default', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab-list');

    // ASSERT
    expect(screen.getByTestId('tab-list')).toHaveClass('flex');
  });

  it('should display with align start', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList align="start">
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab-list');

    // ASSERT
    expect(screen.getByTestId('tab-list')).toHaveClass('flex');
  });

  it('should display with align stretch', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList align="stretch">
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab-list');

    // ASSERT
    expect(screen.getByTestId('tab-list')).toHaveClass('*:grow');
  });
});
