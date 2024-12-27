import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styles from './calendar.module.css';
import { getAllJobs, Job } from '../../../app/API';
import { isSameDay } from 'date-fns'; 

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [jobDates, setJobDates] = useState<string[]>([]);

  const fetchAndCalculateStreaks = async () => {
    try {
      const jobs = await getAllJobs();

      // parse and normalize dates
      const dates = jobs.map((job) => new Date(job.createdAt));
      const uniqueDates = new Set(
        dates.map((date) => date.toISOString().split('T')[0]) // normalize to YYYY-MM-DD
      );

      // extract and normalize job-related dates
      const jobCreatedOrUpdatedDates = jobs.flatMap((job) => [
        job.createdAt.split('T')[0], // created date in YYYY-MM-DD format
        job.updatedAt.split('T')[0], // updated date in YYYY-MM-DD format
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

    // Automatically select and focus today's date
    const today = new Date();
    setSelectedDate(today); // Update state
  }, []);

  const onClickDay = (value: Date) => {
    setSelectedDate(value);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const today = new Date();

    // Classes array to store multiple classes
    const classes = [];

    if (view === 'month') {
      // Add a class for today's date
      if (isSameDay(today, date) && (!selectedDate || isSameDay(selectedDate, today))) {
        classes.push(`${styles.todayClass}`);
      }

      // Add a class for job-related dates
      const dateString = date.toISOString().split('T')[0]; // Convert tile date to YYYY-MM-DD
      if (jobDates.includes(dateString)) {
        classes.push(`${styles.jobDateClass}`);
      }
    }

    // Return the combined class names as a single string
    return classes.length > 0 ? classes.join(' ') : null;
  };

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
      <div className={styles.detailsContainer}>
        {selectedDate ? (
          <div>
            <h3>Selected Date: {selectedDate.toDateString()}</h3>
          </div>
        ) : (
          <p>Please select a date to see details.</p>
        )}
        <div>
          <h3>Longest Application Streak: {longestStreak} days</h3>
          <h3>Current Application Streak: {currentStreak} days</h3>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
