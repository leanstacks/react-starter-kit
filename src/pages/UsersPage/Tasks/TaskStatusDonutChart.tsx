import { useMemo } from 'react';
import classNames from 'classnames';
import { filter, reject } from 'lodash';
import colors from 'tailwindcss/colors';

import { BaseComponentProps } from 'common/utils/types';
import { Task } from '../api/useGetUserTasks';
import DonutChart, { DonutChartData, DonutChartProps } from 'common/components/Chart/DonutChart';

/**
 * Properties for the `TaskStatusDonutChart` component.
 * @param {Task[]} tasks - A collection of `Task` objects.
 * @see {@link BaseComponentProps}
 * @see {@link DonutChartProps}
 */
export interface TaskStatusDonutChartProps
  extends BaseComponentProps,
    Omit<DonutChartProps, 'data'> {
  tasks: Task[];
}

/**
 * The `TaskStatusDonutChart` component renders a `DonutChart` which displays
 * the relative count of incomplete and complete tasks.
 * @param {TaskStatusDonutChartProps} props - Component properties.
 * @returns {JSX.Element | false} Returns JSX if the supplied collection of tasks
 * is not empty, otherwise returns `false`.
 */
const TaskStatusDonutChart = ({
  tasks,
  className,
  height = 56,
  width = 192,
  innerRadius = 12,
  outerRadius = 20,
  testId = 'chart-donut-task-status',
  ...chartProps
}: TaskStatusDonutChartProps): JSX.Element | false => {
  if (tasks && tasks.length > 0) {
    // format the chart data
    const chartData: DonutChartData[] = useMemo(() => {
      return [
        {
          name: 'Complete',
          value: filter(tasks, 'completed').length,
          fill: colors.green[600],
        },
        { name: 'Incomplete', value: reject(tasks, 'completed').length, fill: colors.red[600] },
      ];
    }, [tasks]);

    // render the chart
    return (
      <DonutChart
        className={classNames('text-xs', className)}
        data={chartData}
        height={height}
        width={width}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        testId={testId}
        {...chartProps}
      />
    );
  } else {
    // no tasks; render nothing
    return false;
  }
};

export default TaskStatusDonutChart;
