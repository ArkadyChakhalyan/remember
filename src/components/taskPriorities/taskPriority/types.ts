import { TTaskPriority } from '../../../types/types';
import React from 'react';

export type TTaskPriorityProps = {
    priority: TTaskPriority;
    selected: boolean;
    onSelect: (e: React.KeyboardEvent | React.MouseEvent) => void;
}