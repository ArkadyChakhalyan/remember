import React from 'react';

export type TTaskActionProps = {
    label: string;
    onClick: () => void;
    onEnter?: (e: React.KeyboardEvent) => void;
}