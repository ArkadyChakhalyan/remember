import { useSelector } from 'react-redux';
import { getTasks } from '../../../store/reducers/tasksReducer/selectors/getTasks';
import { TaskList } from '../../../components/taskList/taskList';
import { alpha, Breakpoint, Stack, Tab, Tabs } from '@mui/material';
import { theme } from '../../../style/theme';
import React, { useEffect, useState } from 'react';
import { DASHBOARDS_TASK_LIST_TAB } from './contants';

export const DashboardTasks = () => {
    const tasks = useSelector(getTasks);

    const [tab, setTab] = useState(DASHBOARDS_TASK_LIST_TAB[0]);

    useEffect(() => {
        const onResize = () => {
            if (tab.hideAt && window.innerWidth <= theme.breakpoints.values[tab.hideAt as Breakpoint]) {
                setTab(DASHBOARDS_TASK_LIST_TAB[0]);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [tab]);

    return <Stack sx={containerStyle} spacing={2}>
        <Tabs
            value={tab}
            onChange={(e, tab) => setTab(tab)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
            {
                DASHBOARDS_TASK_LIST_TAB.map(tab => (
                    <Tab
                        key={tab.label}
                        sx={{
                            ...tabStyle,
                            ...(tab.hideAt ? {
                                [theme.breakpoints.down(tab.hideAt as Breakpoint)]: {
                                    display: 'none'
                                }
                            } : null)
                        }}
                        label={tab.label}
                        value={tab}
                    />
                ))
            }
        </Tabs>
        <TaskList tasks={tab.sort ? tab.sort(tasks) : tasks} />
    </Stack>;
}

const containerStyle = {
    height: '50%',
    width: '60%',
    p: 3,
    pt: 2,
    overflow: 'hidden',
    bgcolor: alpha(theme.palette.primary.light, 0.2),
    borderRadius: theme.shape.borderRadius * 4,
    '.MuiTabs-indicator': {
        background: theme.palette.secondary.main
    },
    [theme.breakpoints.down('md')]: {
        width: 'unset',
        height: '60%',
    },
    [theme.breakpoints.down('sm')]: {
        p: 2,
        pt: 0.75
    },
    [theme.breakpoints.down('xs')]: {
        pt: 0.5
    }
};

const tabStyle = {
    minWidth: 'fit-content',
    '&.Mui-selected': {
        color: theme.palette.secondary.main
    },
};