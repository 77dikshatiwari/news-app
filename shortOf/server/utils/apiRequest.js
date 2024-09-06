import axios from "axios";
const makeApiRequests = async (url) => {
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
        data: null,
    };
  }
}
export default makeApiRequests;

