import React from 'react';

export type TTaskActionProps = {
    color?: string;
    icon?: JSX.Element;
    label: string;
    selected?: boolean;
    onClick: () => void;
    onEnter?: (e: React.KeyboardEvent) => void;
}