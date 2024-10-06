import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ActionsContextProvider from './context/ActionsContextProvider.jsx'
import SelectedSpriteContextProvider from './context/SelectedSpriteContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SelectedSpriteContextProvider>
    <ActionsContextProvider>
    
    <App />
    </ActionsContextProvider>
    </SelectedSpriteContextProvider>
    
   
  </StrictMode>,
)
