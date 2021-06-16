import axios from 'axios';
import { useContext, createContext, useEffect } from 'react';
// import { useNavigate } from 'react-router';
import { UseLocalStorage } from "../custom-hooks/useLocalStorage";

const AuthContext = createContext(false);

export function useAuth() {
    return useContext(AuthContext);
}

function setupAuthHeaders(token) {
    if(token) {
        return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`); 
    }
    delete axios.defaults.headers.common["Authorization"];
}

export function AuthProvider({children}) {
    const [user, setUser] = UseLocalStorage('userDetails', null);
    // const navigate = useNavigate();

    useEffect(() => {
        setupAuthHeaders( user?.authorization );
    }, [user] );

    // useEffect(() => {
    //     (function setupAuthExceptionHandler(logoutUser, navigate) {
    //         const UNAUTHORIZED = 401;
    //         axios.interceptors.response.use(
    //           (response) => response,
    //           (error) => {
    //             if (error?.response?.status === UNAUTHORIZED) {
    //               setUser(null);
    //             //   navigate("/signin");
    //             }
    //             return Promise.reject(error);
    //           }
    //         );
    //       })();
    // }, []);

    return (
        <AuthContext.Provider value = {{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}