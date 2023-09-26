import React, { useEffect } from "react";
import Home from "./pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";

import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSucessPage from "./pages/OrderSucessPage";
import UserOrderPage from "./pages/UserOrderPage";
import { UserProfilePage } from "./pages/UserProfilePage";

import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from "./features/auth/authSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ProductFormPageAdmin from "./pages/ProductFormPageAdmin";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import StripeCheckout from "./pages/StripeCheckout";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <ProductFormPageAdmin></ProductFormPageAdmin>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/:id",
    element: (
      <ProtectedAdmin>
        <ProductFormPageAdmin></ProductFormPageAdmin>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LogInPage></LogInPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSucessPage></OrderSucessPage>,
  },

  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    //koi rooute match nhi kara to ye chalega
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
 const userChecked=useSelector(selectUserChecked)
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync());
      dispatch(fetchItemsByUserIdAsync());
      // we can get user id from req.user
   
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      { userChecked &&
      <RouterProvider router={router} />
    }
    </div>
  );
}

export default App;
