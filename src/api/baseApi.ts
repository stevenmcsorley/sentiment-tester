import axios from "axios";

const baseURL = `${process.env.REACT_APP_STOCKNEWS_URL}`;

export default axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
  }
});