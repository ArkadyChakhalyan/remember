import React from 'react';

export type TAddTaskButtonProps = {
    open: boolean;
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
}