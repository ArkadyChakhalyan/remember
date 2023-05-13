import { alpha, InputBase, Stack } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { TOP_BAR_SEARCH_PLACEHOLDER } from './constants';
import { theme } from '../../../style/theme';
import React from 'react';

export const TopBarSearch = () => {
    return <Stack sx={searchStyle} direction={'row'}>
        <SearchRoundedIcon sx={iconStyle} />
        <InputBase
            sx={inputStyle}
            placeholder={TOP_BAR_SEARCH_PLACEHOLDER}
            inputProps={{ 'aria-label': 'search' }}
        />
    </Stack>;
}

const searchStyle = {
    position: 'relative',
    width: '40%',
    height: theme.spacing(6),
    bgcolor: alpha(theme.palette.primary.light, 0.2),
    borderRadius: theme.shape.borderRadius * 2.5,
    '&:focus-within, &:hover': {
        '& > .MuiSvgIcon-root': {
            color: theme.palette.secondary.main,
            transition: theme.transitions.create('color')
        },
    },
    [theme.breakpoints.down('md')]: {
        width: 'unset',
        flexGrow: 1,
        bgcolor: alpha(theme.palette.primary.light, 0.6),
    },
    [theme.breakpoints.down('sm')]: {
        height: theme.spacing(7),
        borderRadius: theme.shape.borderRadius * 3.5,
    }
};

const iconStyle = {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: alpha(theme.palette.secondary.main, 0.6),
};

const inputStyle = {
    width: '100%',
    color: 'inherit',
    '& .MuiInputBase-input': {
        width: '100%',
        padding: theme.spacing(1, 1.5, 1, 5.5),
        transition: theme.transitions.create('width'),
    },
    [theme.breakpoints.down('sm')]: {
        '& .MuiInputBase-input': {
            pl: theme.spacing(7)
        }
    }
};