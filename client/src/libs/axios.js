import axios from "axios";
let mode = "prod";
const instatnce = axios.create({
  baseURL:
    mode === "dev"
      ? "http://localhost:8000/api"
      : "https://easy-blog-server.onrender.com/api",
});

export default instatnce;
