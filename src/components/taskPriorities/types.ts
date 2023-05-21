import { TTaskPriority } from '../../types/types';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles/createTheme';
import React from 'react';

export type TTaskPrioritiesProps = {
    priority: TTaskPriority;
    sx?: SxProps<Theme>;
    onPriorityChange: (e: React.KeyboardEvent | React.MouseEvent, priority: TTaskPriority) => void;
}