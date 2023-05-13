import { alpha, IconButton, Stack } from '@mui/material';
import React from 'react';
import { theme } from '../../../style/theme';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { blue, green, teal } from '@mui/material/colors';

export const AddButton = () => {
    return <Stack sx={containerStyle}>
        <IconButton
            size={'large'}
            sx={buttonStyle}
            disableRipple
            disableTouchRipple
            disableFocusRipple
        >
            <AddRoundedIcon />
        </IconButton>
    </Stack>;
};

const containerStyle = {
    display: 'none',
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translate(-50%, -50%)',
    background: theme.palette.secondary.main,
    borderRadius: '50%',
    p: 1.5,
    '&:before': {
        content: '""',
        position: 'absolute',
        left: theme.spacing(-3.75),
        top: theme.spacing(1.5),
        height: theme.spacing(4),
        width: theme.spacing(4),
        borderBottomRightRadius: '50%',
        boxShadow: `0 20px 0 0 ${theme.palette.secondary.main}`
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        right: theme.spacing(-3.75),
        top: theme.spacing(1.5),
        height: theme.spacing(4),
        width: theme.spacing(4),
        borderBottomLeftRadius: '50%',
        boxShadow: `0 20px 0 0 ${theme.palette.secondary.main}`
    },
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
};

const buttonStyle = {
    height: theme.spacing(8),
    width: theme.spacing(8),
    background: teal[500],
    boxShadow: `0 2px ${theme.spacing(0.75)} ${alpha(theme.palette.common.black, 0.4)}`,
    '.MuiSvgIcon-root': {
        color: theme.palette.secondary.main
    },
    '&:hover,&:focus,&:active': {
        boxShadow: `0 2px ${theme.spacing(1)} ${alpha(theme.palette.common.black, 0.55)}`,
    }
};