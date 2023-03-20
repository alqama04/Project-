import FallackLoading from './fallback/FallackLoading'
import React from 'react';
import { Outlet } from 'react-router-dom';
const LazyNavbar = React.lazy(() => import('./header/Navbar'))
const LazyFooter = React.lazy(() => import('./footer/Footer'))
const Header = () => {
    return (
        <>
            <React.Suspense fallback={''}>
                <LazyNavbar />
            </React.Suspense>

            <Outlet />

            <React.Suspense fallback={''}>
                <LazyFooter />
            </React.Suspense>
        </>
    );
}

export default Header;
