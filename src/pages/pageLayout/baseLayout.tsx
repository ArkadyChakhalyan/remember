import { TopBar } from '../../components/topBar/topBar';
import { AddTask } from '../../components/addTask/addTask';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { theme } from '../../style/theme';
import { Box, Stack } from '@mui/material';

export const BaseLayout = () => {
    return <Box sx={wrapperStyle}>
        <TopBar />
        <Stack sx={containerStyle}>
            <Outlet></Outlet>
        </Stack>
        <AddTask />
    </Box>;
}

const wrapperStyle = {
    height: 1,
    [theme.breakpoints.down('sm')]: {
        overflow: 'auto',
    },
};

const containerStyle = {
    flexGrow: 1,
    height: 1,
    p: 4,
    pt: 3.5,
    [theme.breakpoints.down('sm')]: {
        pb: theme.spacing(20),
        height: 'unset',
        px: 2,
        pt: 3
    },
    [theme.breakpoints.down('xs')]: {
        pb: theme.spacing(17.5)
    },
}