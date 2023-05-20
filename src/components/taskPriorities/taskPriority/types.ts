import { TTaskPriority } from '../../../types/types';

export type TTaskPriorityProps = {
    priority: TTaskPriority;
    selected: boolean;
    onSelect: () => void;
}