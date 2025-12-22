import { Navigate,Outlet } from "react-router-dom";
import {useAuth} from "../context/useAuth.js";

export default function ProtectedRoutes() {
    const {isAuthenticated,loading} = useAuth();

    if(loading){
        return <div>Loading...</div>;
    }
    return isAuthenticated ? <Outlet/> : <Navigate to="/admin/login" replace />;
}