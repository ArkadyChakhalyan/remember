import { IAppState } from '../../../types';

export const getDashboardUnseenTaskDate = (
    state: IAppState
): number => {
    return state.dashboard?.unseenTaskDate;
}