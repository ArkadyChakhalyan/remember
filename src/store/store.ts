import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "./reducers/tasksReducer/tasksReducer";
import dashboardReducer from './reducers/dashboardReducer/dashboardReducer';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        dashboard: dashboardReducer
    }
});