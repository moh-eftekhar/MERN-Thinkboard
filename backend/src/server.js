import express from 'express'; //I get the warning, so to fix it, I need to add "type": "module" in package.json file. This allows me to use ES6 module syntax in my Node.js application.   


import notesRouter from './routes/notesRoute.js'; // Import the notesRouter from the specified file path
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 5001;
connectDB(); // Call the function to connect to the MongoDB database


app.use("/api/notes", notesRouter); //it is the prefix url for all the routes defined in notesRoute.js


app.listen(PORT, () => {
    console.log(`Server is started on PORT ${PORT}`);
}); 


// rMRLWNDiGeBh4B5p


// mongodb+srv://moeftekhari_db_user:rMRLWNDiGeBh4B5p@cluster0.8j3olm5.mongodb.net/?appName=Cluster0