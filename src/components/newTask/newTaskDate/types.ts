export enum ETaskDate {
    TODAY = 'Today',
    TOMORROW = 'Tomorrow',
    THIS_MONTH = 'This month',
    NEXT_MONTH = 'Next month',
    FUTURE = 'Somewhere in the future',
    CUSTOM = 'Custom date'
}

export type TNewTaskDateProps = {
    date: number;
    onChange: (date: number) => void;
}