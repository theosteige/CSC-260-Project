import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CodeReview from './CodeReview.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CodeReview />
  </StrictMode>,
)
