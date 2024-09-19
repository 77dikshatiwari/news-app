import React, { useEffect, useState } from "react";
import EverythingCard from "./EverythingCard.jsx";
import Loader from "./Loader.jsx";

const AllNews = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  let pageSize = 12;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(
      `https://news-app-nine-flax.vercel.app/api/v1/all-news?page=${page}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          // console.log(response);
          return response.json();
        }
        throw new Error(
          "Something went wrong, there is network response error"
        );
      })
      .then((myJsonData) => {
        if (myJsonData.success) {
          setTotalResults(myJsonData.data.totalResults);
          setData(myJsonData.data.articles);
          // console.log(myJsonData.data.articles);
        } else {
          setError("Something went wrong, there is network response error");
        }
      })
      .catch((error) => {
        // console.error(`Fetch Error: ${error}`);
        setError(
          `Failed to fetch news news. ${error.message ||"Unknown error occured"}, Please try again later`
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);
  return (
    <>
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {!isloading ? (
          data.map((element, index) => {
            return(
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
            )
          })
        ) : (
          <Loader />
        )}
      </div>
      {!isloading && data.length > 0 && (
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

export default AllNews;
