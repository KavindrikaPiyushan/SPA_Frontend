import { verify } from "../service/auth.service";
import useApi from "../hooks/useApi";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const { request, loading, error } = useApi(verify);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const verifyAuth = async () => {
        try {
            await request();
            setIsAuthenticated(true);
        } catch (err) {
            setIsAuthenticated(false);
        }
        };
        verifyAuth();
    }, [request]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);