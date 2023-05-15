import { alpha, Button, Stack, TextField } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { NEW_TASK_PLACEHOLDER, NEW_TASK_PRIORITIES } from './constants';
import { TNewTaskProps } from './types';
import { NewTaskPriority } from './newTaskPriority/newTaskPriority';
import { DEFAULT_TASK_PRIORITY } from '../../app/constants';
import { theme } from '../../style/theme';
import { teal } from '@mui/material/colors';
import { NewTaskDate } from './newTaskDate/newTaskDate';
import { getTaskDateByLabel } from '../../helpers/getTaskDateByLabel';
import { ETaskDate } from './newTaskDate/types';
import { useDispatch } from 'react-redux';
import { addTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import { v4 as uuid } from 'uuid';

export const NewTask: FC<TNewTaskProps> = ({
    preventClose,
    onClose
}) => {
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [priority, setPriority] = useState(DEFAULT_TASK_PRIORITY);
    const [date, setDate] = useState(getTaskDateByLabel(ETaskDate.THIS_MONTH));

    const onAdd = () => {
        dispatch(addTaskAC({
            id: uuid(),
            text,
            priority,
            date,
            doneDate: null
        }));
        onClose();
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!text) return;
        if (e.key === 'Enter') {
            onAdd();
        }
    };

    const onInputKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
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
        <Stack sx={priorityStyle}>
            {
                NEW_TASK_PRIORITIES.map((value) => (
                    <NewTaskPriority
                        key={value}
                        priority={value}
                        selected={value === priority}
                        onSelect={() => setPriority(value)}
                    />
                ))
            }
        </Stack>
        <Button
            size={'large'}
            variant={'contained'}
            disabled={!text}
            disableRipple
            disableTouchRipple
            disableFocusRipple
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
    background: teal[500],
    color: theme.palette.secondary.main,
    boxShadow: 'none',
    textTransform: 'none',
    '&:focus, &:hover': {
        boxShadow: `0 ${theme.spacing(0.25)} ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.3)}`,
        background: teal[500],
    },
    '&:disabled': {
        background: alpha(theme.palette.primary.main, 0.1),
    }
};

const priorityStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: `calc(100% - ${theme.spacing(1.5)})`,
    ml: `${theme.spacing(0.75)} !important`
};