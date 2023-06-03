import { ETaskDate, ETaskListTab, ITask } from '../../types/types';
import { getTaskDateByLabel } from '../../helpers/getTaskDateByLabel';

export const getSortedTasks = (
    tab: ETaskListTab,
    tasks: ITask[]
): ITask[] => {
    let sortedTasks = tasks;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() - 1);
    if (tab === ETaskListTab.TODAY) {
        sortedTasks = tasks.filter(task => {
            return task.date &&
                task.date > today.getMilliseconds() &&
                task.date <= getTaskDateByLabel(ETaskDate.TODAY);
        });
    } else if (tab === ETaskListTab.THIS_WEEK) {
        sortedTasks = tasks.filter(task => {
            return task.date &&
                task.date > today.getMilliseconds() &&
                task.date <= getTaskDateByLabel(ETaskDate.THIS_WEEK);
        });
    } else if (tab === ETaskListTab.THIS_MONTH) {
        sortedTasks = tasks.filter(task => {
            return task.date &&
                task.date > today.getMilliseconds() &&
                task.date <= getTaskDateByLabel(ETaskDate.THIS_MONTH);
        });
    } else if (tab === ETaskListTab.THIS_YEAR) {
        sortedTasks = tasks.filter(task => {
            return task.date &&
                task.date > today.getMilliseconds() &&
                new Date(task.date).getFullYear() <= new Date().getFullYear();
        });
    } else if (tab === ETaskListTab.OVERDUE) {
        sortedTasks = tasks.filter(task => task.date && new Date(task.date) <= today);
    }
    return sortedTasks.sort((a, b) => a.orderNumber - b.orderNumber);
}