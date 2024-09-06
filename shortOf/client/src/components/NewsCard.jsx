import React from "react";

const NewsCard = ({ title, description, urlToImage, url }) => {
  return (
    <div className="news-card">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <img
            src={
              urlToImage ||
              "https://img.freepik.com/free-vector/top-headlines-news-themem-background_1017-14199.jpg?t=st=1725346305~exp=1725349905~hmac=72c16daad5f5b99e97027ba79b0de6dba803caa9aaa7ace75b0849dd9be3145e&w=900"
            }
            onError={(e) => {
              console.error('Failed to load image:', e.target.src);
              e.target.src = 'https://via.placeholder.com/300x200.png?text=Fallback+Image';
            }}
            alt=""
            className="news-image"
          />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <a
            href={url}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read More
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
