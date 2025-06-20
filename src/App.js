import React, { useEffect, useState } from "react";
import axios from "axios";
import RepoCard from "./components/RepoCard";
import RepoChart from "./components/RepoChart";
import LanguagePieChart from "./components/LanguagePieChart";

function App() {
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("stars");
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarkedRepos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchRepos();
  }, [sort]);

  const fetchRepos = async () => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=stars:%3E1000&sort=${sort}&order=desc&per_page=30`
    );
    setRepos(response.data.items);
  };

  const handleBookmark = (repo) => {
    const exists = bookmarks.find((r) => r.id === repo.id);
    const updated = exists
      ? bookmarks.filter((r) => r.id !== repo.id)
      : [...bookmarks, repo];

    setBookmarks(updated);
    localStorage.setItem("bookmarkedRepos", JSON.stringify(updated));
  };

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(query.toLowerCase()) &&
    (language === "" || repo.language === language)
  );

  const uniqueLanguages = [...new Set(repos.map(r => r.language).filter(Boolean))];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🔥 Trending GitHub Repositories</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          className="p-2 border rounded w-full md:w-1/3"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="p-2 border rounded w-full md:w-1/3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          {uniqueLanguages.map((lang, idx) => (
            <option key={idx} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded w-full md:w-1/3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="stars">Sort by Stars</option>
          <option value="updated">Sort by Last Updated</option>
        </select>
      </div>

      {/* Analytics Charts */}
      {filteredRepos.length > 0 && (
        <>
          <RepoChart repos={filteredRepos} />
          <LanguagePieChart repos={filteredRepos} />
        </>
      )}

      {/* Repo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            onBookmark={handleBookmark}
            isBookmarked={bookmarks.some((r) => r.id === repo.id)}
          />
        ))}
      </div>

      {/* Bookmarked Repositories */}
      {bookmarks.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">⭐ Bookmarked Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onBookmark={handleBookmark}
                isBookmarked={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
