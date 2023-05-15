import { MenuItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TTaskActionProps } from './types';

export const TaskAction: FC<TTaskActionProps> = ({
    label,
    onClick
}) => (
    <MenuItem onClick={onClick}>
        <Typography color={'secondary'}>
            {label}
        </Typography>
    </MenuItem>
);