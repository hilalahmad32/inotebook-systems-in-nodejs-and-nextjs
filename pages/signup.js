import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const signup = () => {
    // use router
    const router = useRouter()
    // user state for user
    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: ''
    });
    // use loading
    const [isLoading, setIsLoading] = useState(false)
    // control input by useing onchange
    const onChangeHandler = (e) => {
        // get the name of input
        const name = e.target.name;
        // get the value of input
        const value = e.target.value;
        // update the users
        setUsers({ ...users, [name]: value });
    }
    // submit form
    const signup = async (e) => {
        e.preventDefault();
        // destructure the value
        const { name, email, password } = users;
        // fetch api to make a post request
        const data = {
            name, email, password
        }
        setIsLoading(true)
        const res = await (await fetch('./api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        if (res.success) {
            setIsLoading(false)
            toast(res.message, {
                type: 'success'
            });
            setUsers({
                name: '',
                email: '',
                password: ''
            });
            router.push('/signin')
        } else {
            setIsLoading(false)
            toast(res.message, {
                type: 'error'
            });
        }
    }

    // check user avaliablity
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            router.push('/')
        }
    }, [])
    return (
        <div >
            <Navbar />
            <div className="container mx-auto max-w-xl">
                <div className="shadow my-5 p-4">
                    <h2 className="text-2xl text-center">Signup Form</h2>
                    <form action="" onSubmit={signup} className="my-2">
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Your Name</label>
                            <input type="text" name="name" value={users.name} onChange={onChangeHandler} id="" className="rounded py-2 px-2 outline-purple-500 border w-full my-2" placeholder="Enter Name" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Your Email</label>
                            <input type="email" name="email" value={users.email} onChange={onChangeHandler} id="" className="rounded py-2 px-2 outline-purple-500 border w-full my-2" placeholder="Enter Email" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Your Password</label>
                            <input type="password" name="password" value={users.password} onChange={onChangeHandler} id="" className="rounded py-2 px-2 outline-purple-500 border w-full my-2" placeholder="Enter password" />
                        </div>
                        <button className="bg-purple-500 rounded py-2 px-6 text-white hover:bg-purple-600" type="submit">{isLoading ? 'Signuping...' : 'Signup'}</button>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default signup