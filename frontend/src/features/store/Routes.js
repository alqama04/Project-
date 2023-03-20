import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const loading = <Flex justify='center' align='center'><LoadingSpinner size={40} /></Flex>
//products 
const LazyProductList = React.lazy(() => import('./product/ProductList'))
const LazyProductDetail = React.lazy(() => import('./product/ProductDetail'))

const ProductListRoute = <Route index element={<React.Suspense fallback={loading}><LazyProductList /></React.Suspense>} />
const ProductDetailRoute = <Route path=':id' element={<React.Suspense fallback={loading}><LazyProductDetail /></React.Suspense>} />

export const ProductRoute = <Route path="/products">
    {ProductListRoute}
    {ProductDetailRoute}
</Route>


