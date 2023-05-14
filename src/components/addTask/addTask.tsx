import { Popover, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../../style/theme';
import { AddTaskButton } from '../addTaskButton/addTaskButton';
import { NewTask } from '../newTask/newTask';

export const AddTask = () => {
    const [open, setOpen] = useState(false);
    let [paperHover, _setPaperHover] = useState(false);
    const [keepOpen, setKeepOpen] = useState(null);

    const setPaperHover = (value: boolean) => {
        paperHover = value;
        _setPaperHover(value);
    };

    const ref = useRef(null);
    const paperRef = useRef(null);
    const onToggle = () => {
        setOpen(!open);
    };

    const onClose = () => {
        setOpen(false);
        setKeepOpen(false);
    };

    const onPaperClick = () => {
        setKeepOpen(true);
    };

    const onClick = () => {
        if (open) {
            setKeepOpen(false);
        } else {
            setKeepOpen(true);
        }
        onToggle();
    };

    const onMouseEnter = (paper?: boolean) => {
        if (paper) {
            setPaperHover(true);
        }
        if (keepOpen || open) return;
        setOpen(true);
    };

    const onMouseLeave = (e: React.MouseEvent, paper?: boolean) => {
        if (paper) {
            setPaperHover(false);
        }
        if (
            keepOpen ||
            !open ||
            e.relatedTarget === paperRef?.current ||
            paper && e.relatedTarget === ref?.current.firstChild
        ) return;
        setTimeout(() => {
            if (paperHover) return;
            setOpen(false);
        }, 200);
    };

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth < 600) { // breakpoint SM
                onClose();
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return <Stack sx={containerStyle} ref={ref}>
        <AddTaskButton
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            onMouseEnter={() => onMouseEnter(false)}
            open={open}
        />
        <Popover
            sx={{
                pointerEvents: keepOpen ? 'all' : 'none',
                zIndex: theme.zIndex.mobileStepper
            }}
            open={open}
            anchorEl={ref?.current}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            onClose={onClose}
            PaperProps={{
                sx: paperStyle,
                onMouseEnter: () => onMouseEnter(true),
                onMouseLeave: e => onMouseLeave(e, true),
                ref: paperRef,
                onClick: onPaperClick
            }}
        >
            <NewTask preventClose={() => setKeepOpen(true)} onClose={onClose}/>
        </Popover>
    </Stack>;
};

const containerStyle = {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    zIndex: theme.zIndex.mobileStepper + 1, // to go over popover
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}

const paperStyle = {
    mt: 4,
    ml: 4,
    p: 3,
    width: theme.spacing(36),
    height: theme.spacing(36),
    borderRadius: theme.shape.borderRadius * 7,
    pointerEvents: 'all',
    bgcolor: theme.palette.secondary.main
};