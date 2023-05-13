import { alpha, Stack } from '@mui/material';
import { Logo } from '../logo/logo';
import { MENU_BAR_LOGOUT_LABEL, MENU_BAR_OPTIONS } from './constants';
import { useLocation } from 'react-router-dom';
import { MenuBarItem } from './menuBarItem/menuBarItem';
import { theme } from '../../style/theme';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { AddButton } from './addButton/addButton';

export const MenuBar = () => {
    const location = useLocation();

    return <Stack sx={containerStyle}>
        <Logo />
        <Stack sx={contentStyle}>
            <Stack sx={menuStyle}>
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
            <AddButton />
            <MenuBarItem
                icon={<LogoutRoundedIcon />}
                label={MENU_BAR_LOGOUT_LABEL}
                onClick={null}
            />
        </Stack>
    </Stack>;
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