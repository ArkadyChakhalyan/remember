import { ETaskDate } from '../types/types';

export const getTaskDateByLabel = (label: string) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if (label === ETaskDate.TODAY) {
        return date.setDate(date.getDate() + 1);
    } else if (label === ETaskDate.TOMORROW) {
        return date.setDate(date.getDate() + 2);
    } else if (label === ETaskDate.THIS_WEEK) {
        for (let i = 0; i < 7; i++) {
            date.setDate(date.getDate() + 1);
            if (!date.getDay()) {
                break;
            }
        }
        return date.setDate(date.getDate() + 1);
    } else if (label === ETaskDate.THIS_MONTH) {
        date.setDate(1);
        return date.setMonth(date.getMonth() + 1);
    } else if (label === ETaskDate.NEXT_MONTH) {
        date.setDate(1);
        return date.setMonth(date.getMonth() + 2);
    } else if (label === ETaskDate.SOMEDAY) {
        return 0;
    }
};