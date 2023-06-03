import { useDispatch, useSelector } from 'react-redux';
import { TaskList } from '../../../components/taskList/taskList';
import { alpha, IconButton, Stack, Tab, Tabs } from '@mui/material';
import { theme } from '../../../style/theme';
import React, { useEffect, useRef } from 'react';
import { DASHBOARDS_TASK_LIST_TAB } from './contants';
import { getDashboardTaskListTab } from '../../../store/reducers/dashboardReducer/selectors/getDashboardTaskListTab';
import { changeTaskListTabAC, setUnseenTaskDateAC } from '../../../store/reducers/dashboardReducer/dashboardReducer';
import { ETaskListTab } from '../../../types/types';
import {
    getDashboardUnseenTaskDate
} from '../../../store/reducers/dashboardReducer/selectors/getDashboardUnseenTaskDate';
import { getTaskDateByTab } from '../../../helpers/getTaskDateByTab';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { ProgressBar } from '../../../components/progressBar/progressBar';
import { getTasks } from '../../../store/reducers/tasksReducer/selectors/getTasks';
import { getSortedTasks } from '../../../store/selectors/getSortedTasks';

export const DashboardTasks = () => {
    const dispatch = useDispatch();

    const tab = useSelector(getDashboardTaskListTab);
    const unseenTaskDate = useSelector(getDashboardUnseenTaskDate);
    const tasks = useSelector(getTasks);

    const tabsRef = useRef(null);

    const onChange = (
        e: React.SyntheticEvent,
        tab: ETaskListTab
    ) => {
        if (tab === DASHBOARDS_TASK_LIST_TAB.at(-1)) {
            tabsRef.current.querySelector('.MuiTabs-scroller').scrollLeft = 10000;
        }
        dispatch(changeTaskListTabAC(tab));
    };

    useEffect(() => {
        if (!unseenTaskDate) return;
        if (tab === ETaskListTab.ALL || unseenTaskDate <= getTaskDateByTab(tab)) {
            dispatch(setUnseenTaskDateAC(null));
        }
    }, [tab]);

    const sortedTasks = getSortedTasks(tab, tasks);
    const tasksCount = sortedTasks.length ? sortedTasks.length > 99 ? '99+' : String(sortedTasks.length) : null;
    const doneTasksCount = sortedTasks.filter(task => task.doneDate).length / sortedTasks.length * 100;

    return <Stack sx={containerStyle} spacing={2}>
        <Stack sx={headerStyle}>
            <Tabs
                ref={tabsRef}
                value={tab}
                onChange={onChange}
                sx={tabsStyle}
                variant={'scrollable'}
                scrollButtons={false}
            >
                {
                    DASHBOARDS_TASK_LIST_TAB.map(item => (
                        <Tab
                            key={item}
                            sx={{
                                ...tabStyle,
                                ...(
                                    unseenTaskDate && (
                                        item === ETaskListTab.ALL ||
                                        unseenTaskDate <= getTaskDateByTab(item)
                                    ) ? unseenStyle : null
                                ),
                                ...(item === tab && tasksCount ? withCounterStyle : null),
                                ...(item === ETaskListTab.OVERDUE ? overdueStyle : null)
                            }}
                            label={item}
                            icon={item === tab && tasksCount ? <ProgressBar label={tasksCount} value={doneTasksCount} /> : null}
                            iconPosition={'end'}
                            value={item}
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

const withCounterStyle = {
    pr: 1
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
    display: 'flex',
    gap: 1.25,
    alignItems: 'center',
    minWidth: 'fit-content',
    minHeight: 'unset',
    height: theme.spacing(5.25),
    '&.Mui-selected': {
        color: theme.palette.secondary.main
    },
};

const overdueStyle = {
    color: theme.palette.error.main,
    '&.Mui-selected': {
        color: theme.palette.error.main
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