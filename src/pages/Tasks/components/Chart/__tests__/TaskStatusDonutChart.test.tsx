import { render, screen } from 'test/test-utils';
import { describe, expect, it } from 'vitest';
import TaskStatusDonutChart from '../Chart/TaskStatusDonutChart';
import { todosFixture } from '__fixtures__/todos';

describe('TaskStatusDonutChart', () => {
  it('should render successfully', async () => {
    // ARRANGE
    render(<TaskStatusDonutChart tasks={todosFixture} />);
    await screen.findByTestId('chart-donut-task-status');

    // ASSERT
    expect(screen.getByTestId('chart-donut-task-status')).toBeDefined();
  });

  it('should not render when tasks empty', async () => {
    // ARRANGE
    render(
      <div data-testid="wrapper">
        <TaskStatusDonutChart tasks={[]} />
      </div>,
    );
    await screen.findByTestId('wrapper');

    // ASSERT
    expect(screen.getByTestId('wrapper')).toBeDefined();
    expect(screen.queryByTestId('chart-donut-task-status')).toBeNull();
  });
});
