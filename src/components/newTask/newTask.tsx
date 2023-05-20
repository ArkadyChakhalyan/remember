import { alpha, Button, Stack, TextField } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { NEW_TASK_PLACEHOLDER } from './constants';
import { TNewTaskProps } from './types';
import { DEFAULT_TASK_PRIORITY } from '../../app/constants';
import { theme } from '../../style/theme';
import { NewTaskDate } from './newTaskDate/newTaskDate';
import { getTaskDateByLabel } from '../../helpers/getTaskDateByLabel';
import { useDispatch } from 'react-redux';
import { addTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import { v4 as uuid } from 'uuid';
import { ETaskDate } from '../../types/types';
import { TaskPriorities } from '../taskPriorities/taskPriorities';

export const NewTask: FC<TNewTaskProps> = ({
    preventClose,
    onClose
}) => {
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [priority, setPriority] = useState(DEFAULT_TASK_PRIORITY);
    const [date, setDate] = useState(getTaskDateByLabel(ETaskDate.THIS_MONTH));

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

    const inputRef = useRef(null);

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
        <TaskPriorities priority={priority} onPriorityChange={setPriority} sx={priorityStyle} />
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
        background: alpha(theme.palette.primary.main, 0.1),
    }
};

const priorityStyle = {
    width: `calc(100% - ${theme.spacing(1.5)})`,
    ml: `${theme.spacing(0.75)} !important`
};