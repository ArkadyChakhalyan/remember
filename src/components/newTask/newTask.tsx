import { alpha, Button, Stack, TextField } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { NEW_TASK_PLACEHOLDER } from './constants';
import { TNewTaskProps } from './types';
import { DEFAULT_TASK_PRIORITY, ROUTE_DASHBOARD } from '../../app/constants';
import { theme } from '../../style/theme';
import { NewTaskDate } from './newTaskDate/newTaskDate';
import { getTaskDateByLabel } from '../../helpers/getTaskDateByLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import { v4 as uuid } from 'uuid';
import { ETaskDate, ETaskListTab, TTaskPriority } from '../../types/types';
import { TaskPriorities } from '../taskPriorities/taskPriorities';
import { getDashboardTaskListTab } from '../../store/reducers/dashboardReducer/selectors/getDashboardTaskListTab';
import { useLocation } from 'react-router-dom';
import { getTaskDateByTab } from '../../helpers/getTaskDateByTab';
import { setUnseenTaskDateAC } from '../../store/reducers/dashboardReducer/dashboardReducer';

export const NewTask: FC<TNewTaskProps> = ({
    preventClose,
    onClose
}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const tab = useSelector(getDashboardTaskListTab);

    const [text, setText] = useState('');
    const [priority, setPriority] = useState(DEFAULT_TASK_PRIORITY);
    const [date, setDate] = useState(getTaskDateByLabel(ETaskDate.THIS_MONTH));

    const inputRef = useRef(null);

    const onAdd = () => {
        if (!text || !text.trim()) return;
        dispatch(addTaskAC({
            id: uuid(),
            createDate: Date.now(),
            text: text.trim(),
            priority,
            date,
            doneDate: null
        }));
        if (
            location.pathname.includes((ROUTE_DASHBOARD)) &&
            (tab !== ETaskListTab.ALL && (date > getTaskDateByTab(tab) || !date))
        ) {
           dispatch(setUnseenTaskDateAC(!date ?
               Date.now() * Date.now() // random big number to highlight 'all' when no date selected
               : date)
           );
        }
        setTimeout(onClose, 0); // wait for click on paper
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onAdd();
        }
    };

    const onInputKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && text && text.trim()) {
            e.stopPropagation();
            setText(text + '\n');
        } else if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const onPriorityChange = (
        e: React.KeyboardEvent | React.MouseEvent,
        priority: TTaskPriority
    ) => {
        const { key } = e as React.KeyboardEvent;
        if (key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
        }
        setPriority(priority);
    };

    useEffect(() => {
        setTimeout(() => {
            const input = inputRef?.current.querySelector('textarea');
            if (!input) return;
            input.focus();
        }, 0);
    }, []);

    useEffect(() => {
        if (preventClose) {
            if (
                !text &&
                priority === DEFAULT_TASK_PRIORITY &&
                date === getTaskDateByLabel(ETaskDate.THIS_MONTH)
            ) {
                return;
            }
            preventClose();
        }
    }, [text, priority]);

    return <Stack sx={containerStyle} spacing={2} onKeyDown={onKeyDown}>
        <NewTaskDate date={date} onChange={setDate} />
        <TextField
            ref={inputRef}
            multiline
            autoFocus
            value={text}
            onChange={e => setText(e.currentTarget.value)}
            placeholder={NEW_TASK_PLACEHOLDER}
            variant={'standard'}
            id={'new-task-input'}
            onKeyDown={onInputKeyDown}
            sx={inputStyle}
        />
        <TaskPriorities priority={priority} onPriorityChange={onPriorityChange} sx={priorityStyle} />
        <Button
            size={'large'}
            variant={'contained'}
            disabled={!text}
            sx={buttonStyle}
            onClick={onAdd}
        >
            Add new task
        </Button>
    </Stack>;
};

const containerStyle = {
    height: '100%',
};

const inputStyle = {
    flexGrow: 1,
    mt: `${theme.spacing()} !important`,
    '.MuiInputBase-root': {
        height: 1,
        '&:after, &:before': {
            display: 'none'
        }
    },
    '.MuiInputBase-input': {
        height: '100% !important'
    },
};

const buttonStyle = {
    borderRadius: theme.shape.borderRadius * 3,
    background: theme.palette.success.main,
    color: theme.palette.secondary.main,
    boxShadow: 'none',
    textTransform: 'none',
    '&:focus, &:hover': {
        boxShadow: `0 ${theme.spacing(0.25)} ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.3)}`,
        background: theme.palette.success.main,
    },
    '&:disabled': {
        background: alpha(theme.palette.success.main, 0.3),
    }
};

const priorityStyle = {
    width: `calc(100% - ${theme.spacing(1.5)})`,
    ml: `${theme.spacing(0.75)} !important`
};