import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../pages/contextapi/GlobalContext'

const Navbar = () => {
    const { isLogedIn, getUsers, users, logoutUser } = useContext(GlobalContext);

    const logout = () => {
        logoutUser();
        localStorage.removeItem('access_token')
    }
    useEffect(() => {
        getUsers();
    }, [])

    const router = useRouter()
    return (
        <div className="bg-purple-500">
            <div className="container mx-auto py-4">
                <div className="flex justify-between items-center">
                    <div className="">
                        {!isLogedIn && ''}
                        {isLogedIn && <>
                            <Link href={'/'}>
                                <a className={` ${router.pathname === '/' ? ' border-b text-blue-800 ' : ''}  text-white text-xl`}>iNoteBookSystem</a>
                            </Link>
                            <Link href={'/create-note'}>
                                <a className={` ${router.pathname === '/create-note' ? ' border-b text-blue-800' : ''}  ml-4 text-white text-xl`}>CreateNote</a>
                            </Link></>}
                    </div>
                    <div className="">
                        {!isLogedIn && <>
                            <Link href={'/signin'}>
                                <a className={` ${router.pathname === '/signin' ? ' border-b text-blue-800' : ''}  text-white text-xl`}>Signin</a>
                            </Link>
                            <Link href={'/signup'}>
                                <a className={` ${router.pathname === '/signup' ? ' border-b text-blue-800' : ''}  ml-4 text-white text-xl`}>Signup</a>
                            </Link></>}
                        {isLogedIn && <div className="flex items-center">
                            <h3 className="text-xl text-white">{users.name}</h3>
                            <button className="ml-3 text-xl text-white border px-4 py-1 rounded-md hover:bg-purple-800" onClick={logout}>Logout</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar