import { getTaskDateByLabel } from '../../../helpers/getTaskDateByLabel';
import { ETaskDate, ETaskListTab, ITask } from '../../../types/types';

export const DASHBOARDS_TASK_LIST_TAB = [
    {
        label: ETaskListTab.ALL,
    },
    {
        label: ETaskListTab.TODAY,
        sort: (tasks: ITask[]) => {
            return tasks.filter(task => task.date <= getTaskDateByLabel(ETaskDate.TODAY));
        },
    },
    {
        label: ETaskListTab.THIS_WEEK,
        sort: (tasks: ITask[]) => {
            return tasks.filter(task => task.date <= getTaskDateByLabel(ETaskDate.THIS_WEEK));
        },
        hideAt: 470
    },
    {
        label: ETaskListTab.THIS_MONTH,
        sort: (tasks: ITask[]) => {
            return tasks.filter(task => task.date <= getTaskDateByLabel(ETaskDate.THIS_MONTH));
        },
        hideAt: 350
    },
    {
        label: ETaskListTab.THIS_YEAR,
        sort: (tasks: ITask[]) => {
            return tasks.filter(task => new Date(task.date).getFullYear() <= new Date().getFullYear());
        },
        hideAt: 1000
    },
];