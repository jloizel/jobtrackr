import React from 'react';
import styles from './statistics.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { AxisConfig, ChartsXAxisProps } from '@mui/x-charts';

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
  const totalJobs = jobs.length

  const labels = ['Total', 'Applied', 'Interviewed', 'Offered'];
  const values = [totalJobs, appliedJobs, interviewedJobs, offeredJobs];


  return (
    <div className={styles.statisticsWrapper}>
      <div className={styles.header}>Job Statistics</div>
      <div className={styles.topContainer}>
        <div className={styles.chartWrapper}>
          <div className={styles.chartHeader}>
            Job Search Chart
          </div>
          <div className={styles.chartLabels}>
            {labels.map((label, index) => (
              <div key={index} className={styles.labelItem}>
                <div className={styles.labelText}>{label}</div>
                <div className={styles.labelValue}>{values[index]}</div>
              </div>
            ))}
          </div>
          <div className={styles.chartContainer}>
            <BarChart
              xAxis={[
                { 
                  scaleType: 'band', 
                  data: values, 
                  categoryGapRatio: 0.5,
                  disableLine: true, 
                  disableTicks: true,
                  position: "top",
                  id: "xAxis",
                  colorMap: {
                    type: "ordinal",
                    colors: ["#00a6ff", "#a963ff", "#FFC107", "#6eea8e"]
                  } 
                } as AxisConfig<'band', number, ChartsXAxisProps>,
              ]}
              yAxis={[
                { 
                  disableLine: true, 
                  disableTicks: true, 
                  data: labels,
                }
              ]}
              series={[{ data: values }]}
              // width={250}
              // height={300}
              borderRadius={4}
              tooltip={{trigger: "none"}}
              leftAxis={null}
              // topAxis={"xAxis"}
              topAxis={null}
              bottomAxis={null}
              axisHighlight={{x: "none"}}
              margin={{bottom: 0, left: 0, right: 0, top: 0}}
            />
          </div>
        </div>
        <div className={styles.calendarWrapper}>
           Calendar
        </div>
      </div>
    </div>
  );
};

export default Statistics;
