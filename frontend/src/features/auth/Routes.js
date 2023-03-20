import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ROLES } from "../../config/Roles";
import RequireAuth from "./RequireAuth";

const loading = <Flex justify='center' align='center'><LoadingSpinner size={40} /></Flex>


const LazyLogin = React.lazy(() => import('./Login'))
const LazySignup = React.lazy(() => import("./signUp/SignUp"))
const LazyForgotPassword = React.lazy(() => import('./password/ForgotPassword'))
const LazyResetPassword = React.lazy(() => import('./password/ResetPassword'))
const LazyChangePassword = React.lazy(() => import('./password/ChangePassword'))
const LazyVerifyAccount = React.lazy(() => import("./VerifyAccount"))

export const authRoute = <Route path="/auth">

    <Route path="login" element={<React.Suspense fallback={loading}> <LazyLogin /> </React.Suspense>} />
    <Route path="sign-up" element={<React.Suspense fallback={loading}> <LazySignup /> </React.Suspense>} />
    <Route path="very-account" element={<React.Suspense fallback={loading}> <LazyVerifyAccount /> </React.Suspense>} />
    <Route path="forgot-password" element={<React.Suspense fallback={loading}> <LazyForgotPassword /> </React.Suspense>} />
    <Route path="reset-password/:token" element={<React.Suspense fallback={loading}> <LazyResetPassword /> </React.Suspense>} />

    <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        <Route path="change-password" element={<React.Suspense fallback={loading}> <LazyChangePassword /> </React.Suspense>} />
    </Route>
</Route>