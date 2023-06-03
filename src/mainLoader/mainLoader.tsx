import React, { useEffect, useState } from 'react';
import { Fade, Stack, Typography } from '@mui/material';
import { Logo } from '../components/logo/logo';
import { theme } from '../style/theme';

export const MainLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#2c2c2c');
        }, 1500);
    }, []);

    return <Fade in={loading} timeout={400} appear={false}>
        <Stack sx={containerStyle}>
            <Logo sx={iconStyle} color={'primary'} />
            <Typography sx={textStyle}>Loading...</Typography>
        </Stack>
    </Fade>;
};

const containerStyle = {
    position: 'fixed',
    height: '100svh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    background: theme.palette.success.light
};

const iconStyle = {
    width: 1,
    height: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
        height: 'unset',
        width: '70%',
    },
};

const textStyle = {
    position: 'fixed',
    bottom: theme.spacing(6),
    left: '50%',
    transform: 'translateX(-50%)',
    width: theme.spacing(8),
    fontWeight: 600,
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
};
