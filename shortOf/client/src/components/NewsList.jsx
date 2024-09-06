import React from 'react'
import NewsCard from './NewsCard.jsx'

const NewsList = ({news}) => {
  return (
    <div className='news-list'>
    { news.map((article, index) => (
      <NewsCard 
        key={index}
        title= {article.title}
        description={article.description}
        imageUrl= {article.urlToImage}
        url= {article.url}
      />
   )) }
    </div>
  )
}

export default NewsList
