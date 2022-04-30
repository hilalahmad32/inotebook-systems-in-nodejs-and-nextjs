import React, { useContext, useState } from 'react'
import { GlobalContext } from '../pages/contextapi/GlobalContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

const CreateNoteForm = () => {
  // use useRouter
  const router = useRouter()
  // get context api
  const { users } = useContext(GlobalContext)
  // state for notes
  const [notes, setNotes] = useState({
    title: '',
    description: '',
    user_id: '',
    bg_color: ''
  })

  // set isLoading
  const [isLoading, setIsLoading] = useState(false)

  // onchange the value
  const onChangeHandler = (e) => {
    // get the name of field
    const name = e.target.name;
    // get the value of field
    const value = e.target.value;

    // update the value for notes
    setNotes({ ...notes, [name]: value });
  }

  const createNotes = async (e) => {
    e.preventDefault();
    const { title, description, user_id, bg_color } = notes;
    const data = {
      title, description, user_id: users._id, bg_color
    }
    // post request to submit the notes
    setIsLoading(true)
    const res = await (await fetch('../api/notes/create-notes', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'Application/json'
      }
    })).json();
    if (res.success) {
      setIsLoading(false)
      toast(res.message, {
        type: 'success'
      });
      setNotes({
        title: '',
        description: '',
        user_id: '',
        bg_color: ''
      })
      router.push('/')
    }
    else {
      setIsLoading(false)
      toast(res.message, {
        type: 'error'
      });
    }
  }
  return (
    <div className="container mx-auto max-w-xl">
      <div className="shadow my-5 p-4">
        <h2 className="text-2xl text-center">Create Note</h2>
        <form action="" className="my-2" onSubmit={createNotes}>
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
            <select name="bg_color" onChange={onChangeHandler} select={notes.bg_color} className="rounded py-2 px-2 outline-purple-500 border w-full my-2">
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
          <button className="bg-purple-500 rounded py-2 px-6 text-white hover:bg-purple-600" type="submit">{isLoading ? 'Saveing...' : 'Save'}</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNoteForm