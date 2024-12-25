import React from 'react';
import styles from './statistics.module.css';
import { BarChart } from '@mui/x-charts/BarChart';

type Job = {
  _id: string;
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
  postUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type StatisticsProps = {
  jobs: Job[];
};

const Statistics: React.FC<StatisticsProps> = ({ jobs }) => {
  const appliedJobs = (jobs.filter((job) => job.status === 'Applied')).length;
  const interviewedJobs = (jobs.filter((job) => job.status === 'Interviewed')).length;
  const offeredJobs = (jobs.filter((job) => job.status === 'Offered')).length;
  const rejectedJobs = (jobs.filter((job) => job.status === 'Rejected')).length;



  return (
    <div className={styles.statisticsWrapper}>
      <div className={styles.header}>Job Statistics</div>
      <div>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'], disableLine: true, disableTicks: true }]}
          yAxis={[{ disableLine: true, disableTicks: true, }]}
          series={[{ data: [appliedJobs, interviewedJobs, offeredJobs] }]}
          width={250}
          height={300}
          borderRadius={4}
        />
      </div>
    </div>
  );
};

export default Statistics;
