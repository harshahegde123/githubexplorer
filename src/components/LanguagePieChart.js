import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguagePieChart = ({ repos }) => {
  const languageCount = {};

  repos.forEach((repo) => {
    const lang = repo.language || "Unknown";
    languageCount[lang] = (languageCount[lang] || 0) + 1;
  });

  const data = {
    labels: Object.keys(languageCount),
    datasets: [
      {
        label: "Languages",
        data: Object.values(languageCount),
        backgroundColor: [
          "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
          "#8b5cf6", "#ec4899", "#22d3ee", "#f97316",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-10 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">🧁 Language Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default LanguagePieChart; 