import { alpha } from '@mui/material';
import { theme } from '../style/theme';
import { ETaskDate, TTaskPriority } from '../types/types';

export const DEFAULT_TASK_PRIORITY = 0 as TTaskPriority;

export const PRIORITY_COLORS = Object.freeze({
    0: alpha('#919191', 0.4),
    1: '#f9d2ce', // error.main 25
    2: '#f3a59d', // error.main 50
    3: '#ed786c', // error.main 75
    4: theme.palette.error.main,
});

export const TASK_DATES = [
    ETaskDate.TODAY,
    ETaskDate.TOMORROW,
    ETaskDate.THIS_WEEK,
    ETaskDate.THIS_MONTH,
    ETaskDate.NEXT_MONTH,
    ETaskDate.SOMEDAY,
    // ETaskDate.CUSTOM
];

export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_CALENDAR = 'calendar';
export const ROUTE_TASKS = 'tasks';

export const ROUTE_SETTINGS = 'settings';