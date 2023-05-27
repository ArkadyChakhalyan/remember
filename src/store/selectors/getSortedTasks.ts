import { ETaskDate, ETaskListTab, ITask } from '../../types/types';
import { getTaskDateByLabel } from '../../helpers/getTaskDateByLabel';

export const getSortedTasks = (
    tab: ETaskListTab,
    tasks: ITask[]
): ITask[] => {
    if (tab === ETaskListTab.ALL) {
        return tasks;
    } else if (tab === ETaskListTab.TODAY) {
        return tasks.filter(task => task.date && task.date <= getTaskDateByLabel(ETaskDate.TODAY));
    } else if (tab === ETaskListTab.THIS_WEEK) {
        return tasks.filter(task => task.date && task.date <= getTaskDateByLabel(ETaskDate.THIS_WEEK));
    } else if (tab === ETaskListTab.THIS_MONTH) {
        return tasks.filter(task => task.date && task.date <= getTaskDateByLabel(ETaskDate.THIS_MONTH));
    } else if (tab === ETaskListTab.THIS_YEAR) {
        return tasks.filter(task => task.date && new Date(task.date).getFullYear() <= new Date().getFullYear());
    }
}