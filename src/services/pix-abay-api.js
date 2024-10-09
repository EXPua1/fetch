import axios from "axios";
const API_KEY = "44853221-20be0a035158c611166c29677";

axios.defaults.baseURL = "https://pixabay.com/api/";

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return response.data.hits;
};
