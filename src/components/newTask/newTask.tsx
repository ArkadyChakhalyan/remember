import { alpha, Button, Stack, TextField } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { NEW_TASK_PLACEHOLDER, NEW_TASK_PRIORITIES } from './constants';
import { TNewTaskProps } from './types';
import { NewTaskPriority } from './newTaskPriority/newTaskPriority';
import { DEFAULT_TASK_PRIORITY } from '../../app/constants';
import { theme } from '../../style/theme';
import { teal } from '@mui/material/colors';
import { NewTaskDate } from './newTaskDate/newTaskDate';
import { getTaskDateByLabel } from './helpers/getTaskDateByLabel';
import { ETaskDate } from './newTaskDate/types';

export const NewTask: FC<TNewTaskProps> = ({
    preventClose
}) => {
    const [value, setValue] = useState('');
    const [emotion, setEmotion] = useState(DEFAULT_TASK_PRIORITY);
    const [date, setDate] = useState(getTaskDateByLabel(ETaskDate.THIS_MONTH));

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
                !value &&
                emotion === DEFAULT_TASK_PRIORITY &&
                date === getTaskDateByLabel(ETaskDate.THIS_MONTH)
            ) {
                return;
            }
            preventClose();
        }
    }, [value, emotion]);

    return <Stack style={containerStyle} spacing={2}>
        <NewTaskDate date={date} onChange={setDate} />
        <TextField
            ref={inputRef}
            multiline
            autoFocus
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            placeholder={NEW_TASK_PLACEHOLDER}
            variant={'standard'}
            id={'new-task-input'}
            sx={inputStyle}
        />
        <Stack sx={priorityStyle}>
            {
                NEW_TASK_PRIORITIES.map(({ color, value }) => (
                    <NewTaskPriority
                        key={value}
                        color={color}
                        selected={emotion === value}
                        onSelect={() => setEmotion(value)}
                    />
                ))
            }
        </Stack>
        <Button
            size={'large'}
            variant={'contained'}
            disabled={!value}
            disableRipple
            disableTouchRipple
            disableFocusRipple
            sx={buttonStyle}
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