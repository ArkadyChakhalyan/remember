import React from 'react';
import { MenuBar } from '../components/menuBar/menuBar';
import { alpha, Stack } from '@mui/material';
import { theme } from '../style/theme';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import { BaseLayout } from '../pages/pageLayout/baseLayout';
import { AdditionalLayout } from '../pages/pageLayout/additionalLayout';

export const App = () => {
    return <>
        <MenuBar />
        <Stack sx={containerStyle}>
            <Routes>
                <Route path='/' element={<BaseLayout />}>
                    {/*<Route index element={<DashboardTasks />} />*/}
                    <Route path={'dashboard'} element={<Dashboard />} />
                    <Route path={'tasks'} element={<Dashboard />} />
                    <Route path={'calendar'} element={<Dashboard />} />
                </Route>
                <Route path='/' element={<AdditionalLayout />}>
                    <Route path={'settings'} element={<Dashboard />} />
                </Route>
            </Routes>
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
