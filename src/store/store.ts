import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "./reducers/tasksReducer/tasksReducer";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
});