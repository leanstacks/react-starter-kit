import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';

import Tab from '../Tab';
import Tabs from '../Tabs';
import TabList from '../TabList';

describe('Tab', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab')).toBeDefined();
  });

  it('should use custom testId', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one" testId="test-id">
            One
          </Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('test-id');

    // ASSERT
    expect(screen.getByTestId('test-id')).toBeDefined();
  });

  it('should use custom className', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one" className="class-name">
            One
          </Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab').classList).toContain('class-name');
  });

  it('should render label', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab').textContent).toBe('One');
  });

  it('should display active state', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab').classList).toContain('border-blue-300');
  });

  it('should display inactive state', async () => {
    // ARRANGE
    render(
      <Tabs defaultValue="some-other-tab">
        <TabList>
          <Tab value="one">One</Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab');

    // ASSERT
    expect(screen.getByTestId('tab').classList).toContain('border-transparent');
  });

  it('should set active tab when clicked', async () => {
    // ARRANGE
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one" testId="tab-one">
            One
          </Tab>
          <Tab value="two" testId="tab-two">
            Two
          </Tab>
        </TabList>
      </Tabs>,
    );
    await screen.findByTestId('tab-one');
    // assert that tab "one" is active
    expect(screen.getByTestId('tab-one')).toHaveClass('border-blue-300');

    // ACT
    // click tab two
    await user.click(screen.getByTestId('tab-two'));
    // wait until tab one becomes inactive
    await waitFor(() => expect(screen.getByTestId('tab-one')).toHaveClass('border-transparent'));

    // ASSERT
    // assert that tab one is inactive
    expect(screen.getByTestId('tab-one')).toHaveClass('border-transparent');
    // assert that tab two is active
    expect(screen.getByTestId('tab-two')).toHaveClass('border-blue-300');
  });
});
