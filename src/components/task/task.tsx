import { alpha, Checkbox, IconButton, Stack, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { TTaskProps } from './types';
import { useDispatch } from 'react-redux';
import { toggleTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import { theme } from '../../style/theme';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';

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
        <Checkbox
            checked={!!doneDate}
            onChange={onToggle}
            disableRipple
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
            sx={inputStyle}
            fullWidth
        />
    </Stack>;
};

const containerStyle = {
    flexDirection: 'row',
    borderRadius: theme.shape.borderRadius * 2
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
        color: theme.palette.secondary.main
    },
};

const checkboxStyle = {
    '&.Mui-focusVisible svg': {
        background: alpha(theme.palette.secondary.main, 0.08),
        borderRadius: theme.shape.borderRadius,
        boxShadow: `0 ${theme.spacing(0.25)} ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.4)}`,
    }
};
