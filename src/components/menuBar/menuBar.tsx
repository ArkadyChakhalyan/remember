import { alpha, ClickAwayListener, Stack } from '@mui/material';
import { MENU_BAR_LOGOUT_LABEL, MENU_BAR_OPTIONS } from './constants';
import { useLocation } from 'react-router-dom';
import { MenuBarItem } from './menuBarItem/menuBarItem';
import { theme } from '../../style/theme';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { MenuBarAdd } from './menuBarAdd/menuBarAdd';
import React, { CSSProperties, useEffect, useState } from 'react';
import { NewTask } from '../newTask/newTask';
import { Logo } from '../logo/logo';
import { LogoIcon } from '../logo/logoIcon';

export const MenuBar = () => {
    const location = useLocation();

    const [open, setOpen] = useState(null);
    const [test, setTest] = useState(0);

    useEffect(() => {
        const onResize = () => {
            setOpen(window.innerWidth >= 600); // breakpoint SM
        };

        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Stack sx={{ ...containerStyle, ...(open ? cardStyle : null) }}>
            <Logo sx={logoStyle} color={'primary'}  />
            <LogoIcon sx={logoIconStyle} color={'primary'} />
            <Stack sx={contentStyle}>
                <Stack sx={{ ...menuStyle as CSSProperties, ...(open ? hiddenStyle : null) }}>
                    {
                        MENU_BAR_OPTIONS.map(item => (
                            <MenuBarItem
                                key={item.link}
                                active={location.pathname.includes(('/' + item.link))}
                                icon={item.icon}
                                label={item.label}
                                link={item.link}
                            />
                        ))
                    }
                </Stack>
                <Stack sx={{ ...addStyle, ...(open ? showStyle : null) }}>
                    {open && <NewTask onClose={() => setOpen(false)} />}
                </Stack>
                <MenuBarAdd open={open} onToggle={() => setOpen(!open)} />
                <MenuBarItem
                    icon={<LogoutRoundedIcon />}
                    label={MENU_BAR_LOGOUT_LABEL}
                    onClick={null}
                />
            </Stack>
        </Stack>
    </ClickAwayListener>;
};

const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: theme.spacing(28),
    height: `calc(100% - ${theme.spacing(10)})`,
    px: 4,
    py: 5,
    gap: theme.spacing(4),
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down('lg')]: {
        width: theme.spacing(8),
        px: 1.5,
    },
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        top: 'unset',
        bottom: theme.spacing(3),
        left: theme.spacing(4),
        right: theme.spacing(4),
        width: `calc(100% - ${theme.spacing(5 + 8)})`,
        height: theme.spacing(10),
        gap: 0,
        px: 2.5,
        py: 0,
        background: theme.palette.secondary.main,
        borderRadius: theme.shape.borderRadius * 7,
        boxShadow: `0 ${theme.spacing(4)} ${theme.spacing(3)} ${theme.spacing(8)} ${alpha(theme.palette.primary.main, 0.8)}`,
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        'a': {
            width: 'fit-content !important',
        },
    },
    [theme.breakpoints.down('xs')]: {
        left: theme.spacing(1.5),
        right: theme.spacing(1.5),
        bottom: theme.spacing(2),
        width: `calc(100% - ${theme.spacing(6)})`,
        height: theme.spacing(8.5),
        px: 1.5,
        borderRadius: theme.shape.borderRadius * 5,
    }
};

const logoStyle = {
    width: 1,
    height: theme.spacing(6),
    [theme.breakpoints.down('lg')]: {
        display: 'none'
    }
};

const logoIconStyle = {
    width: 1,
    height: theme.spacing(6),
    display: 'none',
    [theme.breakpoints.between('sm', 'lg')]: {
        display: 'unset'
    }
};

const menuStyle = {
    gap: theme.spacing(1),
    width: 1,
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 1,
    pointerEvents: 'none',
    [theme.breakpoints.down('lg')]: {
        flexGrow: 1,
        justifyContent: 'center',
        gap: theme.spacing(2.5)
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 0,
        'a:nth-of-type(3)': {
            marginLeft: '21%'
        }
    },
};

const contentStyle = {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 1,
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        '& > .MuiButton-text:last-child': {
            display: 'none'
        }
    }
};

const cardStyle = {
    [theme.breakpoints.down('sm')]: {
        ...containerStyle[theme.breakpoints.down('sm')] as object,
        height: '45%',
    },
    [theme.breakpoints.down('xs')]: {
        ...containerStyle[theme.breakpoints.down('xs')] as object,
        height: '45%',
    }
};

const hiddenStyle = {
    [theme.breakpoints.down('sm')]: {
        ...menuStyle[theme.breakpoints.down('sm')] as Object,
        opacity: 0,
        pointerEvents: 'none'
    }
};

const addStyle = {
    width: 1,
    opacity: 0,
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
    pointerEvents: 'none',
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
};

const showStyle = {
    [theme.breakpoints.down('sm')]: {
        height: 1,
        pb: 2.5,
        mt: -1.5,
        opacity: 1,
        pointerEvents: 'all'
    },
    [theme.breakpoints.down('xs')]: {
        pb: 1.5,
    }
};