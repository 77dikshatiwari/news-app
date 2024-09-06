import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllNews from './components/AllNews.jsx'
import TopHeadlines from './components/TopHeadlines.jsx'
import CountryNews from './components/CountryNews.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <BrowserRouter> */}
  <App />
  {/* <Routes>
    <Route path="/" element={<AllNews />} />
    <Route path="/top-headlines/:category" element={<TopHeadlines /> } />
    <Route path='/country/:iso' element={<CountryNews />} />
  </Routes> */}
  {/* </BrowserRouter> */}
    
  </StrictMode>,
)
