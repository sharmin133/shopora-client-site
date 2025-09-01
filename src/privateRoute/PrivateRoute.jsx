// PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // current path

  if (!user) {
    
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
