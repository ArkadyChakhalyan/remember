import { alpha, IconButton } from '@mui/material';
import React, { FC } from 'react';
import { TTaskPriorityProps } from './types';
import { theme } from '../../../style/theme';
import { PRIORITY_COLORS } from '../../../app/constants';

export const TaskPriority: FC<TTaskPriorityProps> = ({
    priority,
    selected,
    onSelect
}) => {
    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSelect(e);
        }
    };

    return <IconButton
        onClick={onSelect}
        onKeyDown={onEnter}
        sx={{
            ...style,
            ...(selected ? selectedStyle : null),
            bgcolor: PRIORITY_COLORS[priority]
        }}
    />;
};

const style = {
    height: theme.spacing(5),
    width: theme.spacing(5),
    borderRadius: theme.shape.borderRadius * 3,
    cursor: 'pointer',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: theme.spacing(-0.75),
        bottom: theme.spacing(-0.75),
        left: theme.spacing(-0.75),
        right: theme.spacing(-0.75),
        borderRadius: theme.shape.borderRadius * 4,
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        border: `${theme.spacing(0.25)} solid transparent`,
    },
    '&:focus': {
        '&:before': {
            borderColor: alpha(theme.palette.success.main, 0.3),
        }
    }
};

const selectedStyle = {
    '&:before': {
        ...style['&:before'],
        borderColor: `${theme.palette.success.main} !important`,
    }
};