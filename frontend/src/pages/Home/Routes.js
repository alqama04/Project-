import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import FallackLoading from "../../components/fallback/FallackLoading";

const loading = <Flex justify='center' align='center'><LoadingSpinner size={40}/></Flex>
const LazyHome = React.lazy(() => import('./Home'))

export const HomeRoute = <Route index element={<React.Suspense fallback={loading}><LazyHome /></React.Suspense>}></Route>
