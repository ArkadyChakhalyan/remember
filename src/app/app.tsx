import React from 'react';
import { MenuBar } from '../components/menuBar/menuBar';
import { alpha, Stack } from '@mui/material';
import { theme } from '../style/theme';
import { TopBar } from '../components/topBar/topBar';

export const App = () => {
    return <>
        <MenuBar />
        <Stack sx={containerStyle}>
            <TopBar />
        </Stack>
    </>;
};

const containerStyle = {
    width: `calc(100vw - ${theme.spacing(36)})`,
    height: '100svh',
    ml: 36,
    borderTopLeftRadius: theme.shape.borderRadius * 20,
    borderBottomLeftRadius: theme.shape.borderRadius * 20,
    background: theme.palette.primary.main,
    boxShadow: `0 0 ${theme.spacing(3)} ${alpha(theme.palette.common.black, 0.3)}`,
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
        width: `calc(100vw - ${theme.spacing(11)})`,
        ml: 11
    },
    [theme.breakpoints.down('sm')]: {
        width: '100vw',
        height: '100svh',
        ml: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    }
};
