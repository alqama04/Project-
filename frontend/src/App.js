import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout';
import { Box } from '@chakra-ui/react';
import PageNotFound from './pages/PageNotFound';
// store 
import { ProductRoute } from './features/store/Routes';
import AuthPersist from './features/auth/AuthPersist';

import { DasboardRoute } from './features/admin/Routes';

import Checkout from './features/payment/Checkout';

import { authRoute } from './features/auth/Routes';

import { UserRoute } from './features/users/Routes';
import { cartRoute } from './features/cart/Routes';
import { HomeRoute } from './pages/Home/Routes';
import OrderConfirmation from './features/order/OrderConfirmation';

function App() {
  return (
    <>
      <Box overflow='hidden' bg='gray.100'>
        <BrowserRouter>
          <Routes>
            {/*public route */}
            <Route element={<AuthPersist />}>
              <Route exact path='/' element={<Header />}>
                {HomeRoute}
                {UserRoute}
                {authRoute}
                {ProductRoute}
                {cartRoute}


                <Route path='/order-confirmation' element={<OrderConfirmation />} />
              </Route>
              {/* admin route */}
              {DasboardRoute}
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}
export default App;
