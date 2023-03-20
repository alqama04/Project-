import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ROLES } from "../../config/Roles";
import RequireAuth from "../auth/RequireAuth";

const loading = <Flex justify='center' align='center'><LoadingSpinner size={40} /></Flex>

const LazyDashBoard = React.lazy(() => import('./Dashboard/Dashboard'))
const LazyOverview = React.lazy(() => import('./Dashboard/Overview'))
//feautures > admin > store > product
const LazyProducts = React.lazy(() => import('./store/product/Products'))
const LazyAddProduct = React.lazy(() => import('./store/product/AddProduct'))

//feautures > admin > users 
const LazyUsersList = React.lazy(() => import('./users/UsersList'))
const LazyUsersDetail = React.lazy(() => import('./users/UserDetail'))

//feautures > admin > category
const LazyCategory = React.lazy(() => import('./category/Category'))


export const DasboardRoute = <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>


    <Route path="/dashboard"
        element={
            <React.Suspense
                fallback={loading}>
                <LazyDashBoard />
            </React.Suspense>
        }>
        <Route index element={<React.Suspense fallback={loading}><LazyOverview /></React.Suspense>} />
        <Route path='user' element={<React.Suspense fallback={loading}><LazyUsersList /></React.Suspense>} />
        <Route path='user/:id' element={<React.Suspense fallback={loading}><LazyUsersDetail /></React.Suspense>} />

        <Route path='store'>
            <Route path='category' element={<React.Suspense fallback={loading}><LazyCategory /></React.Suspense>} />
            <Route path='products' element={<React.Suspense fallback={loading}><LazyProducts /></React.Suspense>} />
            <Route path='add-product' element={<React.Suspense fallback={loading}><LazyAddProduct /></React.Suspense>} />
        </Route>

    </Route>
    </Route>

