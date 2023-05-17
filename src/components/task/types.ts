import { ITask } from '../../types/types';

export type TTaskProps = {
    task: ITask;
    onClose?: () => void;
}