import { TopBar } from '../../components/topBar/topBar';
import { AddTask } from '../../components/addTask/addTask';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { theme } from '../../style/theme';
import { Stack } from '@mui/material';

export const BaseLayout = () => {
    return <>
        <TopBar />
        <Stack sx={containerStyle}>
            <Outlet></Outlet>
        </Stack>
        <AddTask />
    </>;
}

const containerStyle = {
    flexGrow: 1,
    p: 4,
    pt: 3.5,
    [theme.breakpoints.down('sm')]: {
        pt: 0,
    },
    [theme.breakpoints.down('xs')]: {
        p: 2,
    }
}