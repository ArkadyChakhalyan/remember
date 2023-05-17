import { alpha, Box, Checkbox, Stack, TextField } from '@mui/material';
import React, { FC, useRef, useState } from 'react';
import { TTaskProps } from './types';
import { useDispatch } from 'react-redux';
import { addTaskAC, editTaskAC, toggleTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import { theme } from '../../style/theme';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import { TaskActions } from './taskActions/taskActions';
import { PRIORITY_COLORS } from '../../app/constants';
import { NEW_TASK_PLACEHOLDER } from '../newTask/constants';
import { v4 as uuid } from 'uuid';

export const Task: FC<TTaskProps> = ({
    task,
    onClose
}) => {
    const {
        id,
        date,
        doneDate,
        text,
        priority
    } = task;

    const isNew = !id;

    const dispatch = useDispatch();

    const [value, setValue] = useState(text);
    const [newDoneDate, setNewDoneDate] = useState(null);
    const [newPriority, setNewPriority] = useState(priority);
    const [newDate, setNewDate] = useState(date);
    const [inputFocus, setInputFocus] = useState(null);

    const ref = useRef(null);
    const inputRef = useRef(null);

    const onToggle = () => {
        if (isNew) {
            setNewDoneDate(newDoneDate ? null : Date.now());
        } else {
            dispatch(toggleTaskAC(id));
        }
    };

    const onAdd = () => {
        if (!value || !value.trim()) return;
        dispatch(addTaskAC({
            id: uuid(),
            createDate: Date.now(),
            text: value.trim(),
            priority: newPriority,
            date: newDate,
            doneDate: newDoneDate
        }));
        setValue('');
        setNewDate(date);
        setNewDoneDate(priority);
        setNewDoneDate(null);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (isNew) {
                onAdd();
            } else {
                if (inputFocus) {
                    onSave();
                    ref?.current?.focus();
                } else if (ref?.current === document.activeElement) {
                    e.preventDefault();
                    inputRef?.current?.querySelector('textarea')?.focus();
                }
            }
        }
        if (
            e.key === ' ' &&
            ref?.current === document.activeElement
        ) {
            onToggle();
        }
    };

    const onInputKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && value && value.trim()) {
            e.stopPropagation();
            setValue(value + '\n');
        } else if (e.key === 'Enter') {
            e.preventDefault();
        } else if (e.key === 'Escape') {
            if (isNew) {
                onClose();
            } else {
                setValue(text);
            }
        }
    };

    const onSave = () => {
        if (!isNew && value.trim() !== text) {
            dispatch(editTaskAC({ id, text: value.trim() }));
        }
    };

    const onBlur = (e: React.FocusEvent) => {
        onSave();
        if (!isNew || ref?.current?.contains(e.relatedTarget)) return;
        onAdd();
        onClose();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return <Stack
        ref={ref}
        sx={containerStyle}
        onKeyDown={onKeyDown}
        tabIndex={0}
        onBlur={onBlur}
    >
        {!!priority && <Box sx={{ ...priorityStyle, bgcolor: PRIORITY_COLORS[priority] }} />}
        <Checkbox
            checked={!!doneDate || !!newDoneDate}
            onChange={onToggle}
            color={'success'}
            checkedIcon={<CheckBoxRoundedIcon />}
            icon={<CheckBoxOutlineBlankRoundedIcon />}
            sx={checkboxStyle}
        />
        <TextField
            value={value}
            onChange={onInputChange}
            variant={'standard'}
            id={'task-input'}
            sx={{ ...inputStyle, ...(value && (doneDate || newDoneDate) ? doneStyle : null) }}
            fullWidth
            autoFocus={isNew}
            autoComplete={'off'}
            multiline
            placeholder={NEW_TASK_PLACEHOLDER}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            onKeyDown={onInputKeyDown}
            InputProps={{ ref: inputRef }}
        />
        <TaskActions
            task={task}
            onDelete={onClose}
            onDateChange={setNewDate}
            onPriorityChange={setNewPriority}
        />
    </Stack>;
};

const containerStyle = {
    position: 'relative',
    alignItems: 'flex-start',
    flexDirection: 'row',
    pl: 0.25,
    borderRadius: theme.shape.borderRadius * 2,
    '&:focus-within, &:hover': {
        '.MuiIconButton-root:last-of-type': {
            opacity: 1,
            pointerEvents: 'all'
        }
    },
    '&:focus-visible': {
        outline: 'none'
    }
};

const inputStyle = {
    height: 1,
    '.MuiInputBase-root': {
        height: 1,
        '&:after, &:before': {
            display: 'none'
        }
    },
    '.MuiInputBase-input': {
        minHeight: theme.spacing(3.5),
        pt: '5px',
        textOverflow: 'ellipsis',
        color: theme.palette.secondary.main,
    },
};

const doneStyle = {
    '.MuiInputBase-root': {
        ...inputStyle['.MuiInputBase-root'],
        color: theme.palette.secondary.main,
        textDecoration: 'line-through',
        '&:focus-within': {
            textDecoration: 'none'
        },
    },
};

const checkboxStyle = {
    color: alpha(theme.palette.secondary.main, 0.8),
    transition: theme.transitions.create('color'),
    '&.Mui-focusVisible:not(.Mui-checked), &:hover:not(.Mui-checked)': {
        color: theme.palette.secondary.main,
    },
    '&.Mui-focusVisible svg': {
        background: alpha(theme.palette.secondary.main, 0.08),
        borderRadius: theme.shape.borderRadius,
        boxShadow: `0 ${theme.spacing(0.25)} ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.4)}`,
    }
};

const priorityStyle = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: theme.spacing(0.5),
    height: `calc(100% - ${theme.spacing(1.75)})`,
    borderRadius: theme.shape.borderRadius
};
