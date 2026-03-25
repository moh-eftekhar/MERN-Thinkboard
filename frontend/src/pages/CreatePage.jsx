import { ArrowLeft } from "lucide-react";
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import axios from "axios";


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required!");
      return;
    }
    
    setLoading(true)
    try {
      await axios.post("http://localhost:5001/api/notes", {
         title, content 
      });
      toast.success("Note created successfully!");
      Navigate("/") // navigate to home page after successful creation

    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note. Please try again.");
    }finally {
      setLoading(false)
    }

  };

  // this part is about the UI of the create page
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="btn btn-ghost mb-6 mt-6">
          <ArrowLeft className="size-5"/>
          Back to Home
        </Link>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label"> 
                  <span className="label-text">Title</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label"> 
                  <span className="label-text">Content</span>
                </label>
                <textarea 
                  placeholder="Write your note content here..."
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreatePage