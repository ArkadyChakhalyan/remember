import { alpha, Divider, IconButton, Menu } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { TTaskActionsProps } from './types';
import { useDispatch } from 'react-redux';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { theme } from '../../../style/theme';
import {
    TASK_ACTIONS_DATE_ADD,
    TASK_ACTIONS_DATE_CHANGE,
    TASK_ACTIONS_DELETE, TASK_ACTIONS_DUPLICATE,
    TASK_ACTIONS_PRIORITY_ADD,
    TASK_ACTIONS_PRIORITY_CHANGE
} from './constants';
import { TaskAction } from './taskAction/taskAction';
import { addTaskAC, deleteTaskAC } from '../../../store/reducers/tasksReducer/tasksReducer';
import { v4 as uuid } from 'uuid';

export const TaskActions: FC<TTaskActionsProps> = ({
    task,
    onDateChange,
    onDelete: onDeleteOwn,
    onPriorityChange
}) => {
    const {
        id,
        date,
        priority
    } = task;

    const isNew = !id;

    const dispatch = useDispatch();

    const [anchor, setAnchor] = useState(null);

    const onOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setAnchor(null);
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

    return <>
        <Menu
            anchorEl={anchor}
            disablePortal
            onClick={onClose}
            onKeyDown={onEnter}
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
            <TaskAction
                label={date ? TASK_ACTIONS_DATE_CHANGE : TASK_ACTIONS_DATE_ADD}
                onClick={null}
            />
            <TaskAction
                label={priority ? TASK_ACTIONS_PRIORITY_CHANGE : TASK_ACTIONS_PRIORITY_ADD}
                onClick={null}
            />
            <Divider />
            <TaskAction
                label={TASK_ACTIONS_DUPLICATE}
                onClick={onDuplicate}
            />
            <Divider />
            <TaskAction
                label={TASK_ACTIONS_DELETE}
                onClick={onDelete}
            />
        </Menu>
        <IconButton
            sx={{ ...actionsStyle, ...(anchor ? openStyle : null) }}
            color={'secondary'}
            onClick={onOpen}
        >
            <MoreVertRoundedIcon />
        </IconButton>
    </>;
};

const actionsStyle = {
    color: alpha(theme.palette.secondary.main, 0.6),
    transition: theme.transitions.create(['color', 'opacity']),
    '&:hover, &:focus': {
        color: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('sm')]: {
        opacity: 0,
        pointerEvents: 'none'
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