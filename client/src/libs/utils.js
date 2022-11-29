import axios from "./axios.js";
export const handleSubmit = async (userData) => {
  try {
    const res = await axios.post("/auth", userData);
    const { accessToken, refreshToken } = res.data;
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
