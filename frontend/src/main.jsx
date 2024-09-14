import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import ContextProvider from './components/context/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
     <BrowserRouter>
      <App />
     </BrowserRouter>
    </ContextProvider>
  </StrictMode>
)
