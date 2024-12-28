import React from 'react';
import { Job } from '@/app/mytracker/page';
import { MdLeaderboard } from "react-icons/md";
import styles from "./jobRankings.module.css"

type RankingsProps = {
  jobs: Job[];
};

const JobRankings: React.FC<RankingsProps> = ({ jobs }) => {

  // get count of each job title
  const titleCounts = jobs.reduce((acc: Record<string, number>, job) => {
    if (job.title) {
      acc[job.title] = (acc[job.title] || 0) + 1;
    }
    return acc;
  }, {});

  // convert title counts object into an array of [title, count] pairs
  const sortedTitles = Object.entries(titleCounts).sort((a, b) => b[1] - a[1]);
  const top5Titles = sortedTitles.slice(0, 5);

  // filter for successful jobs
  const successfulJobs = jobs.filter(
    (job) => job.status === 'Interviewed' || job.status === 'Offered'
  );

  // count occurrences of each successful job title
  const successfulTitleCounts = successfulJobs.reduce(
    (acc: Record<string, number>, job) => {
      if (job.title) {
        acc[job.title] = (acc[job.title] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  // convert to array, sort, and get top 5
  const sortedSuccessfulTitles = Object.entries(successfulTitleCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const top5SuccessfulTitles = sortedSuccessfulTitles.slice(0, 5);

  return (
    <div className={styles.rankingsContainer}>
      <div className={styles.ranking}>
        <div className={styles.header}>Your most popular jobs</div>
        {top5Titles.map(([title, count], index) => (
          <div className={styles.result} key={`popular-${title}-${index}`}>
            <span className={styles.title}>{index + 1}. {title} - </span>
            <div className={styles.countInfo}>
              <span>{count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ranking}>
        <div className={styles.header}>
          Your most successful jobs
          <span>&#40;interviewed or offered&#41;</span>
        </div>
        {top5SuccessfulTitles.map(([title, count], index) => (
          <div className={styles.result} key={`successful-${title}-${index}`}>
            <span className={styles.title}>{index + 1}. {title} - </span>
            <div className={styles.countInfo}>
              <span>{count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRankings;
