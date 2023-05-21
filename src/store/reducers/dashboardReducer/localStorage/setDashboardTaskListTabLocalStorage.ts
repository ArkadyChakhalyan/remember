import { DASHBOARD_TASK_LIST_TAB_LOCAL_STORAGE } from './constants';
import { ETaskListTab } from '../../../../types/types';

export const setDashboardTaskListTabLocalStorage = (tab: ETaskListTab) => {
    localStorage.setItem(DASHBOARD_TASK_LIST_TAB_LOCAL_STORAGE, tab);
};