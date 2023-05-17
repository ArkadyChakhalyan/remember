import { alpha, Button, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { TTaskListProps } from './types';
import { Task } from '../task/task';
import { TASK_LIST_ADD, TASK_LIST_EMPTY } from './constants';
import { theme } from '../../style/theme';
import { DEFAULT_TASK_PRIORITY } from '../../app/constants';
import { getTaskDateByTab } from './helpers/getTaskDateByTab';

export const TaskList: FC<TTaskListProps> = ({
    tab,
    tasks
}) => {
    const [show, setShow] = useState(null);

    return <Stack spacing={0.25} sx={containerStyle}>
        {!!tasks.length && tasks.map(task => (<Task key={task.id} task={task} />))}
        {show &&
            <Task
                task={{
                    id: null,
                    createDate: null,
                    text: '',
                    date: getTaskDateByTab(tab),
                    priority: DEFAULT_TASK_PRIORITY,
                    doneDate: null
                }}
                onClose={() => setShow(false)}
            />
        }
        <Button
            variant={'text'}
            color={'secondary'}
            sx={buttonStyle}
            size={'large'}
            onClick={() => setShow(true)}
        >
            {TASK_LIST_ADD}
        </Button>
        {!tasks.length && <Typography sx={textStyle}>{TASK_LIST_EMPTY}</Typography>}
    </Stack>;
};

const containerStyle = {
    position: 'relative',
    flexGrow: 1,
    '&:after': {
        content: '""',
        minHeight: theme.spacing(0.25)
    }
};

const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.3rem',
    fontWeight: 500,
    userSelect: 'none',
    color: alpha(theme.palette.secondary.main, 0.2),
    whiteSpace: 'nowrap',
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
    },
};