import { SxProps } from '@mui/system';

export type TMenuBarItemProps = {
    active?: boolean;
    icon: JSX.Element;
    label: string;
    link?: string;
    onClick?: () => void;
}