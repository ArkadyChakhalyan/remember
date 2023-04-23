import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
export const MENU_BAR_OPTIONS = [
    {
        label: 'Dashboard',
        icon: <DashboardRoundedIcon />,
        link: '/dashboard',
    },
    {
        label: 'Calendar',
        icon: <DateRangeRoundedIcon />,
        link: '/calendar'
    },
    {
        label: 'About',
        icon: <InfoRoundedIcon />,
        link: '/about'
    },
    {
        label: 'Settings',
        icon: <SettingsRoundedIcon />,
        link: '/settings'
    },
];