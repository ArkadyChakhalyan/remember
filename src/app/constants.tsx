import { alpha } from '@mui/material';
import { theme } from '../style/theme';
import { TTaskPriority } from '../types/types';

export const DEFAULT_TASK_PRIORITY = 0 as TTaskPriority;

export const PRIORITY_COLORS = Object.freeze({
    0: alpha('#919191', 0.3),
    1: alpha(theme.palette.error.main, 0.25),
    2: alpha(theme.palette.error.main, 0.45),
    3: alpha(theme.palette.error.main, 0.7),
    4: theme.palette.error.main,
});

export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_CALENDAR = 'calendar';
export const ROUTE_TASKS = 'tasks';

export const ROUTE_SETTINGS = 'settings';