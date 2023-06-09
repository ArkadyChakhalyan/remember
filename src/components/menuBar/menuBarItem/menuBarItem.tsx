import { alpha, Button, Stack, Tooltip } from '@mui/material';
import React, { CSSProperties, FC } from 'react';
import { TMenuBarItemProps } from './types';
import { Link } from 'react-router-dom';
import { theme } from '../../../style/theme';

export const MenuBarItem: FC<TMenuBarItemProps> = ({
    active,
    icon,
    label,
    link,
    onClick
}) => {
    const button = <Button
        size={'large'}
        startIcon={icon}
        sx={buttonStyle}
        variant={active ? 'contained' : 'text'}
        onClick={onClick}
    >
        <Stack sx={labelStyle}>{label}</Stack>
    </Button>;
    return <Tooltip
        title={label}
        placement={'right'}
        disableInteractive
        PopperProps={{ sx: popperStyle }}
        enterDelay={200}
        enterNextDelay={200}
    >
        {
            link ?
                <Link to={link} tabIndex={-1} style={linkStyle as CSSProperties}>
                    {button}
                </Link>
                : button
        }
    </Tooltip>;
};

const buttonStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    width: 1,
    height: theme.spacing(6),
    px: 2.25,
    py: 1.25,
    textTransform: 'none',
    fontWeight: 500,
    borderRadius: theme.shape.borderRadius * 3,
    transition: 'none',
    '.MuiButton-startIcon': {
        mr: 1.5,
        ml: 0
    },
    '.MuiSvgIcon-root': {
        fontSize: `${theme.spacing(3)} !important`
    },
    '&.MuiButton-contained': {
        '&:hover': {
            background: theme.palette.primary.main
        }
    },
    '&.MuiButton-text': {
        '&:focus': {
            background: alpha(theme.palette.primary.main, 0.04)
        }
    },
    [theme.breakpoints.down('lg')]: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: theme.spacing(6),
        width: theme.spacing(6),
        '.MuiButton-startIcon': {
            mr: 0
        },
    },
    [theme.breakpoints.down('sm')]: {
        '.MuiSvgIcon-root': {
            fontSize: `${theme.spacing(3.5)} !important`
        }
    }
};

const linkStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    textDecoration: 'none',
    pointerEvents: 'all'
};

const popperStyle = {
    pl: 1.5,
    display: 'none',
    [theme.breakpoints.between('sm', 'lg')]: {
        display: 'unset'
    }
};

const labelStyle = {
    [theme.breakpoints.down('lg')]: {
        display: 'none'
    }
};
