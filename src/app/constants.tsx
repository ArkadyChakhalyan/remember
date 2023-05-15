import { TTaskPriority } from '../store/reducers/tasksReducer/types';
import { alpha } from '@mui/material';
import { theme } from '../style/theme';

export const DEFAULT_TASK_PRIORITY = 0 as TTaskPriority;

export const PRIORITY_COLORS = Object.freeze({
    0: alpha(theme.palette.primary.main, 0.1),
    1: alpha(theme.palette.error.main, 0.25),
    2: alpha(theme.palette.error.main, 0.45),
    3: alpha(theme.palette.error.main, 0.7),
    4: theme.palette.error.main,
});