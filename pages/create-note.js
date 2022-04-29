import React, { useEffect } from 'react'
import CreateNoteForm from '../components/CreateNoteForm'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'

const CreateNote = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            router.push('/signin')
        }
    }, [])
    return (
        <div>
            <Navbar />
            <CreateNoteForm />
        </div>
    )
}

export default CreateNote