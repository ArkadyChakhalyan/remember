import { alpha, Divider, IconButton, Menu } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { TTaskActionsProps } from './types';
import { useDispatch } from 'react-redux';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { theme } from '../../../style/theme';
import {
    TASK_ACTIONS_DATE_ADD,
    TASK_ACTIONS_DATE_CHANGE,
    TASK_ACTIONS_DELETE,
    TASK_ACTIONS_PRIORITY_ADD,
    TASK_ACTIONS_PRIORITY_CHANGE
} from './constants';
import { TaskAction } from './taskAction/taskAction';
import { deleteTaskAC } from '../../../store/reducers/tasksReducer/tasksReducer';

export const TaskActions: FC<TTaskActionsProps> = ({
    task
}) => {
    const {
        id,
        date,
        priority
    } = task;

    const dispatch = useDispatch();

    const [anchor, setAnchor] = useState(null);

    const onOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setAnchor(null);
    };

    const onDelete = () => {
        dispatch(deleteTaskAC(id));
    };

    return <>
        <Menu
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={!!anchor}
            onClose={onClose}
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
    borderRadius: theme.shape.borderRadius * 2,
    bgcolor: theme.palette.primary.light,
};