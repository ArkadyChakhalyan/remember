import { alpha, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Task } from '../task/task';
import { TASK_LIST_ADD, TASK_LIST_EMPTY } from './constants';
import { theme } from '../../style/theme';
import { DEFAULT_TASK_PRIORITY } from '../../app/constants';
import { getTaskDateByTab } from '../../helpers/getTaskDateByTab';
import { getSortedTasks } from '../../store/selectors/getSortedTasks';
import { useSelector } from 'react-redux';
import { getDashboardTaskListTab } from '../../store/reducers/dashboardReducer/selectors/getDashboardTaskListTab';
import { getTasks } from '../../store/reducers/tasksReducer/selectors/getTasks';

export const TaskList = () => {
    const [show, setShow] = useState(null);

    const tab = useSelector(getDashboardTaskListTab);
    const tasks = useSelector(getTasks);

    const sortedTasks = getSortedTasks(tab, tasks);

    return <Stack spacing={0.25} sx={containerStyle}>
        {!!sortedTasks.length && sortedTasks.map(task => (<Task key={task.id} task={task} />))}
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
        {!sortedTasks.length && <Typography sx={textStyle}>{TASK_LIST_EMPTY}</Typography>}
    </Stack>;
};

const containerStyle = {
    position: 'relative',
    flexGrow: 1,
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