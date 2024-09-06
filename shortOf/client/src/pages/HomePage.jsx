import React, {useState, useEffect} from 'react'
import Header from '../components/Header.jsx';
import { fetchNews } from '../utils/api.js';
import NewsList from '../components/NewsList.jsx';

const HomePage = () => {
    const [news, setNews] = useState([])
    useEffect(()=>{
        const getNews = async () => {
            const fetchedNews = await fetchNews();
            setNews(fetchedNews) 
        };
        getNews();
    }, [])
  return (
    <div>
      <Header />
        <NewsList news={news} />
    </div>
  )
}

export default HomePage
