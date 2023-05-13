import React, { useState, MouseEvent } from 'react';
import { alpha, Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { theme } from '../../../style/theme';
import { TOP_BAR_ACCOUNT_SETTINGS_ACCOUNT, TOP_BAR_ACCOUNT_SETTINGS_LOGOUT, TOP_BAR_ACCOUNT_TOOLTIP } from './constants';

export const TopBarAccount = () => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const onOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setAnchor(null);
    };

    const onClick = (event: () => void) => {
        event();
        onClose();
    };

    const settings = [
        {
            title: TOP_BAR_ACCOUNT_SETTINGS_ACCOUNT,
            event: () => onClick(() => {})
        },
        {
            title: TOP_BAR_ACCOUNT_SETTINGS_LOGOUT,
            event: () => onClick(() => {})
        }
    ];

    return (
        <>
            <Tooltip
                title={TOP_BAR_ACCOUNT_TOOLTIP}
                PopperProps={{ sx: popperStyle }}
                enterDelay={200}
                enterNextDelay={200}
            >
                <IconButton
                    onClick={onOpen}
                    sx={buttonStyle}
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
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
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={!!anchor}
                onClose={onClose}
                PaperProps={{ sx: menuStyle, elevation: 3 }}
            >
                {
                    settings.map(({ title, event  }) => (
                        <MenuItem
                            key={title}
                            onClick={event}
                            sx={{ height: theme.spacing(5.5), px: 3 }}
                        >
                            <Typography color={'secondary'}>
                                {title}
                            </Typography>
                        </MenuItem>
                    ))
                }
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
        width: `calc(100% - ${theme.spacing(8)})`,
        ml: 2,
        mt: 2.5,
    },
    [theme.breakpoints.down('xs')]: {
        width: `calc(100% - ${theme.spacing(3)})`,
        ml: -0.5
    }
};

const buttonStyle = {
    height: theme.spacing(5),
    p: 0,
};

const avatarStyle = {
    borderRadius: theme.shape.borderRadius * 2,
    color: theme.palette.secondary.main,
    bgcolor: theme.palette.pastelPink.main,
    [theme.breakpoints.down('sm')]: {
        borderRadius: theme.shape.borderRadius * 2,
        height: theme.spacing(4.5),
        width: theme.spacing(4.5)
    }
};

const popperStyle = {
    pt: 2.75,
    [theme.breakpoints.down('xs')]: {
        pt: 2.25,
    }
};