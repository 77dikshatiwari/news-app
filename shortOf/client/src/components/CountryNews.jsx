import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard.jsx';
import Loader from './Loader.jsx';

const CountryNews = () => {
    const params = useParams();
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(1)
    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handlePrev = () => {
        setPage(page - 1)
    }
    const handleNext = ( )=> {
        setPage(page + 1)
    }

    const pageSize = 6

    useEffect(()=>{
        setIsLoading(true);
        setError(null);
        fetch(`http://localhost:3000/api/v1/country/${params.iso}?page=${page}&pageSize=${pageSize}`)
        .then(response => {
            if(response.ok){
            setIsLoading(true)
                return response.json()
            }
            throw new Error('Something went wrong, there is network response error')
        })
        .then(myJsonData => {
            if(myJsonData.success){
                setTotalResults(myJsonData.data.totalResults)
                setData(myJsonData.data.articles)
                console.log(myJsonData.data.articles)
            } else{
                setError( myJsonData.message||'Something went wrong, there is network response error')
            }
        })
        .catch(error => {
            console.error(`Fetch Error: ${error}`)
            setError(`Failed to fetch news news. ${error.message}, Please try again later`)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [page, params.iso])

  return (
    <>
      {error && <div className='text-center text-red-500 mb-4'>{error}</div>}
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3'>
        {
            !isloading ? (
                data.length > 0 ? (
                data.map((element, index) => (
                <EverythingCard 
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                url={element.url}
                source={element.source.name}
                author={element.author}
                publishedAt={element.publishedAt}
                />
            )) 
                ): (
                    <p className='text-center mt-6'> No news articles found for this criteria. </p>
                )
                    ): ( <Loader />
        )}
      </div>
      {!isloading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={page <= 1}
            className="pagination-btn"
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="pagination-btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default CountryNews
