import { IAppState } from '../../../types';
import { ETaskListTab } from '../../../../types/types';

export const getDashboardTaskListTab = (
    state: IAppState
): ETaskListTab => {
    return state.dashboard.taskListTab;
}