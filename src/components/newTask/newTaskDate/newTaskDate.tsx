import { MenuItem, Select } from '@mui/material';
import React, { FC, useRef } from 'react';
import { TNewTaskDateProps } from './types';
import { theme } from '../../../style/theme';
import { TASK_DATES } from '../../../app/constants';
import { ETaskDate } from '../../../types/types';

export const NewTaskDate: FC<TNewTaskDateProps> = ({
    date,
    onChange
}) => {
    const ref = useRef(null);

    const onOpen = () => {
        setTimeout(() => {
            ref?.current?.querySelector('ul')?.focus();
        }, 100);
    };

    return <Select
        variant={'standard'}
        sx={selectStyle}
        id={'new-task-date'}
        value={date}
        onChange={e => onChange(e.target.value as ETaskDate)}
        onOpen={onOpen}
        MenuProps={{
            sx: menuStyle,
            disablePortal: true,
            disableAutoFocusItem: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
            },
            ref
        }}
    >
        {TASK_DATES.map((date) => (
            <MenuItem
                sx={itemStyle}
                key={date}
                value={date}
            >
                {date}
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