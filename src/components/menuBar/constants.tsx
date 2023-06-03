import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import { ROUTE_CALENDAR, ROUTE_DASHBOARD, ROUTE_SETTINGS, ROUTE_TASKS } from '../../app/constants';

export const MENU_BAR_OPTIONS = [
    {
        label: 'Dashboard',
        icon: <DashboardRoundedIcon />,
        link: ROUTE_DASHBOARD,
    },
    {
        label: 'Task list',
        icon: <ChecklistRoundedIcon />,
        link: ROUTE_TASKS
    },
    {
        label: 'Calendar',
        icon: <EventNoteRoundedIcon />,
        link: ROUTE_CALENDAR
    },
    {
        label: 'Settings',
        icon: <SettingsRoundedIcon />,
        link: ROUTE_SETTINGS
    },
];

export const MENU_BAR_LOGOUT_LABEL = 'Logout';
