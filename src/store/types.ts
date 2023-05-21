import { store } from './store';
import { ITasksState } from './reducers/tasksReducer/types';
import { TDashboardState } from './reducers/dashboardReducer/types';

export interface IAppState {
    tasks?: ITasksState;
    dashboard: TDashboardState;
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch