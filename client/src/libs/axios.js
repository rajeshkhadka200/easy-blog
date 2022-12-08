import axios from "axios";
let mode = "prod";
const instatnce = axios.create({
  baseURL:
    mode === "development"
      ? "http://localhost:8000/api"
      : "https://easyblogproject.herokuapp.com/api",
});

export default instatnce;
