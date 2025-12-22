import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import LoadingComponent from "../components/LoadingComponent.jsx";

export default function ProtectedRoutes({ children }) {
    const { isAuthenticated, initialized } = useAuth();

    if (!initialized) {
        return <LoadingComponent />;
    }

    // Support both usage patterns: with children or as a wrapper using <Outlet/>
    return isAuthenticated ? (children ?? <Outlet />) : <Navigate to="/admin/login" replace />;
}