import { TTaskPriority } from '../../types/types';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles/createTheme';

export type TTaskPrioritiesProps = {
    priority: TTaskPriority;
    sx?: SxProps<Theme>;
    onPriorityChange: (priority: TTaskPriority) => void;
}