import { ETaskDate } from '../../../types/types';

export type TNewTaskDateProps = {
    date: ETaskDate;
    onChange: (date: ETaskDate) => void;
}