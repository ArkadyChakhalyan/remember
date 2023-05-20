import { alpha, Divider, IconButton, Menu, Stack, SwipeableDrawer, Typography } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { TTaskActionsProps } from './types';
import { useDispatch } from 'react-redux';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { theme } from '../../../style/theme';
import {
    TASK_ACTIONS_DATE_ADD,
    TASK_ACTIONS_DATE_CHANGE,
    TASK_ACTIONS_DELETE,
    TASK_ACTIONS_DUPLICATE,
    TASK_ACTIONS_PRIORITY_ADD,
    TASK_ACTIONS_PRIORITY_CHANGE,
    TASK_ACTIONS_SUB_TASK
} from './constants';
import { TaskAction } from './taskAction/taskAction';
import { addTaskAC, deleteTaskAC } from '../../../store/reducers/tasksReducer/tasksReducer';
import { v4 as uuid } from 'uuid';
import { TaskPriorities } from '../../taskPriorities/taskPriorities';
import { TTaskPriority } from '../../../types/types';

export const TaskActions: FC<TTaskActionsProps> = ({
    task,
    onDateChange,
    onDelete: onDeleteOwn,
    onPriorityChange
}) => {
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const {
        id,
        date,
        priority
    } = task;

    const dispatch = useDispatch();

    const [anchor, setAnchor] = useState(null);
    const [priorityEdit, setPriorityEdit] = useState(null);
    const [dateEdit, setDateEdit] = useState(null);

    const onOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setAnchor(null);
        setTimeout(() => {
            setPriorityEdit(false);
            setDateEdit(false);
        }, 300);
    };

    const onMenuItemClick = (
        action: () => void
    ) => {
        action();
        onClose();
    };

    const onPrioritySelect = (priority: TTaskPriority) => {
        onPriorityChange(priority);
        onClose();
    };

    const onDelete = () => {
        if (onDeleteOwn) {
            onDeleteOwn();
        } else {
            dispatch(deleteTaskAC(id));
        }
    };

    const onDuplicate = () => {
        dispatch(addTaskAC({
            ...task,
            createDate: Date.now(),
            id: uuid()
        }));
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClose();
        }
    };

    const actionsList = <Stack>
        {(dateEdit || priorityEdit) &&
            <Stack direction={'row'} alignItems={'center'} sx={headerStyle}>
                <IconButton
                    color={'secondary'}
                    onClick={() => setPriorityEdit(false)}
                >
                    <ChevronLeftRoundedIcon />
                </IconButton>
                <Typography color={'secondary'}>Priority</Typography>
            </Stack>
        }
        {dateEdit && <div></div>}
        {priorityEdit && <TaskPriorities onPriorityChange={onPrioritySelect} priority={priority} sx={priorityStyle} />}
        {!priorityEdit && !dateEdit &&
            <TaskAction
                label={date ? TASK_ACTIONS_DATE_CHANGE : TASK_ACTIONS_DATE_ADD}
                onClick={() => setDateEdit(true)}
            />
        }
        {!priorityEdit && !dateEdit &&
            <TaskAction
                label={priority ? TASK_ACTIONS_PRIORITY_CHANGE : TASK_ACTIONS_PRIORITY_ADD}
                onClick={() => setPriorityEdit(true)}
            />
        }
        {!priorityEdit && !dateEdit && id && <Divider />}
        {!priorityEdit && !dateEdit && id &&
            <TaskAction
                label={TASK_ACTIONS_SUB_TASK}
                onClick={() => onMenuItemClick(null)}
                onEnter={onEnter}
            />
        }
        {!priorityEdit && !dateEdit && id &&
            <TaskAction
                label={TASK_ACTIONS_DUPLICATE}
                onClick={() => onMenuItemClick(onDuplicate)}
                onEnter={onEnter}
            />
        }
        {!priorityEdit &&  !dateEdit && <Divider />}
        {!priorityEdit && !dateEdit &&
            <TaskAction
                label={TASK_ACTIONS_DELETE}
                onClick={() => onMenuItemClick(onDelete)}
                onEnter={onEnter}
            />
        }
    </Stack>;

    const menu = window.innerWidth >= 600 ?
        <Menu
            anchorEl={anchor}
            disablePortal
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={!!anchor}
            onClose={onClose}
            disableAutoFocusItem
            PaperProps={{ sx: menuStyle }}
        >
            {actionsList}
        </Menu>
        : <SwipeableDrawer
            anchor={'bottom'}
            open={!!anchor}
            onClose={onClose}
            onOpen={null}
            PaperProps={{ sx: drawerStyle }}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
        >
            {actionsList}
        </SwipeableDrawer>;

    return <>
        {menu}
        <IconButton
            sx={{ ...buttonStyle, ...(anchor ? openStyle : null) }}
            color={'secondary'}
            onClick={onOpen}
        >
            <MoreVertRoundedIcon />
        </IconButton>
    </>;
};

const buttonStyle = {
    color: alpha(theme.palette.secondary.main, 0.6),
    transition: theme.transitions.create(['color', 'opacity']),
    transform: 'rotate(90deg)',
    '&:hover, &:focus': {
        color: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('sm')]: {
        opacity: 0,
        pointerEvents: 'none',
        transform: 'rotate(0)'
    }
};

const openStyle = {
    opacity: '1 !important',
    pointerEvents: 'all !important',
    color: theme.palette.secondary.main,
};

const menuStyle = {
    mt: 0.5,
    ml: -1.5,
    borderRadius: theme.shape.borderRadius * 3,
    bgcolor: theme.palette.primary.light,
};

const drawerStyle = {
    background: theme.palette.primary.main
};

const priorityStyle = {
    p: 1.5,
    maxWidth: theme.spacing(40),
    [theme.breakpoints.down('sm')]: {
        p: 4
    },
    [theme.breakpoints.down('xs')]: {
        px: 2,
        maxWidth: 'unset'
    }
};

const headerStyle = {
    p: 0,
    pt: 0.5,
    [theme.breakpoints.down('sm')]: {
        p: 2,
        pb: 0,
    },
    [theme.breakpoints.down('xs')]: {
        px: 1
    }
};