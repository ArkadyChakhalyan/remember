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
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

export const TaskActions: FC<TTaskActionsProps> = ({
    task,
    onDateChange,
    onDelete: onDeleteOwn,
    onPriorityChange
}) => {
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const { id, date, priority } = task;

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

    const onPrioritySelect = (
        e: React.KeyboardEvent | React.MouseEvent,
        priority: TTaskPriority
    ) => {
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

    const editHeader = (dateEdit || priorityEdit) && <Stack direction={'row'} alignItems={'center'} sx={headerStyle}>
        <IconButton
            sx={{ pl: 0, ml: -0.75 }}
            color={'secondary'}
            onClick={() => setPriorityEdit(false)}
        >
            <ChevronLeftRoundedIcon />
        </IconButton>
        <Typography color={'secondary'} variant={'body2'}>Priority</Typography>
    </Stack>;

    const editPriority = priorityEdit && <TaskPriorities onPriorityChange={onPrioritySelect} priority={priority} sx={priorityStyle} />;

    const editDate = dateEdit && <div />;

    const dateButton = !priorityEdit && !dateEdit &&
        <TaskAction
            label={date ? TASK_ACTIONS_DATE_CHANGE : TASK_ACTIONS_DATE_ADD}
            icon={<EventNoteRoundedIcon />}
            onClick={() => setDateEdit(true)}
        />;

    const priorityButton = !priorityEdit && !dateEdit &&
        <TaskAction
            label={priority ? TASK_ACTIONS_PRIORITY_CHANGE : TASK_ACTIONS_PRIORITY_ADD}
            onClick={() => setPriorityEdit(true)}
            icon={<ErrorOutlineRoundedIcon />}
        />;

    const subTaskButton = !priorityEdit && !dateEdit && id &&
        <TaskAction
            label={TASK_ACTIONS_SUB_TASK}
            icon={<SubdirectoryArrowRightRoundedIcon />}
            onClick={() => onMenuItemClick(null)}
            onEnter={onEnter}
        />;

    const duplicateButton = !priorityEdit && !dateEdit && id &&
        <TaskAction
            label={TASK_ACTIONS_DUPLICATE}
            icon={<ContentCopyRoundedIcon />}
            onClick={() => onMenuItemClick(onDuplicate)}
            onEnter={onEnter}
        />;

    const deleteButton = !priorityEdit && !dateEdit &&
        <TaskAction
            color={theme.palette.error.main}
            label={TASK_ACTIONS_DELETE}
            icon={<DeleteOutlineRoundedIcon />}
            onClick={() => onMenuItemClick(onDelete)}
            onEnter={onEnter}
        />;

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
            {editHeader}
            {editDate}
            {editPriority}
            {dateButton}
            {priorityButton}
            {!priorityEdit && !dateEdit && id && <Divider />}
            {subTaskButton}
            {duplicateButton}
            {!priorityEdit &&  !dateEdit && <Divider />}
            {deleteButton}
        </Menu>
        : <SwipeableDrawer
            anchor={'bottom'}
            open={!!anchor}
            onClose={onClose}
            onOpen={() => {}}
            PaperProps={{ sx: drawerStyle }}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            disablePortal
        >
            {editHeader}
            {editDate}
            {editPriority}
            {dateButton}
            {priorityButton}
            {!priorityEdit && !dateEdit && id && <Divider />}
            {subTaskButton}
            {duplicateButton}
            {!priorityEdit &&  !dateEdit && <Divider />}
            {deleteButton}
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
    height: 1,
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
    background: theme.palette.primary.main,
    py: 1,
};

const priorityStyle = {
    minWidth: theme.spacing(27),
    maxWidth: theme.spacing(40),
    p: 1,
    [theme.breakpoints.up('sm')]: {
        '.MuiButtonBase-root': {
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
    },
    [theme.breakpoints.down('sm')]: {
        p: 2,
        px: 4
    },
    [theme.breakpoints.down('xs')]: {
        px: 2,
        maxWidth: 'unset'
    }
};

const headerStyle = {
    p: 0,
    px: 1,
    [theme.breakpoints.down('sm')]: {
        px: 4,
    },
    [theme.breakpoints.down('xs')]: {
        px: 2
    }
};