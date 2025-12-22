import { verify } from "../api/service/auth.service";
import useApi from "../api/hooks/useApi";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  
    const { request, loading, error } = useApi(verify);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initialized, setInitialized] = useState(false);

    

    useEffect(() => {
      const verifyAuth = async () => {
        try {
            await request();
            setIsAuthenticated(true);
        } catch (err) {
            setIsAuthenticated(false);
        } finally {
            setInitialized(true);
        }
        };
        verifyAuth();
    }, [request]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, error, initialized }}>
      {children}
    </AuthContext.Provider>
  );
}
