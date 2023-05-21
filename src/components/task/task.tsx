import { alpha, Box, Checkbox, Stack, TextField } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { TTaskProps } from './types';
import { useDispatch } from 'react-redux';
import { addTaskAC, editTaskAC, toggleTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import { theme } from '../../style/theme';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { TaskActions } from './taskActions/taskActions';
import { PRIORITY_COLORS } from '../../app/constants';
import { NEW_TASK_PLACEHOLDER } from '../newTask/constants';
import { v4 as uuid } from 'uuid';
import { ITask, TTaskPriority } from '../../types/types';

export const Task: FC<TTaskProps> = ({
    task,
    onClose
}) => {
    const { id, text } = task;

    const dispatch = useDispatch();

    const [value, setValue] = useState(text);
    const [inputFocus, setInputFocus] = useState(null);
    const [taskModel, setTaskModel] = useState(task);

    const ref = useRef(null);
    const inputRef = useRef(null);
    const initialTaskRef = useRef(task);

    const onTaskChange = (task: Partial<ITask>) => {
        if (id) {
            dispatch(editTaskAC({ id, ...task }))
        } else {
            setTaskModel({ ...taskModel, ...task });
        }
    };

    const onDateChange = (date: number) => {
        onTaskChange({ date });
    };

    const onPriorityChange = (priority: TTaskPriority) => {
        onTaskChange({ priority });
    };

    const onToggle = () => {
        if (id) {
            dispatch(toggleTaskAC(id));
        } else {
            onTaskChange({ doneDate: taskModel?.doneDate ? null : Date.now() });
        }
    };

    const onAdd = () => {
        if (!value || !value.trim()) return;
        dispatch(addTaskAC({
            ...taskModel,
            id: uuid(),
            createDate: Date.now(),
            text: value.trim(),
        }));
        setValue('');
        setTaskModel(initialTaskRef.current);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (id) {
                if (inputFocus) {
                    onSave();
                    ref?.current?.focus();
                } else if (ref?.current === document.activeElement) {
                    e.preventDefault();
                    inputRef?.current?.querySelector('textarea')?.focus();
                }
            } else {
                onAdd();
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
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && value?.trim()) {
            e.stopPropagation();
            setValue(value + '\n');
        } else if (e.key === 'Enter') {
            e.preventDefault();
        } else if (e.key === 'Escape') {
            if (id) {
                setValue(text);
            } else {
                onClose();
            }
        }
    };

    const onSave = () => {
        if (id && value?.trim() !== text) {
            dispatch(editTaskAC({ id, text: value.trim() }));
        }
    };

    const onBlur = (e: React.FocusEvent) => {
        onSave();
        if (id || ref?.current?.contains(e.relatedTarget)) return;
        onAdd();
        onClose();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        setTaskModel(task);
    }, [task]);

    return <Stack
        ref={ref}
        sx={containerStyle}
        onKeyDown={onKeyDown}
        tabIndex={0}
        onBlur={onBlur}
    >
        {!!taskModel.priority && <Box sx={{ ...priorityStyle, bgcolor: PRIORITY_COLORS[taskModel.priority] }} />}
        <Checkbox
            checked={!!taskModel.doneDate}
            onChange={onToggle}
            color={'success'}
            checkedIcon={<CheckCircleRoundedIcon />}
            icon={<RadioButtonUncheckedRoundedIcon />}
            sx={checkboxStyle}
        />
        <TextField
            value={value}
            onChange={onInputChange}
            variant={'standard'}
            id={'task-input'}
            sx={{ ...inputStyle, ...(value && !!taskModel.doneDate ? doneStyle : null) }}
            fullWidth
            autoFocus={!id}
            autoComplete={'off'}
            multiline
            placeholder={NEW_TASK_PLACEHOLDER}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            onKeyDown={onInputKeyDown}
            InputProps={{ ref: inputRef }}
        />
        <TaskActions
            task={taskModel}
            onDelete={onClose}
            onDateChange={onDateChange}
            onPriorityChange={onPriorityChange}
        />
    </Stack>;
};

const containerStyle = {
    position: 'relative',
    alignItems: 'flex-start',
    flexDirection: 'row',
    pl: 0.25,
    borderRadius: theme.shape.borderRadius * 1.75,
    overflow: 'hidden',
    background: theme.palette.background.default,
    '&:focus-within, &:hover': {
        '.MuiIconButton-root:last-of-type': {
            opacity: 1,
            pointerEvents: 'all'
        }
    },
    '&:focus-visible': {
        outline: 'none'
    },
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
