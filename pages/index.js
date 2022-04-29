import { useEffect } from "react";
import AllNotes from "../components/AllNotes";
import Navbar from "../components/Navbar";
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/signin')
    } else {
      router.push('/')
    }
  }, [])
  return (
    <div >
      <Navbar />
      <AllNotes />
    </div>
  )
}
