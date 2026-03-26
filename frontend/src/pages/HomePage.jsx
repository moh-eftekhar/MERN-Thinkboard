import NavBar from "../components/NavBar"
import RateLimiteUI  from "../components/RateLimiteUI"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"
import { use, useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../lib/axios"


const HomePage = () => {
  // isRateLimited is a state variable that can be used to determine if the user is currently rate limited. This can be set to true when the user exceeds the allowed number of requests in a given time period, and set back to false when the rate limit is lifted.
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([]) 
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        // console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false) 
      } catch (error) {
        console.error("Error fetching notes:", error)
        if (error.response && error.response.status === 429){
          setIsRateLimited(true)
        }
        else {
          toast.error("Failed to fetch notes. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    // cllassName="min-h-screen" ensures that the div takes up at least the full height of the viewport, which helps in making the footer stick to the bottom if there is not enough content on the page.
    <div className="min-h-screen"> 
      <NavBar/>

      {isRateLimited && <RateLimiteUI/>}

      {loading && <div className="text-center text-primary py-10">Loading Note...</div>}

      {notes.length === 0 && !isRateLimited && <NotesNotFound /> }

      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}

    </div>
  )
}

export default HomePage