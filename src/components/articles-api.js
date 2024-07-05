import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
export const fetchImages = async (topic) => {
    const res = await axios.get(`/search/photos?query=${topic}`);
    return res.data.hits;
};
