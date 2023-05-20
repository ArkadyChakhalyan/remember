import '@material-ui/core/styles';

declare module '@mui/material/styles' {
    interface Palette {
        pastelBlue?: Palette['primary'];
        pastelGreen?: Palette['primary'];
        pastelPink?: Palette['primary'];
        pastelYellow?: Palette['primary'];
        accentGreen?: Palette['primary'];
    }
    interface PaletteOptions {
        pastelBlue?: PaletteOptions['primary'];
        pastelGreen?: PaletteOptions['primary'];
        pastelPink?: PaletteOptions['primary'];
        pastelYellow?: PaletteOptions['primary'];
        accentGreen?: PaletteOptions['primary'];
    }
}