import { useDispatch, useSelector } from 'react-redux';
import { TaskList } from '../../../components/taskList/taskList';
import { alpha, IconButton, Stack, Tab, Tabs } from '@mui/material';
import { theme } from '../../../style/theme';
import React, { useEffect } from 'react';
import { DASHBOARDS_TASK_LIST_TAB } from './contants';
import { getDashboardTaskListTab } from '../../../store/reducers/dashboardReducer/selectors/getDashboardTaskListTab';
import { changeTaskListTabAC, setUnseenTaskDateAC } from '../../../store/reducers/dashboardReducer/dashboardReducer';
import { ETaskListTab } from '../../../types/types';
import {
    getDashboardUnseenTaskDate
} from '../../../store/reducers/dashboardReducer/selectors/getDashboardUnseenTaskDate';
import { getTaskDateByTab } from '../../../helpers/getTaskDateByTab';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

export const DashboardTasks = () => {
    const dispatch = useDispatch();

    const tab = useSelector(getDashboardTaskListTab);
    const unseenTaskDate = useSelector(getDashboardUnseenTaskDate);

    useEffect(() => {
        if (!unseenTaskDate) return;
        if (tab === ETaskListTab.ALL || unseenTaskDate <= getTaskDateByTab(tab)) {
            dispatch(setUnseenTaskDateAC(null));
        }
    }, [tab]);

    return <Stack sx={containerStyle} spacing={2}>
        <Stack sx={headerStyle}>
            <Tabs
                value={tab}
                onChange={(e, tab) => dispatch(changeTaskListTabAC(tab))}
                sx={tabsStyle}
                variant={'scrollable'}
                scrollButtons={false}
            >
                {
                    DASHBOARDS_TASK_LIST_TAB.map(tab => (
                        <Tab
                            key={tab}
                            sx={{
                                ...tabStyle,
                                ...(
                                    unseenTaskDate && (
                                        tab === ETaskListTab.ALL ||
                                        unseenTaskDate <= getTaskDateByTab(tab)
                                    ) ? unseenStyle : null
                                )
                            }}
                            label={tab}
                            value={tab}
                        />
                    ))
                }
            </Tabs>
            <IconButton
                sx={buttonStyle}
                color={'secondary'}
            >
                <TuneRoundedIcon />
            </IconButton>
        </Stack>
        <TaskList />
    </Stack>;
}

const containerStyle = {
    position: 'relative',
    height: '50%',
    width: '60%',
    p: 3,
    pt: 0,
    overflow: 'auto',
    bgcolor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius * 4,
    '.MuiTabs-indicator': {
        background: theme.palette.secondary.main
    },
    ':after': {
        content: '""',
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        transform: `translateY(${theme.spacing(3)})`,
        boxShadow: `0 0 ${theme.spacing(1.75)} ${theme.spacing(2)} ${theme.palette.background.default}`,

    },
    [theme.breakpoints.down('md')]: {
        width: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
        height: 'unset',
        minHeight: theme.spacing(48),
        p: 2,
        pt: 0
    }
};

const headerStyle = {
    position: 'sticky',
    top: 0,
    minHeight: theme.spacing(7.75),
    pr: 3,
    overflow: 'hidden',
    zIndex: 1,
    boxShadow: `0 0 ${theme.spacing(1.75)} ${theme.spacing(2)} ${theme.palette.background.default}`,
    '&:before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        bgcolor: 'divider',
        zIndex: 2
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: theme.spacing(6.75),
    },
    [theme.breakpoints.down('xs')]: {
        minHeight: theme.spacing(6.25),
    }
};

const tabsStyle = {
    pt: 1.75,
    overflow: 'visible',
    background: theme.palette.background.default,
    boxShadow: `0 0 ${theme.spacing(1.75)} ${theme.spacing(2.5)} ${alpha(theme.palette.background.default, 0.8)}`,
    zIndex: 1,
    '.MuiTabs-flexContainer:after': {
        content: '""',
        minWidth: theme.spacing(4.5)
    },
    [theme.breakpoints.down('sm')]: {
        pt: 0.75
    },
    [theme.breakpoints.down('xs')]: {
        pt: 0.5
    }
};

const unseenStyle = {
    '&:before': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: theme.spacing(1.25),
        width: theme.spacing(),
        height: theme.spacing(),
        background: theme.palette.success.main,
        borderRadius: '50%'
    }
}

const tabStyle = {
    minWidth: 'fit-content',
    '&.Mui-selected': {
        color: theme.palette.secondary.main
    },
};

const buttonStyle = {
    position: 'absolute',
    right: theme.spacing(0.25),
    bottom: theme.spacing(0.75),
    pl: 0.5,
    zIndex: 1,
    background: theme.palette.background.default,
    boxShadow: `${theme.spacing(0.51)} 0 ${theme.spacing(1.75)} ${theme.spacing(2.5)} ${alpha(theme.palette.background.default, 1)}`,
    color: alpha(theme.palette.secondary.main, 0.6),
    transition: theme.transitions.create('color'),
    borderRadius: 0,
    '&:hover, &:focus': {
        color: theme.palette.secondary.main,
    },
};