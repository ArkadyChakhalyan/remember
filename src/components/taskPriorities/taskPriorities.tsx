import { Stack } from '@mui/material';
import React, { FC } from 'react';
import { TTaskPrioritiesProps } from './types';
import { theme } from '../../style/theme';
import { TaskPriority } from './taskPriority/taskPriority';
import { TASK_PRIORITIES } from './constants';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles/createTheme';
import { DEFAULT_TASK_PRIORITY } from '../../app/constants';

export const TaskPriorities: FC<TTaskPrioritiesProps> = ({
    priority,
    sx,
    onPriorityChange
}) => {
    return <Stack sx={{ ...priorityStyle, ...sx } as SxProps<Theme>}>
        {
            TASK_PRIORITIES.map((value) => (
                <TaskPriority
                    key={value}
                    priority={value}
                    selected={value === priority}
                    onSelect={e => onPriorityChange(e, value === priority ? DEFAULT_TASK_PRIORITY : value)}
                />
            ))
        }
    </Stack>;
};

const priorityStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: theme.spacing(33.75),
};