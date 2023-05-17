import { ITask, TTaskPriority } from '../../../types/types';

export type TTaskActionsProps = {
    task: ITask;
    onDateChange: (date: number) => void;
    onDelete: () => void;
    onPriorityChange: (priority: TTaskPriority) => void;
}