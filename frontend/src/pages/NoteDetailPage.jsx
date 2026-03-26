import { useEffect, useState } from "react"
import { useParams, Link } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Target, Trash2Icon } from "lucide-react";
import api from "../lib/axios";


const NoteDetailPage = () => {
  // handle Backend
  const [note, setNote]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
 
  const {id} = useParams()
  
  useEffect( () => {
    const fetchnote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data)
      } catch (error) {
          console.log("Error in fetching note", error)
          toast.error("Faile to fetch note!")
      }finally {
        setLoading(false)
      }
    };

    fetchnote();
  }, [id]);

  const handleDelete = () =>{

  };
  const handleSave = () => {

  };

  if (loading){
    return (
      <div className="min-h-screen flex bg-base-200 items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/> 
      </div>
    );
  }

  // UI-Design part
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost" >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input 
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={() => setNote({...note, title:e.target.value})}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea 
                  placeholder="write your note here ..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={() => setNote({...note, content:e.target.value})}
                />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage