import express from 'express'; //I get the warning, so to fix it, I need to add "type": "module" in package.json file. This allows me to use ES6 module syntax in my Node.js application.   


import notesRouter from './routes/notesRoute.js'; // Import the notesRouter from the specified file path
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 5001;

// Middleware allow to access JSON bodies in incoming requests, must add before Routes
app.use(express.json());
app.use(rateLimiter);

//is a simple middleware function
// app.use((req, res, next) => {
//     console.log(`request received at method ${req.method} and the url is ${req.url}`);
//     next();
// })
app.use("/api/notes", notesRouter); //it is the prefix url for all the routes defined in notesRoute.js


connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is started on PORT ${PORT}`);
    });
});
