import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
// Import the Toaster component from react-hot-toast to display toast notifications
import { Toaster } from 'react-hot-toast'  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the App component with BrowserRouter to enable routing */}
    <BrowserRouter> 
      <App />
      
      {/* Include the Toaster component to enable toast notifications in the application */}
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
