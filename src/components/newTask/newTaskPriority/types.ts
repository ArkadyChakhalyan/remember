import { TTaskPriority } from '../../../types/types';

export type TNewTaskPriorityProps = {
    priority: TTaskPriority;
    selected: boolean;
    onSelect: () => void;
}