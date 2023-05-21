import { ETaskDate, ETaskListTab } from '../types/types';
import { getTaskDateByLabel } from './getTaskDateByLabel';

export const getTaskDateByTab = (
    tab: ETaskListTab
): number => {
    if (tab === ETaskListTab.ALL) {
        return null;
    } else if (tab === ETaskListTab.TODAY) {
        return getTaskDateByLabel(ETaskDate.TODAY)
    } else if (tab === ETaskListTab.THIS_WEEK) {
        return getTaskDateByLabel(ETaskDate.THIS_WEEK)
    } else if (tab === ETaskListTab.THIS_MONTH) {
        return getTaskDateByLabel(ETaskDate.THIS_MONTH);
    } else if (tab === ETaskListTab.THIS_YEAR) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1, 0, -1);
        return date.setHours(0, 0, 0, 0);
    }
}