import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
    //   { 
    //     path: "dashboard", 
    //     element: (
    //       <PrivateRoute>
    //         <Dashboard />
    //       </PrivateRoute>
    //     ) 
    //   },
      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
    ],
  },
]);

export default router;