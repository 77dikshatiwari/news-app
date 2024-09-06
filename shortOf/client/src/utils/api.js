const API_KEY = `ff325574bcea43eca6e482a95a57d2c2`;
const API_URL =`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`
export const fetchNews = async () => {
// const API_KEY = `pub_5254617680da32e742a89752e8b8521cec0bc`
// const API_URL =`https://newsdata.io/api/1/news?apikey=${API_KEY}`

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    console.log("newsData:",data);
    console.log("image", data.articles[0].urlToImage);
    return data.articles || [];
  } catch (error) {
    console.error(`Error fetching the news: ${error.message}`);
    return [];
  }
};
