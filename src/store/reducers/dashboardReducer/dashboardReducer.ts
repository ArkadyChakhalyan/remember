import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDashboardState } from './types';
import { ETaskListTab } from '../../../types/types';
import { getDashboardTaskListTabLocalStorage } from './localStorage/getDashboardTaskListTabLocalStorage';
import { setDashboardTaskListTabLocalStorage } from './localStorage/setDashboardTaskListTabLocalStorage';

const initialState: TDashboardState = {
    taskListTab: getDashboardTaskListTabLocalStorage()
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        changeTaskListTabAC: (state, action: PayloadAction<ETaskListTab>) => {
            setDashboardTaskListTabLocalStorage(action.payload);
            return {
                ...state,
                taskListTab: action.payload
            };
        },
        setUnseenTaskDateAC: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                unseenTaskDate: action.payload
            };
        },
    }
});

export const {
    changeTaskListTabAC,
    setUnseenTaskDateAC
} = dashboardSlice.actions;

export default dashboardSlice.reducer;