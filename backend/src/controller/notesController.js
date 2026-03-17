import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find(); // Fetch all notes from the database
        res.status(200).json(notes); // Send the fetched notes as a JSON response with a 200 status code
    } catch (error) {
        console.error("Error in getAllNotes controller:", error); 
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export async function createNote(req, res) {  //async-> it allows us to use await inside the function, which makes it easier to work with asynchronous operations like database queries.
    try {
        
        const { title, content} = req.body;
        const newNote = new Note ({title, content}); 
        await newNote.save(); // Save the new note to the database
        res.status(201).json({ message : "Note created successfully" });

    } catch (error) {
        console.error("Error in createNote controller:", error); 
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    res.status(200).json({ message : "Note updated successfully" });
}

export async function deleteNote(req, res) {  
    res.status(200).json({ message : "Note deleted successfully" });
}