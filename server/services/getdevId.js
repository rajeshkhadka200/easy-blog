import axios from "axios";
export const getIdBypath = async (link) => {
  const [username, slug] = link.split("/").slice(3);
  const url = `https://dev.to/api/articles/${username}/${slug}`;
  const res = await axios.get(url);
  const { id } = res.data;
  return id;
};
