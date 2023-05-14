import { Stack } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../style/theme';
import { AddTaskButton } from '../../addTaskButton/addTaskButton';
import { TMenuBarAddProps } from './types';

export const MenuBarAdd: FC<TMenuBarAddProps> = ({
    open,
    onToggle
}) => {
    return <Stack sx={containerStyle}>
        <AddTaskButton
            open={open}
            onClick={onToggle}
        />
    </Stack>;
};

const containerStyle = {
    display: 'none',
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -50%)',
    p: 1.5,
    background: theme.palette.secondary.main,
    borderRadius: '50%',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: theme.spacing(-3.75),
        top: theme.spacing(1.5),
        height: theme.spacing(4),
        width: theme.spacing(4),
        borderBottomRightRadius: '50%',
        boxShadow: `0 ${theme.spacing(2.5)} 0 0 ${theme.palette.secondary.main}`
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        right: theme.spacing(-3.75),
        top: theme.spacing(1.5),
        height: theme.spacing(4),
        width: theme.spacing(4),
        borderBottomLeftRadius: '50%',
        boxShadow: `0 ${theme.spacing(2.5)} 0 0 ${theme.palette.secondary.main}`
    },
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
};