import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ROLES } from "../../config/Roles";
import RequireAuth from "../auth/RequireAuth";

const loading = <Flex justify='center' align='center'><LoadingSpinner size={40} /></Flex>

const LazyProfile = React.lazy(() => import('./profile/UserProfile'))

export const UserRoute = <Route path="/user">
   

    <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        <Route path="update-profile"
            element={
                <React.Suspense fallback={loading}>
                    <LazyProfile />
                </React.Suspense>
            } />
    </Route>
</Route>

//protectedRoute



// export const Profile = <Route path="/update-profile" element={<React.Suspense fallback={loading}><LazyProfile /></React.Suspense>} />