import { StrictMode } from 'react'
import ReactDOM from 'react-router-dom'
import './index.css'
import App from './App.jsx'

ReactDOM(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
