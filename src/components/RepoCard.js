import React from "react";

const RepoCard = ({ repo, onBookmark, isBookmarked }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition relative">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-bold text-blue-600 hover:underline"
      >
        {repo.name}
      </a>
      <p className="text-sm text-gray-600 mb-2">{repo.description || "No description."}</p>
      <div className="text-xs text-gray-500 space-x-4">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🛠 {repo.language || "Unknown"}</span>
        <span>📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
      <button
        className={`absolute top-2 right-2 text-sm px-2 py-1 rounded ${
          isBookmarked ? "bg-yellow-400" : "bg-gray-200"
        }`}
        onClick={() => onBookmark(repo)}
      >
        {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
    </div>
  );
};

export default RepoCard; 