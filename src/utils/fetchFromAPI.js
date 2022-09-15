import axios from "axios";
import { BASE_URL, X_RAPID_API_KEY } from "../constants/constants";

const options = {
  url: BASE_URL,
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": X_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url, selectedCategory) => {
    const {data} = await axios.get(`${BASE_URL}/${url}`, {
        ...options,
        params: {
            ...options.params,
            q: selectedCategory,
            part: "snippet",
        },
    });
    return data;
};