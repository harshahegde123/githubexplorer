import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RepoChart = ({ repos }) => {
  const topRepos = repos.slice(0, 10); // Just show top 10

  const data = {
    labels: topRepos.map((repo) => repo.name),
    datasets: [
      {
        label: "Stars",
        data: topRepos.map((repo) => repo.stargazers_count),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
      },
      {
        label: "Forks",
        data: topRepos.map((repo) => repo.forks_count),
        backgroundColor: "rgba(16, 185, 129, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <div className="my-10 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">📊 Repo Analytics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RepoChart; 