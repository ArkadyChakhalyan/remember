import { Stack } from '@mui/material';
import { Logo } from '../logo/logo';
import { MENU_BAR_LOGOUT_LABEL, MENU_BAR_OPTIONS } from './constants';
import { useLocation } from 'react-router-dom';
import { MenuBarItem } from './menuBarItem/menuBarItem';
import { theme } from '../../style/theme';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

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
        bottom: 0,
        width: `calc(100% - ${theme.spacing(12)})`,
        height: theme.spacing(8),
        gap: 0,
        px: 6,
        py: 0,
        '& > div:first-child': {
            display: 'none'
        },
    },
    [theme.breakpoints.down('xs')]: {
        width: `calc(100% - ${theme.spacing(8)})`,
        px: 4
    }
};

const menuStyle = {
    gap: theme.spacing(1),
    width: 1,
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 0,
        'a:nth-child(3)': {
            marginLeft: 5
        }
    },
    [theme.breakpoints.down('xs')]: {
        'a:nth-child(3)': {
            marginLeft: 4
        }
    }
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