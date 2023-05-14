import { alpha, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TTaskListProps } from './types';
import { Task } from '../task/task';
import { TASK_LIST_EMPTY } from './constants';
import { theme } from '../../style/theme';

export const TaskList: FC<TTaskListProps> = ({
    tasks
}) => {
    return <Stack spacing={0.25} sx={{ ...containerStyle, ...(!tasks.length ? emptyStyle : null) }}>
        {
            tasks.length ?
                tasks.map(task => (<Task key={task.id} task={task} />))
                : <Typography sx={textStyle}>{TASK_LIST_EMPTY}</Typography>
        }
    </Stack>;
};

const containerStyle = {
    height: 1,
    overflow: 'auto'
};

const emptyStyle = {
    alignItems: 'center',
    justifyContent: 'center'
};

const textStyle = {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: alpha(theme.palette.secondary.main, 0.2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    }
};