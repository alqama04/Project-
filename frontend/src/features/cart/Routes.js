import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ROLES } from "../../config/Roles";
import RequireAuth from "../auth/RequireAuth";

const loading = <Flex justify='center' align='center'> <LoadingSpinner size={40} />     </Flex>
const LazyCart = React.lazy(() => import('./CartItems'))

export const cartRoute = <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
    <Route path="/cart" element={<React.Suspense fallback={loading}> <LazyCart /> </React.Suspense>} />
</Route>


