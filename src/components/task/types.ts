import { ITask } from '../../types/types';
import { DraggableProvided } from 'react-beautiful-dnd';

export type TTaskProps = {
    draggableProvided?: DraggableProvided;
    dragging?: boolean;
    task: ITask;
    onClose?: () => void;
    setDisableDrag: (value: boolean) => void;
}