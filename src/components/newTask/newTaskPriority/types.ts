import { TTaskPriority } from '../../../store/reducers/tasksReducer/types';

export type TNewTaskPriorityProps = {
    priority: TTaskPriority;
    selected: boolean;
    onSelect: () => void;
}