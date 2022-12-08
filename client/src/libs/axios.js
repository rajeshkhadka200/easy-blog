import axios from "axios";
let mode = "prod";
const instatnce = axios.create({
  baseURL:
    mode === "development"
      ? "http://localhost:8000/api"
      : import.meta.env.VITE_APP_HOST,
});

export default instatnce;
