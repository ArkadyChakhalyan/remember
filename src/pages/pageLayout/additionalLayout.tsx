import React from 'react';
import { Outlet } from 'react-router-dom';

export const AdditionalLayout = () => {
    return  <main>
        <Outlet></Outlet>
    </main>;
}