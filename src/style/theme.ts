import { alpha, createTheme } from '@mui/material';

export const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    padding: '10px 12px',
                    backgroundColor: alpha('#000', 0.4),
                    borderRadius: 10,
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true
            }
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true
            }
        },
        MuiMenuItem: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
            styleOverrides: {
                root: {
                    padding: '6px 16px',
                    borderRadius: '6px'
                }
            }
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
                disableFocusRipple: true,
                disableTouchRipple: true
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    padding: '8px',
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 3
            }
        },
        MuiCheckbox: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true
            }
        }
    },
    palette: {
        primary: { main: '#333333' },
        secondary: { main: '#F5F5F5'},
        success: { main: '#2ECC71' },
        error: { main: '#E74C3C'},
        pastelBlue: { main: '#AED6F1'},
        pastelGreen: { main: '#A2D9CE'},
        pastelPink: { main: '#F5B7B1'},
        pastelYellow: { main: '#F9E79F'},
        text: {
            primary: '#333333',
            secondary: '#F5F5F5',
        },
        divider: alpha('#F5F5F5', 0.08)
    },
    typography: {
        fontFamily: 'Open Sans',
        allVariants: {
            color: '#333333'
        }
    },
    shape: {
        borderRadius: 2,
    },
    breakpoints: {
        values: {
            'xs': 400,
            'sm': 600,
            'md': 900,
            'lg': 1200,
            'xl': 1536
        }
    }
});