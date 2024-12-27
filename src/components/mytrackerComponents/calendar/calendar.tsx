import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styles from './calendar.module.css';
import { getAllJobs, Job } from '../../../app/API';
import { isSameDay } from 'date-fns'; 

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [jobDates, setJobDates] = useState<string[]>([]);
  const [createdJobCount, setCreatedJobCount] = useState(0);
  const [jobs, setJobs] = useState<Job[]>([]);

  const onClickDay = (value: Date) => {
    setSelectedDate(value);
  };

  const fetchAndCalculateStreaks = async () => {
    try {
      const fetchedJobs = await getAllJobs();
      setJobs(fetchedJobs);

      // parse and normalize dates
      const dates = fetchedJobs.map((job) => new Date(job.createdAt));
      const uniqueDates = new Set(
        dates.map((date) => date.toISOString().split('T')[0]) // normalize to YYYY-MM-DD
      );

      // extract and normalize job-related dates
      const jobCreatedOrUpdatedDates = fetchedJobs.flatMap((job) => [
        job.createdAt.split('T')[0], // created date in YYYY-MM-DD format
        // job.updatedAt.split('T')[0], // updated date in YYYY-MM-DD format
      ]);
      setJobDates(jobCreatedOrUpdatedDates);

      // convert back to sorted date objects
      const sortedDates = Array.from(uniqueDates)
        .map((dateStr) => new Date(dateStr))
        .sort((a, b) => a.getTime() - b.getTime());

      // calculate longest streak
      let maxStreak = 0;
      let currentStreakCount = 1;

      for (let i = 1; i < sortedDates.length; i++) {
        const diff = (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          currentStreakCount++;
        } else {
          maxStreak = Math.max(maxStreak, currentStreakCount);
          currentStreakCount = 1;
        }
      }

      maxStreak = Math.max(maxStreak, currentStreakCount);

      // calculate current streak
      const today = new Date().toISOString().split('T')[0]; // today's date in YYYY-MM-DD
      let streak = 0;

      for (let i = sortedDates.length - 1; i >= 0; i--) {
        const diff = (new Date(today).getTime() - sortedDates[i].getTime()) / (1000 * 60 * 60 * 24);
        if (diff === streak) {
          streak++;
        } else {
          break;
        }
      }

      setLongestStreak(maxStreak);
      setCurrentStreak(streak);
    } catch (error) {
      console.error('Error fetching jobs or calculating streaks:', error);
    }
  };

  useEffect(() => {
    fetchAndCalculateStreaks();

    // automatically select and focus today's date
    const today = new Date();
    setSelectedDate(today); 
  }, []);

  const countJobsForDate = (date: Date) => {
    const selectedDateString = date.toISOString().split('T')[0]; 
    const createdCount = jobs.filter(
      (job) =>
        job.createdAt.startsWith(selectedDateString)
    ).length;
    setCreatedJobCount(createdCount);
  };

  useEffect(() => {
    countJobsForDate(selectedDate);
  }, [selectedDate]);


  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const today = new Date();
    const classes = [];

    if (view === 'month') {
      if (isSameDay(today, date) && (!selectedDate || isSameDay(selectedDate, today))) {
        classes.push(`${styles.todayClass}`);
      }

      const dateString = date.toISOString().split('T')[0]; // convert tile date to YYYY-MM-DD
      if (jobDates.includes(dateString)) {
        classes.push(`${styles.jobDateClass}`);
  
        // Add active class if this date is the selectedDate
        if (isSameDay(date, selectedDate)) {
          classes.push(`${styles.activeJobDateClass}`);
        }
      }
    }

    return classes.length > 0 ? classes.join(' ') : null;
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(selectedDate);


  return (
    <div>
      <div className={styles.calendarContainer}>
        <Calendar
          value={selectedDate}
          prevLabel={<span style={{ fontSize: '20px' }}><IoIosArrowBack /></span>}
          nextLabel={<span style={{ fontSize: '20px' }}><IoIosArrowForward /></span>}
          onClickDay={onClickDay}
          tileClassName={tileClassName}
        />
      </div>
      <div className={styles.date}>{selectedDate.toDateString()}</div>
      <div className={styles.detailsContainer}>
        <div className={styles.detail}>
          <span>{createdJobCount}</span>
          <span className={styles.text}>Job(s) applied to</span>
        </div>
        <div className={styles.streakDetails}>
          <div className={styles.detail}>
            <span>{currentStreak}</span>
            <span className={styles.text}>Current streak</span>
          </div>
          <div className={styles.detail}>
            <span>{longestStreak}</span>
            <span className={styles.text}>Longest streak</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
