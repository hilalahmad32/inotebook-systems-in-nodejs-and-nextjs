import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const AllNotes = () => {
    const [notes, setNotes] = useState([])
    // use loading
    const [isLoading, setIsLoading] = useState(false)

    // get notes by user id
    const getNotes = async () => {
        setIsLoading(true)
        const res = await (await fetch('../api/notes/get-notes')).json();
        if (res.success) {
            setIsLoading(false)
            setNotes(res.notes)

        }
    }
    // clone of a Notes
    const cloneNotes = async (id) => {
        const res = await (await fetch(`../api/notes/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        if (res.success) {
            alert(res.message);
            getNotes();
        } else {
            alert(res.message)
        }
    }

    // delete notes 
    const deleteNotes = async (id) => {
        const res = await (await fetch(`../api/notes/${id}`, {
            method: 'DELETE'
        })).json();
        if (res.success) {
            alert(res.message);
            getNotes();
        } else {
            alert(res.message)
        }
    }
    useEffect(() => {
        getNotes()

    }, [])
    return (
        <div>
            <div className="container mx-auto my-4 mb-8">
                <h1 className="text-center font-bold text-3xl text-purple-700 my-6">
                    Your All Notes ( {notes.length > 0 ? notes.length : 0} )
                </h1>
                {/* check if notes is add or not */}
                {notes.length == 0 && <div className="text-center font-semibold my-3 text-xl">Note not found</div>}
                {isLoading && <div className="my-4 text-center text-2xl">loading.....</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-3">
                    {!isLoading && notes && notes.map((val) => {
                        return (
                            <div key={val._id}>
                                <div className={`shadow p-4 md:mx-0 mx-4 
                                ${val.bg_color === 1 ? 'bg-black text-white' :
                                        val.bg_color === 2 ? 'bg-green-500 text-white' :
                                            val.bg_color === 3 ? 'bg-yellow-500 text-white' :
                                                val.bg_color === 4 ? 'bg-pink-500 text-white' :
                                                    val.bg_color === 5 ? 'bg-purple-500 text-white' :
                                                        val.bg_color === 6 ? 'bg-blue-500 text-white' :
                                                            val.bg_color === 7 ? 'bg-red-500 text-white' : 'bg-white text-black'}  rounded-md mt-2 `}>
                                    <h2 className="text-xl font-bold">{val.title}</h2>
                                    <p className="text-md my-2">
                                        {val.description}
                                    </p>
                                    <Link href={`/update-notes/${val._id}`}>
                                        <button className="bg-blue-500 rounded py-2 px-6 text-white hover:bg-blue-600 text-sm">Edit</button>
                                    </Link>
                                    <button className="bg-red-700 rounded py-2 px-6 text-white hover:bg-red-800 text-sm ml-3" onClick={() => { deleteNotes(val._id) }}>Delete</button>
                                    <button onClick={() => { cloneNotes(val._id) }} className="bg-green-700 rounded py-2 px-6 text-white hover:bg-green-800 text-sm ml-3">Clone</button>
                                </div>
                            </div>

                        )
                    })}

                </div>

                <div className="flex justify-between my-5">
                    <button className="bg-red-700 rounded py-2 px-6 text-white hover:bg-red-800 text-sm ml-3">Prev</button>
                    <button className="bg-green-700 rounded py-2 px-6 text-white hover:bg-green-800 text-sm ml-3">Next</button>
                </div>
            </div >
        </div >
    )
}

export default AllNotes