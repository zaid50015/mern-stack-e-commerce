import React from "react";
import Home from "./pages/Home";


import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import LogInPage from  "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/login",
    element: <LogInPage></LogInPage>
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>
  },
]);

function App() {
  return (
    <div className="App">

         <RouterProvider router={router} />

    </div>
  );
}

export default App;
