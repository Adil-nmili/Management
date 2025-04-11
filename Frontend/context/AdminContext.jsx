import { createContext, useContext, useEffect, useState } from "react"
import User from "../services/User"


export const LoginContext = createContext({
    login : (payload) =>{},
    logout : () => {},
    admin : null,
    setAdmin : () => {},
    authenticate : false,
    setAuthenticated : () =>{}

})



export default function AdminContext ({children}){
    const [admin, _setAdmin] = useState(
       JSON.parse(window.localStorage.getItem("ADMIN"))
    )
    const [authenticate, _setAuthenticated] = useState(
        localStorage.getItem("AUTHENTICATED") === "true"
    )
    

    const login = async (payload) => {
        await User.getCSRFToken();
        return User.login(payload)
    }
    const logout = () =>{
        setAdmin(null);
        setAuthenticated(false);
        localStorage.removeItem("AUTHENTICATED")
    }

    const setAuthenticated = (isAuthenticate) =>{
        _setAuthenticated(isAuthenticate);
        localStorage.setItem("AUTHENTICATED",isAuthenticate)
        
    }
    const setAdmin = (admin) => {
        _setAdmin(admin);
        window.localStorage.setItem("ADMIN",JSON.stringify(admin))
    }
    

    return <>
        <LoginContext.Provider value={{
            admin,setAdmin,login,logout,authenticate,setAuthenticated
        }}>
            {children}
        </LoginContext.Provider>
    </>
}


export const useAdminContext = () => useContext(LoginContext)


/**
 * AdminContext component provides authentication and admin state management.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * 
 * @returns {JSX.Element} The AdminContext provider with authentication and admin state.
 * 
 * @typedef {Object} AdminContextValue
 * @property {Object} admin - The current admin state.
 * @property {Function} setAdmin - Function to update the admin state.
 * @property {Function} login - Function to log in the admin.
 * @property {Function} logout - Function to log out the admin.
 * @property {boolean} authenticate - The current authentication state.
 * @property {Function} setAuthenticated - Function to update the authentication state.
 */