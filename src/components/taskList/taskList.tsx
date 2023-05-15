import { alpha, Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TTaskListProps } from './types';
import { Task } from '../task/task';
import { TASK_LIST_ADD, TASK_LIST_EMPTY } from './constants';
import { theme } from '../../style/theme';

export const TaskList: FC<TTaskListProps> = ({
    tasks
}) => {
    return <Stack spacing={0.25} sx={containerStyle}>
        {
            tasks.length ?
                tasks.map(task => (<Task key={task.id} task={task} />))
                : <Typography sx={textStyle}>{TASK_LIST_EMPTY}</Typography>
        }
        <Button
            variant={'text'}
            color={'secondary'}
            disableRipple
            disableTouchRipple
            disableFocusRipple
            sx={buttonStyle}
            size={'large'}
        >
            {TASK_LIST_ADD}
        </Button>
    </Stack>;
};

const containerStyle = {
    position: 'relative',
    height: 1,
    overflow: 'auto'
};

const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.4rem',
    fontWeight: 500,
    userSelect: 'none',
    color: alpha(theme.palette.secondary.main, 0.2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    }
};

const buttonStyle = {
    justifyContent: 'flex-start',
    px: 2,
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'none',
    color: alpha(theme.palette.secondary.main, 0.6),
    '&:hover, &:focus': {
        color: theme.palette.secondary.main,
        background: 'none'
    }
};