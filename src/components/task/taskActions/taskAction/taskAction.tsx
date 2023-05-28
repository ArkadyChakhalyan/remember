import { MenuItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TTaskActionProps } from './types';
import { theme } from '../../../../style/theme';

export const TaskAction: FC<TTaskActionProps> = ({
    color,
    icon,
    label,
    selected,
    onClick,
    onEnter
}) => (
    <MenuItem
        onClick={onClick}
        onKeyDown={onEnter}
        selected={selected}
        sx={{
            ...containerStyle,
            '.MuiSvgIcon-root': {
                width: theme.spacing(2.5),
                height: theme.spacing(2.5),
                color: color ? color : theme.palette.secondary.main
            },
        }}
    >
        <Typography color={color ? color : 'secondary'} variant={'body2'} sx={textStyle}>
            {label}
        </Typography>
        {icon}
    </MenuItem>
);

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(4),
    px: 1.25,
    '&.Mui-selected': {
        '.MuiTypography-root': {
            color: theme.palette.success.main,
            fontWeight: 600
        }
    },
};

const textStyle = {
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.95rem'
    },
};