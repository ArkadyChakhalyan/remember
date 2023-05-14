import { alpha, IconButton, Stack } from '@mui/material';
import React, { FC } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { teal } from '@mui/material/colors';
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
            disableRipple
            disableTouchRipple
            disableFocusRipple
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
    background: teal[500],
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    '.MuiSvgIcon-root': {
        color: theme.palette.secondary.main,
        transition: 'inherit'
    },
    '&:hover,&:focus': {
        boxShadow: `0 ${theme.spacing(0.25)} ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.55)}`,
        '.MuiSvgIcon-root': {
            color: theme.palette.secondary.main
        },
    },
    [theme.breakpoints.down('sm')]: {
        boxShadow: `0 ${theme.spacing(0.25)} ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.4)}`,
    }
};

const toggleStyle = {
    '.MuiIconButton-root': {
        '.MuiSvgIcon-root': {
            transform: 'rotate(45deg)',
            color: theme.palette.secondary.main
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.MuiIconButton-root': {
            boxShadow: `0 ${theme.spacing(0.25)} ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.55)}`,
        }
    }
};
