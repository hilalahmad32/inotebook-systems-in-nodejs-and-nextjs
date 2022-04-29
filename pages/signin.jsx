import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
const signin = () => {
    const [users, setUsers] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();
    // use isLoading
    const [isLoading, setIsLoading] = useState(false)
    // change the value of input field
    const onChangeHandler = (e) => {
        // get the name of field
        const name = e.target.name;
        // get the value of field
        const value = e.target.value;
        // update the user state
        setUsers({ ...users, [name]: value })
    }

    // sigin in using post request
    const signin = async (e) => {
        e.preventDefault();
        const { email, password } = users;
        const data = { email, password };
        setIsLoading(true)
        const res = await (await fetch('./api/auth/signin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        if (res.success) {
            setIsLoading(false)
            alert(res.message);
            localStorage.setItem('access_token', res.authToken)
            setUsers({
                email: '',
                password: '',
            })
            router.push('/')
        } else {
            setIsLoading(false)
            alert(res.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            router.push('/')
        } else {
        }
    }, [])
    return (
        <div>
            <div >
                <Navbar />
                <div className="container mx-auto max-w-xl">
                    <div className="shadow my-5 p-4">
                        <h2 className="text-2xl text-center">SignIn Form</h2>
                        <form action="" onSubmit={signin} className="my-2">
                            <div className="my-2">
                                <label htmlFor="" className="font-semibold text-xl">Enter Your Email</label>
                                <input type="email" name="email" value={users.email} onChange={onChangeHandler} className="rounded py-2 px-2 outline-purple-500 border w-full my-2" placeholder="Enter Email" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="" className="font-semibold text-xl">Enter Your Password</label>
                                <input type="password" name="password" value={users.password} onChange={onChangeHandler} id="" className="rounded py-2 px-2 outline-purple-500 border w-full my-2" placeholder="Enter password" />
                            </div>
                            <button className="bg-purple-500 rounded py-2 px-6 text-white hover:bg-purple-600" type="submit">{isLoading ? 'Logining....' : 'Login'}</button>
                        </form>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default signin