import axios from "axios";

export const fetchTrendingRepos = async () => {
  const res = await axios.get(
    "https://api.github.com/search/repositories?q=stars:%3E1000&sort=stars&order=desc&per_page=20"
  );
  return res.data.items;
}; 