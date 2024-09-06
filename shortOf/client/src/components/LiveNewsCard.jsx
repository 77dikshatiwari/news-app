import React from 'react'

const LiveNewsCard = (props) => {
  return (
    <div className="live-news-card mt-10">
      <div className="live-news-card flex flex-wrap p-5 gap-1 mb-1">
        <b className="title">{props.title || "No Title"}</b>

        {props.image && (
          <div className="live-news-card-img mx-auto">
            <img
              className="live-news-card-img"
              src={props.image}
              alt="News"
            />
          </div>
        )}

        <div className="description">
          <p className="description-text leading-7">
            {props.description?.substring(0, 200) || "No Description"}
          </p>
        </div>

        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link underline break-words"
            >
              {props.url || "Unknown Source"}
            </a>
          </div>
          {/* <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {props.author || "Unknown"}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Read More:</span>
              {props.url || "Unknown URL"}
            </p>
          </div> */}
        </div>
      </div>

      {/* New Card Layout for Related Content */}
      {props.relatedImage && (
        <div className="flex lg:flex-row">
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{ backgroundImage: `url(${props.relatedImage})` }}
            title={props.relatedTitle || "No Title"}
          ></div>

          <div className="border rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center">
                {props.relatedIcon && (
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    {props.relatedIcon}
                  </svg>
                )}
                {props.relatedText}
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {props.relatedTitle || "Related News"}
              </div>
              <p className="text-gray-700 text-base">
                {props.relatedDescription || "Description"}
              </p>
            </div>

            <div className="flex items-center">
              {props.relatedAuthorImage && (
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={props.relatedAuthorImage}
                  alt="Avatar"
                />
              )}
              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {props.relatedAuthorName || "Author Name"}
                </p>
                <p className="text-gray-600">
                  {props.relatedPublishedDate || "Publish Date"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LiveNewsCard
