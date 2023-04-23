import { Stack, Typography } from '@mui/material';
import CurtainsRoundedIcon from '@mui/icons-material/CurtainsRounded';
import { APP_NAME } from './constants';
import { theme } from '../../style/theme';

export const Logo = () => {
    return <Stack sx={containerStyle} spacing={1.25} direction={'row'}>
        <CurtainsRoundedIcon sx={iconStyle} color={'primary'} />
        <Typography variant={'h5'} fontWeight={600} sx={textStyle}>{APP_NAME}</Typography>
    </Stack>
};

const containerStyle = {
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
        justifyContent: 'center'
    }
};

const iconStyle = {
    fontSize: theme.spacing(5)
};

const textStyle = {
    [theme.breakpoints.down('lg')]: {
        display: 'none'
    }
};