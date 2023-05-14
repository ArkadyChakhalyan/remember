import { IAppState } from '../../../types';
import { ITask } from '../types';

export const getTasks = (
    state: IAppState
): ITask[] => {
    return Object.values(state.tasks);
}