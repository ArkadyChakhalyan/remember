import { alpha, Box, Checkbox, Stack, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { TTaskProps } from './types';
import { useDispatch } from 'react-redux';
import { toggleTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import { theme } from '../../style/theme';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import { TaskActions } from './taskActions/taskActions';
import { PRIORITY_COLORS } from '../../app/constants';

export const Task: FC<TTaskProps> = ({
    task
}) => {
    const {
        id,
        date,
        doneDate,
        text,
        priority
    } = task;

    const dispatch = useDispatch();

    const [value, setValue] = useState(text);

    const onToggle = () => {
        dispatch(toggleTaskAC(id));
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return <Stack sx={containerStyle}>
        {!!priority && <Box sx={{ ...priorityStyle, bgcolor: PRIORITY_COLORS[priority] }} />}
        <Checkbox
            checked={!!doneDate}
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
            sx={{ ...inputStyle, ...(doneDate ? doneStyle : null) }}
            fullWidth
            autoComplete={'off'}
        />
        <TaskActions task={task} />
    </Stack>;
};

const containerStyle = {
    position: 'relative',
    flexDirection: 'row',
    pl: 0.25,
    borderRadius: theme.shape.borderRadius * 2,
    '&:focus-within, &:hover': {
        '.MuiIconButton-root:last-of-type': {
            opacity: 1,
            pointerEvents: 'all'
        }
    }
};

const inputStyle = {
    '.MuiInputBase-root': {
        height: 1,
        '&:after, &:before': {
            display: 'none'
        }
    },
    '.MuiInputBase-input': {
        height: '100% !important',
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
