import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import NewsCard from './components/NewsCard'
// import HomePage from './pages/HomePage.jsx'
import Header from './components/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllNews from './components/AllNews.jsx'
import TopHeadlines from './components/TopHeadlines.jsx'
import CountryNews from './components/CountryNews.jsx'
import LiveNews from './components/LiveNews.jsx'

function App() {
  

  return (
    <div className='w-full'>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<AllNews />} />
        <Route path="/live-news" element={<LiveNews />} />
        <Route path="/top-headlines/:category" element={<TopHeadlines />} />
        <Route path='/country/:iso' element={<CountryNews />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
