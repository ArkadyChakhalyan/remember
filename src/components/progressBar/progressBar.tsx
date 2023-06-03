import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TProgressBarProps } from './types';
import { theme } from '../../style/theme';

export const ProgressBar: FC<TProgressBarProps> = ({
    label,
    value
}) => {
    return (
        <Stack sx={containerStyle}>
            <CircularProgress
                variant={'determinate'}
                value={100}
                sx={progressBgStyle}
                thickness={6}
                size={theme.spacing(3.5)}
            />
            <CircularProgress
                variant={'determinate'}
                value={value}
                sx={progressStyle}
                thickness={6}
                size={theme.spacing(3.5)}
            />
            <Typography sx={labelStyle} color={'secondary'}>
                {label}
            </Typography>
        </Stack>
    );
}

const containerStyle = {
    position: 'relative',
    display: 'inline-flex',
    'circle': {
        strokeLinecap: 'round'
    }
};

const labelStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.55rem'
};

const progressStyle = {
    color: theme.palette.success.main
};

const progressBgStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    color: theme.palette.primary.light
};