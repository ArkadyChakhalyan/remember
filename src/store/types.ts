import { store } from './store';
import { TTasksState } from './reducers/tasksReducer/types';

export interface IAppState {
    tasks?: TTasksState;
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch