import { ITask } from '../../../store/reducers/tasksReducer/types';
import { getTaskDateByLabel } from '../../../helpers/getTaskDateByLabel';
import { ETaskDate } from '../../../components/newTask/newTaskDate/types';

export const DASHBOARDS_TASK_LIST_TAB = [
    {
        label: 'All',
    },
    {
        label: 'Today',
        sort: (tasks: ITask[]) => {
            return tasks.filter(task => task.date === getTaskDateByLabel(ETaskDate.TODAY));
        },
        hideAt: 'xs'
    },
    {
        label: 'This week',
        sort: (tasks: ITask[]) => {
            const weekEnd = new Date();
            for (let i = 0; i < 7; i++) {
                weekEnd.setDate(weekEnd.getDate() + 1);
                if (!weekEnd.getDay()) {
                    break;
                }
            }
            return tasks.filter(task => task.date && task.date <= weekEnd.setHours(0, 0, 0, 0));
        },
        hideAt: 'lg'
    },
    {
        label: 'This month',
        sort: (tasks: ITask[]) => {
            return tasks.filter(task => task.date === getTaskDateByLabel(ETaskDate.THIS_MONTH));
        }
    },
    {
        label: 'This year',
        sort: (tasks: ITask[]) => {
            return tasks.filter(task => new Date(task.date).getFullYear() === new Date().getFullYear());
        },
        hideAt: 'sm'
    },
];