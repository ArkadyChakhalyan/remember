import { alpha, AppBar, Badge, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { TOP_BAR_WELCOME, TOP_BAR_NOTIFICATION_TOOLTIP, TOP_BAR_WELCOME_TEXT } from './constants';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import React from 'react';
import { TopBarSearch } from './topBarSearch/topBarSearch';
import { theme } from '../../style/theme';
import { TopBarAccount } from './topBarAccount/topBarAccount';

export const TopBar = () => {
    return <AppBar sx={containerStyle} elevation={0}>
        <Stack spacing={0.25} sx={titleStyle}>
            <Typography variant={'h5'} color={'secondary'}>{TOP_BAR_WELCOME}</Typography>
            <Typography variant={'body2'} color={alpha(theme.palette.secondary.main, 0.6)}>
                {TOP_BAR_WELCOME_TEXT}
            </Typography>
        </Stack>
        <TopBarSearch />
        <Stack
            direction={'row'}
            alignItems={'center'}
            sx={actionsStyle}
        >
            <Tooltip
                title={TOP_BAR_NOTIFICATION_TOOLTIP}
                PopperProps={{ sx: { pt: 2.5 } }}
                enterDelay={200}
                enterNextDelay={200}
            >
                <IconButton
                    size={'large'}
                    color={'secondary'}
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                    sx={notificationsStyle}
                >
                    <Badge
                        variant={'dot'}
                        color={'error'}
                        invisible={false}
                        overlap={'circular'}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <NotificationsRoundedIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <TopBarAccount />
        </Stack>
    </AppBar>
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.spacing(12),
    position: 'sticky',
    px: 4,
    zIndex: theme.zIndex.mobileStepper, // to go under popover
    '&:before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: theme.spacing(4),
        width: `calc(100% - ${theme.spacing(8)})`,
        height: theme.spacing(0.25),
        bgcolor: alpha(theme.palette.secondary.main, 0.05),
        borderRadius: theme.shape.borderRadius
    },
    [theme.breakpoints.down('md')]: {
        gap: 2,
    },
    [theme.breakpoints.down('sm')]: {
        '&:before': {
            display: 'none'
        }
    },
    [theme.breakpoints.down('xs')]: {
        height: theme.spacing(11),
        px: 1.5,
        '&:before': {
            left: theme.spacing(1.5),
            width: `calc(100% - ${theme.spacing(3)})`,
        }
    }
};

const notificationsStyle = {
    color: alpha(theme.palette.secondary.main, 0.6),
    '&:hover, &:focus': {
        color: theme.palette.secondary.main,
        transition: theme.transitions.create('color')
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
};

const titleStyle = {
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
};

const actionsStyle = {
    gap: 2,
    [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        left: theme.spacing(5.25),
        gap: 0.5
    },
    [theme.breakpoints.down('xs')]: {
        left: theme.spacing(2.75),
    }
};