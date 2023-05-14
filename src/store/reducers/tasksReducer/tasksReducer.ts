import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask, TTaskId, TTasksState } from './types';

const initialState: TTasksState = {};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskAC: (state, action: PayloadAction<ITask>) => {
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        },
        deleteTaskAC: (state, action: PayloadAction<TTaskId>) => {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        },
        toggleTaskAC: (state, action: PayloadAction<TTaskId>) => {
            const item = state[action.payload];
            return {
                ...state,
                [item.id]: {
                    ...item,
                    doneDate: item.doneDate ? null : Date.now()
                }
            };
        },
        onEditTask: (state, action: PayloadAction<Partial<ITask>>) => {
            const task = action.payload;
            return {
                ...state,
                [task.id]: {
                    ...state[task.id],
                    ...task
                }
            };
        }
    }
});

export const {
    addTaskAC,
    deleteTaskAC,
    toggleTaskAC,
    onEditTask
} = tasksSlice.actions;

export default tasksSlice.reducer;