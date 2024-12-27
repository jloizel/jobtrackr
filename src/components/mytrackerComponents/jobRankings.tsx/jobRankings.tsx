import React from 'react';
import { Job } from '@/app/mytracker/page';
import { MdLeaderboard } from "react-icons/md";
import styles from "./jobRankings.module.css"

type RankingsProps = {
  jobs: Job[];
};

const JobRankings: React.FC<RankingsProps> = ({ jobs }) => {
  // Count occurrences of each job title
  const titleCounts = jobs.reduce((acc: Record<string, number>, job) => {
    if (job.title) {
      acc[job.title] = (acc[job.title] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert the title counts object into an array of [title, count] pairs
  const sortedTitles = Object.entries(titleCounts).sort((a, b) => b[1] - a[1]);

  // Get the top 5 job titles
  const top5Titles = sortedTitles.slice(0, 5);

  // Filter for successful jobs
  const successfulJobs = jobs.filter(
    (job) => job.status === 'Interviewed' || job.status === 'Offered'
  );

  // Count occurrences of each successful job title
  const successfulTitleCounts = successfulJobs.reduce(
    (acc: Record<string, number>, job) => {
      if (job.title) {
        acc[job.title] = (acc[job.title] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  // Convert to array, sort, and get top 5
  const sortedSuccessfulTitles = Object.entries(successfulTitleCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const top5SuccessfulTitles = sortedSuccessfulTitles.slice(0, 5);

  return (
    <div>
      <h3>Top 5 Most Popular Job Titles</h3>
      <ul>
        {top5Titles.map(([title, count]) => (
          <li key={title}>
            {title}: {count} application(s)
          </li>
        ))}
      </ul>

      <h3>Top 5 Most Successful Job Titles</h3>
      <ul>
        {top5SuccessfulTitles.map(([title, count]) => (
          <li key={title}>
            {title}: {count} successful application(s)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRankings;
