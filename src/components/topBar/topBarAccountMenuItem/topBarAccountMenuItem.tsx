import React, { FC } from 'react';
import { MenuItem, Typography } from '@mui/material';
import { theme } from '../../../style/theme';
import { TTopBarAccountMenuItem } from './types';

export const TopBarAccountMenuItem: FC<TTopBarAccountMenuItem> = ({
    icon,
    label,
    onClick
}) => (
    <MenuItem
        onClick={onClick}
        sx={containerStyle}
    >
        <Typography color={'secondary'} variant={'body2'} sx={textStyle}>
            {label}
        </Typography>
        {icon}
    </MenuItem>
)

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(4),
    height: theme.spacing(5),
    px: 1.5,
    borderRadius: theme.shape.borderRadius * 3,
    '.MuiSvgIcon-root': {
        width: theme.spacing(2.5),
        height: theme.spacing(2.5),
        color: theme.palette.secondary.main
    },
};

const textStyle = {
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem'
    },
};
