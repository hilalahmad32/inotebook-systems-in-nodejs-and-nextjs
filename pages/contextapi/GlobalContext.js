import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
// create context
export const GlobalContext = createContext({})
// create global provider
const GlobalProvider = ({ children }) => {
    // check is logedin is true
    const [isLogedIn, setIsLogedIn] = useState(false)
    // users
    const [users, setUser] = useState({})

    const router = useRouter()
    // getUsers

    const getUsers = async () => {
        // send get request 
        const res = await (await fetch('../api/auth/user', {
            method: 'GET',
        })).json()
        if (res.success) {
            setUser(res.users)
            setIsLogedIn(true)
        }
    }
    // logout user
    const logoutUser = async () => {
        setUser({})
        setIsLogedIn(false)
        const res = await (await fetch('../api/auth/logout')).json()
        router.push('/signin')
    }
    // useeffect to render users every time 
    useEffect(() => {
        getUsers();
    }, [])
    // return the context
    return <GlobalContext.Provider value={{ isLogedIn, getUsers, users, logoutUser }}>
        {children}
    </GlobalContext.Provider>
}


export default GlobalProvider