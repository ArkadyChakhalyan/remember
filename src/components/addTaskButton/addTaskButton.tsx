import { IconButton, Stack } from '@mui/material';
import React, { FC } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { theme } from '../../style/theme';
import { TAddTaskButtonProps } from './types';

export const AddTaskButton: FC<TAddTaskButtonProps> = ({
    open,
    onClick,
    onMouseEnter,
    onMouseLeave
}) => {
    return <Stack sx={open ? toggleStyle : null}>
        <IconButton
            size={'large'}
            sx={buttonStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <AddRoundedIcon />
        </IconButton>
    </Stack>;
};

const buttonStyle = {
    height: theme.spacing(8),
    width: theme.spacing(8),
    background: theme.palette.success.main,
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 10,
    '.MuiSvgIcon-root': {
        color: theme.palette.secondary.main,
        transition: 'inherit'
    },
    '&:hover,&:focus': {
        '.MuiSvgIcon-root': {
            color: theme.palette.secondary.main
        },
    },
};

const toggleStyle = {
    '.MuiIconButton-root': {
        '.MuiSvgIcon-root': {
            transform: 'rotate(45deg)',
            color: theme.palette.secondary.main
        },
    },
};
