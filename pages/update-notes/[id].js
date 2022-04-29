import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
const UpdateNotes = () => {
    const router = useRouter()
    const [notes, setNotes] = useState({
        title: '',
        description: '',
        bg_color: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const onChangeHandler = (e) => {
        // get the name of field and value
        const { name, value } = e.target;
        // update notes field
        setNotes({ ...notes, [name]: value })
    }
    const updateNotes = async (e) => {
        e.preventDefault();
        // destructure the data
        const { title, description, bg_color } = notes;
        // get id
        const id = router.query.id;
        const data = {
            title, description, bg_color
        };
        // send patch request
        setIsLoading(true)
        const res = await (await fetch(`../api/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        if (res.success) {
            setIsLoading(false)
            alert(res.message)
            setNotes({
                title: '',
                description: '',
                bg_color: '',
            });
            router.push('/')
        } else {
            alert(res.message)
        }
    }
    // get notes by id
    const getNote = async () => {
        const id = router.query.id
        // send put requres
        const res = await (await fetch(`../api/notes/${id}`, {
            method: 'PUT'
        })).json();
        if (res.success) {
            setNotes(res.notes)
        }
    }

    useEffect(() => {
        getNote()
    }, [])
    return (
        <div>
            <Navbar />
            <div className="container mx-auto max-w-xl">
                <div className="shadow my-5 p-4">
                    <h2 className="text-2xl text-center">Update Note</h2>
                    <form action="" className="my-2" onSubmit={updateNotes}>
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Title</label>
                            <input type="text" name="title" value={notes.title} onChange={onChangeHandler} className="rounded py-2 px-2 outline-purple-500 border w-full my-2" placeholder="Enter the title" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Enter Description</label>
                            <textarea type="text" col="4" row="4" name="description" value={notes.description} onChange={onChangeHandler} className="rounded py-2 px-2 outline-purple-500 border w-full my-2" placeholder="Enter the description"></textarea>
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="font-semibold text-xl">Select bg-color / background color</label>
                            <select name="bg_color" value={notes.bg_color} onChange={onChangeHandler} select={notes.bg_color} className="rounded py-2 px-2 outline-purple-500 border w-full my-2">
                                <option disabled select>Select bg-color default is white</option>
                                <option value="1" className="text-black">Black background color</option>
                                <option value="2" className="text-green-500">Green background color</option>
                                <option value="3" className="text-yellow-500">Yellow background color</option>
                                <option value="4" className="text-pink-500">Pink background color</option>
                                <option value="5" className="text-purple-500">Purple background color</option>
                                <option value="6" className="text-blue-500">Blue background color</option>
                                <option value="7" className="text-red-500">Red background color</option>
                            </select>
                        </div>
                        <button className="bg-purple-500 rounded py-2 px-6 text-white hover:bg-purple-600" type="submit">{isLoading ? 'Updating...' : 'Update'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateNotes