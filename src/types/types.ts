export interface ITask {
    createDate: number;
    date: number;
    doneDate: number;
    id: TTaskId;
    orderNumber?: number;
    priority: TTaskPriority;
    text: string;
}

export enum ETaskDate {
    TODAY = 'Today',
    TOMORROW = 'Tomorrow',
    THIS_WEEK = 'This week',
    THIS_MONTH = 'This month',
    NEXT_MONTH = 'Next month',
    SOMEDAY = 'Someday',
    CUSTOM = 'Custom date'
}

export type TTaskId = string;

export type TTaskPriority = 0 | 1 | 2 | 3 | 4;

export enum ETaskListTab {
    ALL = 'All',
    TODAY = 'Today',
    THIS_WEEK = 'This week',
    THIS_MONTH = 'This month',
    THIS_YEAR = 'This year',
    OVERDUE = 'Overdue',
}