import React from "react";
import { useSelector } from "react-redux";
import { Navigate  , Outlet} from "react-router-dom";

const AuthGuard = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log("AuthGuard: isAuthenticated =", isAuthenticated); //
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthGuard;