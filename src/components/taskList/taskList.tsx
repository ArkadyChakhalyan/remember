import { alpha, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Task } from '../task/task';
import { TASK_LIST_ADD, TASK_LIST_EMPTY, TASK_LIST_OVERDUE_EMPTY } from './constants';
import { theme } from '../../style/theme';
import { DEFAULT_TASK_PRIORITY } from '../../app/constants';
import { getTaskDateByTab } from '../../helpers/getTaskDateByTab';
import { getSortedTasks } from '../../store/selectors/getSortedTasks';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardTaskListTab } from '../../store/reducers/dashboardReducer/selectors/getDashboardTaskListTab';
import { getTasks } from '../../store/reducers/tasksReducer/selectors/getTasks';
import { ETaskListTab } from '../../types/types';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { editTaskAC } from '../../store/reducers/tasksReducer/tasksReducer';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

export const TaskList = () => {
    const dispatch = useDispatch();

    const tab = useSelector(getDashboardTaskListTab);
    const tasks = useSelector(getTasks);

    const sortedTasks = getSortedTasks(tab, tasks);

    const [show, setShow] = useState(null);
    const [disableDrag, setDisableDrag] = useState(null);

    const onDragEnd = (
        result: DropResult
    ) => {
        if (!result.destination) return
        const { source, destination } = result;
        if (source.droppableId === '') {
            // todo subtask
        } else {
            const task = sortedTasks[source.index];
            const tasks = sortedTasks.filter(({ id }) => id !== task.id);
            const prevItem = tasks[destination.index - 1];
            const nextItem = tasks[destination.index];
            let orderNumber = 0;
            if (prevItem && nextItem) {
                orderNumber = (prevItem.orderNumber + nextItem.orderNumber) / 2;
            } else if (prevItem) {
                orderNumber = prevItem.orderNumber + 1;
            } else if (nextItem) {
                orderNumber = nextItem.orderNumber - 1;
            }
            dispatch(editTaskAC({ id: task.id, orderNumber }));
        }
    };

    return <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'task-list'}>
            {(provided, snapshot) => (
                <Stack
                    spacing={0.25}
                    sx={containerStyle}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {
                        sortedTasks.map((task, idx) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={idx}
                                isDragDisabled={disableDrag}
                            >
                                {(provided, snapshot) => (
                                    <Task
                                        task={task}
                                        draggableProvided={provided}
                                        dragging={snapshot.isDragging}
                                        setDisableDrag={setDisableDrag}
                                    />
                                )}
                            </Draggable>
                        ))
                    }
                    {provided.placeholder}
                    {
                        tab !== ETaskListTab.OVERDUE &&
                        <>
                            {show &&
                                <Task
                                    task={{
                                        id: null,
                                        createDate: null,
                                        text: '',
                                        date: getTaskDateByTab(tab),
                                        priority: DEFAULT_TASK_PRIORITY,
                                        doneDate: null
                                    }}
                                    onClose={() => setShow(false)}
                                    setDisableDrag={setDisableDrag}
                                />
                            }
                            <Button
                                variant={'text'}
                                color={'secondary'}
                                sx={buttonStyle}
                                size={'large'}
                                onClick={() => setShow(true)}
                                startIcon={<AddCircleRoundedIcon />}
                            >
                                {TASK_LIST_ADD}
                            </Button>
                        </>
                    }
                    {!sortedTasks.length && <Typography sx={textStyle}>
                        {tab !== ETaskListTab.OVERDUE ? TASK_LIST_EMPTY : TASK_LIST_OVERDUE_EMPTY}
                    </Typography>}
                </Stack>
            )}
        </Droppable>
    </DragDropContext>;
};

const containerStyle = {
    position: 'relative',
    height: 'fit-content',
    flexGrow: 1,
    pl: 1.5,
    [theme.breakpoints.down('sm')]: {
        pl: 3
    }
};

const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.3rem',
    fontWeight: 500,
    userSelect: 'none',
    color: alpha(theme.palette.secondary.main, 0.2),
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    }
};

const buttonStyle = {
    justifyContent: 'flex-start',
    px: 2,
    ml: `${theme.spacing(-1.5)} !important`,
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'none',
    color: alpha(theme.palette.secondary.main, 0.6),
    '&:hover, &:focus': {
        color: theme.palette.secondary.main,
        background: 'none'
    },
};