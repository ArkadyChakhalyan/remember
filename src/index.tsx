import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/app';
import { HashRouter as Browser} from 'react-router-dom';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { theme } from './style/theme';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/*<Provider store={store}>*/}
            <Browser>
                <ThemeProvider theme={theme}>
                    <GlobalStyles styles={{ body: { margin: 0, background: theme.palette.secondary.main } }} />
                    <App />
                </ThemeProvider>
            </Browser>
        {/*</Provider>*/}
    </React.StrictMode>
);