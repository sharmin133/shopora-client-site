import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import DashboardLayouts from "../pages/Dashboard/DashboardLayouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardLayouts/DashbordHome";
import AddProduct from "../pages/AddProduct/AddProduct";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products></Products>},
       { path: "add-product", element: <AddProduct /> },
        { path:"/products/:id", element: <ProductDetails></ProductDetails>},
        { path:'checkout', element: <Checkout></Checkout> },
     {
  path: '/dashboard',
  element: <DashboardLayouts></DashboardLayouts>,
  children: [

    {
       index:true, element:<DashboardHome></DashboardHome>
    },
    ]},

    
      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
      
    ],
  },
]);

export default router;