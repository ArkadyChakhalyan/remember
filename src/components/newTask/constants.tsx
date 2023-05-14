import { theme } from '../../style/theme';
import { alpha } from '@mui/material';
import { TTaskPriority } from '../../store/reducers/tasksReducer/types';

export const NEW_TASK_PLACEHOLDER = 'I need to...';

export const NEW_TASK_PRIORITIES: { value: TTaskPriority, color: string }[] = [
    {
        value: 0,
        color: alpha(theme.palette.primary.main, 0.1)
    },
    {
        value: 1,
        color: alpha(theme.palette.error.main, 0.2)
    },
    {
        value: 2,
        color: alpha(theme.palette.error.main, 0.4)
    },
    {
        value: 3,
        color: alpha(theme.palette.error.main, 0.7)
    },
    {
        value: 4,
        color: theme.palette.error.main
    },
];