import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';

export const MENU_BAR_OPTIONS = [
    {
        label: 'Dashboard',
        icon: <DashboardRoundedIcon />,
        link: '/dashboard',
    },
    {
        label: 'Tasks',
        icon: <ChecklistRoundedIcon />,
        link: '/tasks'
    },
    {
        label: 'Calendar',
        icon: <EventNoteRoundedIcon />,
        link: '/calendar'
    },
    {
        label: 'Settings',
        icon: <SettingsRoundedIcon />,
        link: '/settings'
    },
];

export const MENU_BAR_LOGOUT_LABEL = 'Logout';
