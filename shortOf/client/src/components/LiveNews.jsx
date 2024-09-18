import React, {useState, useEffect, Component} from 'react'
import LiveNewsCard from './LiveNewsCard.jsx'
import Loader from './Loader.jsx'


const LiveNews = () => {
        const [data, setData] = useState([]);
        const [page, setPage] = useState(1);
        const [totalResults, setTotalResults] = useState(0);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
      
        const handlePrev = () => {
          setPage(page - 1);
        };
      
        const handleNext = () => {
          setPage(page + 1);
        };
      
        let pageSize = 12;
      
        useEffect(() => {
            console.log("fetching data.....");
          setIsLoading(true);
          setError(null);
          fetch(
            `https://news-app-nine-flax.vercel.app/api/v1/live-news?page=${page}&pageSize=${pageSize}`
          )
            .then((response) => {
              if (response.ok) {
                                // console.log("response",response.json());
                return response.json();
                // console.log("response",response);
              }
              throw new Error(
                "Something went wrong, there is a network response error"
              );
            })
            .then((myJsonData) => {
                console.log("fetched data",myJsonData);
              if (myJsonData.success) {
                const paginationTotal = myJsonData.data.pagination ? myJsonData.data.pagination.total : 0;
                setTotalResults(paginationTotal);
                console.log("pagination:",paginationTotal)
                setData(myJsonData.data);
                console.log("fetched dataset",myJsonData.data);
                console.log("state data", data);
              } else {
                setError("Something went wrong, there is a network response error");
              }
            })
            .catch((error) => {
              console.error(`Fetch Error: ${error}`);
              setError(
                `Failed to fetch live news. ${error.message || "Unknown error occurred"}, please try again later.`
              );
            })
            .finally(() => {
              setIsLoading(false);
              console.log("Data fetched successfully");
            });
        }, [page]);
        console.log("Component data",data);
      
        return (
          <>
            {error && <div className="text-center text-red-500 mb-4">{error}</div>}
            <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
              {/* console.log("rendering data",data); */}
              {!isLoading ? (
                Array.isArray(data.data) && (data.data).length > 0 ? (
                (data.data).map((element, index) => {
                    {/* console.log("rendering element",element); */}
                  return (
                    <LiveNewsCard
                      key={index}
                      title={element.title}
                      description={element.description}
                      image={element.image} // Update to use 'image' prop
                      url={element.url}
                      source={element.source} // Ensure this is correctly mapped
                      author={element.author}
                      publishedAt={element.published_at} // Ensure this field matches your data
                      relatedImage={element.related_image} // Optional: for related content
                      relatedTitle={element.related_title} // Optional: for related content
                      relatedDescription={element.related_description} // Optional: for related content
                    />
                  );
                })
                ):(
                    <p className="text-center text-red-500 mt-6">No Live news available</p>)
              
              ) : (
                <Loader />
              )}
            </div>
            {!isLoading && (data.data).length > 0 && (
              <div className="pagination flex justify-center gap-14 my-10 items-center">
                <button
                  disabled={page <= 1}
                  className="pagination-btn text-center"
                  onClick={handlePrev}
                >
                  &larr; Prev
                </button>
                <p className="font-semibold opacity-80">
                  {page} of {Math.ceil(totalResults / pageSize)}
                </p>
                <button
                  className="pagination-btn text-center"
                  disabled={page >= Math.ceil(totalResults / pageSize)}
                  onClick={handleNext}
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        );
      };

export default LiveNews
