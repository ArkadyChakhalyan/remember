import { MenuItem, Select } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { TNewTaskDateProps } from './types';
import { NEW_TASK_DATES } from './constants';
import { getTaskDateByLabel } from '../helpers/getTaskDateByLabel';
import { theme } from '../../../style/theme';

export const NewTaskDate: FC<TNewTaskDateProps> = ({
    date,
    onChange
}) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(NEW_TASK_DATES.map(item => {
            return {
                ...item,
                value: getTaskDateByLabel(item.label)
            }
        }));
    }, []);

    if (!options.length) return;

    return <Select
        variant={'standard'}
        sx={selectStyle}
        id={'new-task-date'}
        value={date}
        onChange={e => onChange(Number(e.target.value))}
        MenuProps={{
            sx: menuStyle,
            disablePortal: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
            }
        }}
    >
        {options.map(({ label, value }) => (
            <MenuItem
                sx={itemStyle}
                key={label}
                value={value}
                disableRipple
                disableTouchRipple
            >
                {label}
            </MenuItem>
        ))}
    </Select>;
};

const selectStyle = {
    width: 'fit-content',
    border: 'none',
    '&:before, &:after': {
        display: 'none'
    },
    '.MuiInputBase-input': {
        p: '0 !important',
        fontWeight: 600,
        '&:focus, &:active': {
            background: 'none'
        }
    },
    '.MuiSvgIcon-root': {
        display: 'none'
    },
};

const menuStyle = {
    '.MuiPaper-root': {
        mt: 1,
        ml: -0.5,
        p: 1.5,
        borderRadius: theme.shape.borderRadius * 4
    },
    '.MuiList-root': {
        p: 0
    }
};

const itemStyle = {
    borderRadius: theme.shape.borderRadius * 2,
};