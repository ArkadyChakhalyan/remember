import { ETaskListTab } from '../../../types/types';

export interface TDashboardState {
    taskListTab: ETaskListTab;
    unseenTaskDate?: number;
}