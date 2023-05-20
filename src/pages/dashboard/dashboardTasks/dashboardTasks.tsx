import { useSelector } from 'react-redux';
import { getTasks } from '../../../store/reducers/tasksReducer/selectors/getTasks';
import { TaskList } from '../../../components/taskList/taskList';
import { alpha, Stack, Tab, Tabs } from '@mui/material';
import { theme } from '../../../style/theme';
import React, { useEffect, useState } from 'react';
import { DASHBOARDS_TASK_LIST_TAB } from './contants';

export const DashboardTasks = () => {
    const tasks = useSelector(getTasks);

    const [tab, setTab] = useState(DASHBOARDS_TASK_LIST_TAB[1]);

    useEffect(() => {
        const onResize = () => {
            if (tab.hideAt && window.innerWidth <= tab.hideAt) {
                setTab(DASHBOARDS_TASK_LIST_TAB[1]);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [tab]);

    return <Stack sx={containerStyle} spacing={2}>
        <Tabs
            value={tab}
            onChange={(e, tab) => setTab(tab)}
            sx={tabsStyle}
        >
            {
                DASHBOARDS_TASK_LIST_TAB.map(tab => (
                    <Tab
                        key={tab.label}
                        sx={{
                            ...tabStyle,
                            ...(tab.hideAt ? {
                                [theme.breakpoints.down(tab.hideAt)]: {
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
        <TaskList tasks={tab.sort ? tab.sort(tasks) : tasks} tab={tab.label} />
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
    ':before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: `0 0 ${theme.spacing(1.75)} ${theme.spacing(2.5)} ${alpha(theme.palette.background.default, 0.8)}`,

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

const tabsStyle = {
    position: 'sticky',
    top: 0,
    pt: 1.75,
    borderBottom: 1,
    borderColor: 'divider',
    background: theme.palette.background.default,
    boxShadow: `0 0 ${theme.spacing(1.75)} ${theme.spacing(2.5)} ${alpha(theme.palette.background.default, 0.8)}`,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
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