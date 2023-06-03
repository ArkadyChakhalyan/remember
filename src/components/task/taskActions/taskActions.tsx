import { alpha, Divider, IconButton, Menu, Stack, SwipeableDrawer, Typography } from '@mui/material';
import React, { FC, MouseEvent, useState } from 'react';
import { TTaskActionsProps } from './types';
import { useDispatch } from 'react-redux';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { theme } from '../../../style/theme';
import {
    ONE_DAY,
    TASK_ACTIONS_DATE,
    TASK_ACTIONS_DATE_ADD,
    TASK_ACTIONS_DATE_CHANGE,
    TASK_ACTIONS_DELETE,
    TASK_ACTIONS_PRIORITY,
    TASK_ACTIONS_PRIORITY_ADD,
    TASK_ACTIONS_PRIORITY_CHANGE,
    TASK_ACTIONS_SUB_TASK
} from './constants';
import { TaskAction } from './taskAction/taskAction';
import { deleteTaskAC } from '../../../store/reducers/tasksReducer/tasksReducer';
import { TaskPriorities } from '../../taskPriorities/taskPriorities';
import { ETaskDate, TTaskPriority } from '../../../types/types';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { TASK_DATES } from '../../../app/constants';
import { getTaskDateByLabel } from '../../../helpers/getTaskDateByLabel';
import moment from 'moment';
import { getTaskDateOverdue } from '../../../helpers/getTaskDateOverdue';

export const TaskActions: FC<TTaskActionsProps> = ({
    task,
    onDateChange,
    onDelete: onDeleteOwn,
    onPriorityChange,
    setDisableDrag
}) => {
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const { id, date, priority } = task;

    const dispatch = useDispatch();

    const [anchor, setAnchor] = useState(null);
    const [priorityEdit, setPriorityEdit] = useState(null);
    const [dateEdit, setDateEdit] = useState(null);

    const onOpen = (e: MouseEvent<HTMLElement>) => {
        setDisableDrag(true);
        setAnchor(e.currentTarget);
    };

    const onClose = () => {
        setDisableDrag(false);
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

    const onDateSelect = (date: number) => {
        onDateChange(date);
        onClose();
    };

    const onDelete = () => {
        if (onDeleteOwn) {
            onDeleteOwn();
        } else {
            dispatch(deleteTaskAC(id));
        }
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClose();
        }
    };

    const onBack = () => {
        setPriorityEdit(false);
        setDateEdit(false);
    }

    const editHeader = (dateEdit || priorityEdit) &&
        <Stack sx={{ ...headerStyle, ...(priorityEdit ? headerPriorityStyle : null) }}>
            <IconButton
                sx={headerBackStyle}
                color={'secondary'}
                onClick={onBack}
            >
                <ChevronLeftRoundedIcon />
            </IconButton>
            <Typography
                color={'secondary'}
                variant={'body2'}
                sx={headerTextStyle}
            >
                {dateEdit ? TASK_ACTIONS_DATE : TASK_ACTIONS_PRIORITY}
            </Typography>
            {dateEdit && date &&
                <Typography
                    variant={'body2'}
                    sx={{ ...headerDateTextStyle, ...(date && getTaskDateOverdue(date) ? overdueStyle : {}) }}
                >
                    {moment(date - ONE_DAY).format(new Date(date).getFullYear() !== new Date().getFullYear() ? 'MMMM D YYYY' : 'MMMM D')}
                </Typography>
            }
        </Stack>;

    const editPriority = priorityEdit && <TaskPriorities onPriorityChange={onPrioritySelect} priority={priority} sx={priorityStyle} />;

    const editDate = dateEdit && <Stack sx={{ minWidth: theme.spacing(23) }}>
        {
            TASK_DATES.map(item => (
                <TaskAction
                    key={item}
                    label={item}
                    onClick={() => onDateSelect(getTaskDateByLabel(item))}
                    selected={!date && item === ETaskDate.SOMEDAY}
                />
            ))
        }
    </Stack>;

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
            <MoreVertRoundedIcon sx={{ pointerEvents: 'none' }}/>
        </IconButton>
    </>;
};

const buttonStyle = {
    pointerEvents: 'none',
    color: alpha(theme.palette.secondary.main, 0.6),
    transition: theme.transitions.create(['color', 'opacity']),
    transform: 'rotate(90deg)',
    '&:hover, &:focus': {
        pointerEvents: 'all',
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
    bottom: theme.spacing(1.5),
    left: theme.spacing(1.5),
    right: theme.spacing(1.5),
    p: 1.5,
    pt: 3.5,
    borderRadius: theme.shape.borderRadius * 6,
    background: theme.palette.primary.main,
    '&:before': {
        content: '""',
        position: 'absolute',
        top: theme.spacing(2.5),
        left: '50%',
        transform: 'translateX(-50%)',
        height: theme.spacing(0.75),
        width: theme.spacing(5),
        background: alpha(theme.palette.secondary.main, 0.3),
        borderRadius: theme.shape.borderRadius * 2
    }
};

const priorityStyle = {
    minWidth: theme.spacing(27),
    maxWidth: theme.spacing(40),
    p: 1,
    '.MuiButtonBase-root': {
        borderRadius: theme.shape.borderRadius * 2.5,
        '&:before': {
            borderRadius: theme.shape.borderRadius * 3.5,
        }
    },
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
    flexDirection: 'row',
    alignItems: 'center',
    p: 0,
    px: 1,
};

const headerPriorityStyle = {
    [theme.breakpoints.down('sm')]: {
        px: 4,
    },
    [theme.breakpoints.down('xs')]: {
        px: 2
    }
}

const headerBackStyle = {
    p: 0.5,
    pl: 0,
    ml: -0.75,
    [theme.breakpoints.down('sm')]: {
        py: 1,
    },
};

const headerTextStyle = {
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.95rem'
    },
};

const headerDateTextStyle  = {
    flexGrow: 1,
    ml: 1.5,
    color: alpha(theme.palette.secondary.main, 0.6),
    fontWeight: 600,
    textAlign: 'end',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.95rem',
    },
};

const overdueStyle = {
    color: theme.palette.error.main
};