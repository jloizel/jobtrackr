import React from 'react';
import styles from './statistics.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { AxisConfig, ChartsXAxisProps } from '@mui/x-charts';
import CalendarComponent from '../calendar/calendar';
import JobRankings from '../jobRankings.tsx/jobRankings';
import { Job } from '@/app/my-tracker/page';

type StatisticsProps = {
  jobs: Job[];
};

const Statistics: React.FC<StatisticsProps> = ({ jobs }) => {
  const appliedJobs = (jobs.filter((job) => job.status === 'Applied')).length;
  const interviewedJobs = (jobs.filter((job) => job.status === 'Interviewed')).length;
  const offeredJobs = (jobs.filter((job) => job.status === 'Offered')).length;
  const rejectedJobs = (jobs.filter((job) => job.status === 'Rejected')).length;
  const totalJobs = appliedJobs + interviewedJobs + offeredJobs + rejectedJobs

  const labels = ['Total', 'Applied', 'Interviewed', 'Offered'];
  const values = [totalJobs, appliedJobs, interviewedJobs, offeredJobs];

  const responsiveness = Math.round(((interviewedJobs + offeredJobs + rejectedJobs) / totalJobs) * 100);
  const positiveResponses = Math.round(((interviewedJobs + offeredJobs) / totalJobs) * 100);
  const negativeResponses = Math.round((rejectedJobs / totalJobs) * 100);

  return (
    <div className={styles.statisticsWrapper}>
      <div className={styles.header}>Job Statistics</div>
      <div className={styles.topContainer}>
        <div className={styles.chartWrapper}>
          <div className={styles.chartHeader}>
            Search Chart
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartLabels}>
              {labels.map((label, index) => (
                <div key={index} className={styles.labelItem}>
                  <div className={styles.labelText}>{label}</div>
                  <div className={styles.labelValue}>{values[index]}</div>
                </div>
              ))}
            </div>
            <div className={styles.chart}>
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
        </div>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarHeader}>
            Activity Calendar
          </div>
           <CalendarComponent/>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.rankingsWrapper}>
          <div className={styles.rankingsHeader}>
            Role Metrics
          </div>
          <JobRankings jobs={jobs}/>
        </div>
        <div className={styles.responsesWrapper}>
          <div className={styles.responsivenessHeader}>
            Response Rate
          </div>
          <div className={styles.rateContainer}>
            <div className={styles.rate}>
              <span>{responsiveness}%</span>
              <span>of companies have got back to you</span>
            </div>
            <div className={styles.rate}>
              <span>{positiveResponses}%</span>
              <span>were a positive response</span>
            </div>
            <div className={styles.rate}>
              <span>{negativeResponses}%</span>
              <span>were a negative response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
