import { alpha, ClickAwayListener, Stack } from '@mui/material';
import { Logo } from '../logo/logo';
import { MENU_BAR_LOGOUT_LABEL, MENU_BAR_OPTIONS } from './constants';
import { useLocation } from 'react-router-dom';
import { MenuBarItem } from './menuBarItem/menuBarItem';
import { theme } from '../../style/theme';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { MenuBarAdd } from './menuBarAdd/menuBarAdd';
import { useEffect, useState } from 'react';
import { NewTask } from '../newTask/newTask';

export const MenuBar = () => {
    const location = useLocation();

    const [open, setOpen] = useState(null);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 600) { // breakpoint SM
                setOpen(false);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Stack sx={{ ...containerStyle, ...(open ? cardStyle : null) }}>
            <Logo />
            <Stack sx={contentStyle}>
                <Stack sx={{ ...menuStyle, ...(open ? hiddenStyle : null) }}>
                    {
                        MENU_BAR_OPTIONS.map(item => (
                            <MenuBarItem
                                key={item.link}
                                active={location.pathname.includes((item.link))}
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
    position: 'fixed',
    top: 0,
    left: 0,
    width: theme.spacing(28),
    height: `calc(100% - ${theme.spacing(10)})`,
    px: 4,
    py: 5,
    gap: theme.spacing(4),
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
        boxShadow: `0 0 ${theme.spacing(3)} ${alpha(theme.palette.common.black, 0.3)}`,
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        '& > div:first-of-type': {
            display: 'none'
        },
        'a': {
            width: 'fit-content !important',
        }
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

const menuStyle = {
    gap: theme.spacing(1),
    width: 1,
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 0,
        'a:nth-of-type(3)': {
            marginLeft: '25%'
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
        height: theme.spacing(48),
    },
    [theme.breakpoints.down('xs')]: {
        ...containerStyle[theme.breakpoints.down('xs')] as object,
        height: theme.spacing(48),
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
    zIndex: 1

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