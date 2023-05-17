import { ETaskListTab, ITask } from '../../types/types';

export type TTaskListProps = {
    tab: ETaskListTab;
    tasks: ITask[];
}