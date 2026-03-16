import mongoose from "mongoose";

// 1- fist create a schema for the note
// 2- then create a model using that schema

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
},
{timestamps:true} //createAT UpdatedAT
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
