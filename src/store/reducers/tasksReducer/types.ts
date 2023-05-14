export type TTasksState = {
    [key: string]: ITask
}

export interface ITask {
    date: number;
    doneDate: number;
    id: TTaskId;
    priority: TTaskPriority;
    text: string;
}

export type TTaskId = string;

export type TTaskPriority = 0 | 1 | 2 | 3 | 4;