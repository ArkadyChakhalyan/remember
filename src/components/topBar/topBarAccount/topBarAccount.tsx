import React, { MouseEvent, useEffect, useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { theme } from '../../../style/theme';
import {
    TOP_BAR_ACCOUNT_SETTINGS_ACCOUNT,
    TOP_BAR_ACCOUNT_SETTINGS_LOGOUT, TOP_BAR_ACCOUNT_SETTINGS_NOTIFICATIONS,
    TOP_BAR_ACCOUNT_TOOLTIP
} from './constants';
import { TopBarAccountMenuItem } from './topBarAccountMenuItem/topBarAccountMenuItem';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

export const TopBarAccount = () => {
    const [anchor, setAnchor] = useState(null);
    const [mobile, setMobile] = useState(null);

    const onOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setAnchor(null);
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClose();
        }
    };

    useEffect(() => {
        const onResize = () => {
            setMobile(window.innerWidth < 600); // breakpoint SM
        };

        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <Tooltip
                title={TOP_BAR_ACCOUNT_TOOLTIP}
                PopperProps={{ sx: popperStyle }}
                enterDelay={200}
                enterNextDelay={200}
                disableInteractive
            >
                <IconButton
                    onClick={onOpen}
                    sx={buttonStyle}
                >
                    <Avatar
                        alt={'Arkady Chakhalyan'}
                        src={'/static/images/avatar/2.jpg'}
                        variant={'square'}
                        sx={avatarStyle}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={!!anchor}
                onClose={onClose}
                onClick={onClose}
                onKeyDown={onEnter}
                PaperProps={{ sx: menuStyle }}
            >
                {mobile &&
                    <TopBarAccountMenuItem
                        label={TOP_BAR_ACCOUNT_SETTINGS_NOTIFICATIONS}
                        icon={<NotificationsRoundedIcon />}
                        onClick={null}
                    />
                }
                <TopBarAccountMenuItem
                    label={TOP_BAR_ACCOUNT_SETTINGS_ACCOUNT}
                    icon={<SettingsRoundedIcon />}
                    onClick={null}
                />
                <TopBarAccountMenuItem
                    label={TOP_BAR_ACCOUNT_SETTINGS_LOGOUT}
                    icon={<LogoutRoundedIcon />}
                    onClick={null}
                />
            </Menu>
        </>
    );
}

const menuStyle = {
    width: theme.spacing(24),
    mt: 5,
    borderRadius: theme.shape.borderRadius * 4,
    bgcolor: theme.palette.primary.light,
    [theme.breakpoints.down('sm')]: {
        maxWidth: 'unset',
        width: `calc(100% - ${theme.spacing(3)})`,
        ml: -0.5,
        mt: 2.5,
    },
};

const buttonStyle = {
    height: theme.spacing(5),
    p: 0,
    [theme.breakpoints.down('sm')]: {
        '&:before': {
            content: '""',
            position: 'absolute',
            top: theme.spacing(-1.25),
            left: theme.spacing(-0.75),
            bottom: theme.spacing(-1.25),
            right: 0
        }
    }
};

const avatarStyle = {
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 2,
    color: theme.palette.secondary.main,
    bgcolor: theme.palette.pastelPink.main,
    [theme.breakpoints.down('sm')]: {
        borderRadius: theme.shape.borderRadius * 2,
        height: theme.spacing(4.5),
        width: theme.spacing(4.5),
    }
};

const popperStyle = {
    pt: 2.75,
    [theme.breakpoints.down('xs')]: {
        pt: 2.25,
    }
};