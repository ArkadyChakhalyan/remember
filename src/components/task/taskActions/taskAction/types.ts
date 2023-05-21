import React from 'react';

export type TTaskActionProps = {
    color?: string;
    icon: JSX.Element;
    label: string;
    onClick: () => void;
    onEnter?: (e: React.KeyboardEvent) => void;
}