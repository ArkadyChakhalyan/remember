import { MenuItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TTaskActionProps } from './types';

export const TaskAction: FC<TTaskActionProps> = ({
    label,
    onClick
}) => (
    <MenuItem
        sx={style}
        onClick={onClick}
        disableRipple
        disableTouchRipple
    >
        <Typography color={'secondary'}>
            {label}
        </Typography>
    </MenuItem>
);

const style = {
    px: 3
};