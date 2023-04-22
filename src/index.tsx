import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyB60bo1YN8lQMnZFN82VqvHH3HxCJakcSg',
    authDomain: 'thearkadychakhalyan.firebaseapp.com',
    projectId: 'thearkadychakhalyan',
    storageBucket: 'thearkadychakhalyan.appspot.com',
    messagingSenderId: '1008078587221',
    appId: '1:1008078587221:web:4209c80112090f10a5dbdc',
    measurementId: 'G-Q9CXD9B3TH'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);