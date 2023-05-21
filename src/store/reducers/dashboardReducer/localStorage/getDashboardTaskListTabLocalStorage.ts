import { DASHBOARD_TASK_LIST_TAB_LOCAL_STORAGE } from './constants';
import { ETaskListTab } from '../../../../types/types';

export const getDashboardTaskListTabLocalStorage = (): ETaskListTab => {
    const tab = localStorage.getItem(DASHBOARD_TASK_LIST_TAB_LOCAL_STORAGE) as ETaskListTab;
    return tab || ETaskListTab.TODAY;
};