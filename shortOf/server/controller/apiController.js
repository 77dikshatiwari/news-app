import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.NEWS_API_KEY;
const liveApiKey = process.env.LIVE_NEWS_API_KEY;

const makeApiRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return {
        status: 200,
        success: true,
        message: "Data fetched successfully",
        data: response.data,
    };
  } catch (error) {
    console.error(" Api request Error:", error.response ? error.response.data : error); 
    return {
        status: error.response ? error.response.status : 500,
        success: false,
        message: "An error occurred while fetching data from the API",
        error: error.response ? error.response.data : error.message,
        results: null,
    };
  }
};


// get all the news by fetching the data from the API
const getAllNews = async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let checkNews = req.query.checkNews || "world"; // default news category query

    let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(checkNews)}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    const responseResult = await makeApiRequest(url);
    res.status(responseResult.status).json(responseResult);
};

//  get top headlines by fetching the data from the API
const getTopHeadlines = async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "general"; // default news category query

    let url = `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(category)}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    const responseResult = await makeApiRequest(url);
    res.status(responseResult.status).json(responseResult);
};

// get news by country by fetching the data from the API
const getNewsByCountry = async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let country = req.params.iso // default news country query

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    const responseResult = await makeApiRequest(url);
    res.status(responseResult.status).json(responseResult);
};

const getLiveNews = async (req, res) => {
  try {
    // Set default values for pageSize and page from query parameters or use defaults
    const pageSize = parseInt(req.query.pageSize) || 80;
    const page = parseInt(req.query.page) || 1;

    // Construct the base API URL
    const baseUrl = 'https://api.mediastack.com/v1/news';

    // Default query parameters
    const queryParams = {
      access_key: liveApiKey,
      keywords: req.query.keywords || 'tennis', // Allow dynamic keyword search
      countries: req.query.countries || 'us,gb', // Allow dynamic country selection
      languages: req.query.languages || 'en',
      limit: pageSize,
      offset: (page - 1) * pageSize, // Calculate offset based on page number
    };

    // Convert query parameters to a URL query string
    const queryString = new URLSearchParams(queryParams).toString();

    // Construct the final URL with query parameters
    const url = `${baseUrl}?${queryString}`;

    // Make the API request
    const responseResult = await makeApiRequest(url);

    // Respond with the result, handling status codes accordingly
    res.status(responseResult.status).json(responseResult);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      status: 500,
      message: 'An error occurred while fetching live news.',
      error: error.message,
    });
  }
};

export  default { getAllNews, getTopHeadlines, getNewsByCountry, getLiveNews };
