import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styles from './calendar.module.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Mock data for job applications (replace with real data or API fetch)
const jobApplications: Record<string, number> = {
  '2023-12-24': 2,
  '2023-12-25': 1,
  '2023-12-26': 3,
  '2023-12-27': 1,
  '2023-12-29': 2,
};

const CalendarComponent = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [longestStreak, setLongestStreak] = useState<number>(0);

  // Helper to format a date to match keys in `jobApplications`
  const formatDateKey = (date: Date) => date.toISOString().split('T')[0]; // YYYY-MM-DD format

  // Calculate longest application streak
  useEffect(() => {
    const applicationDates = Object.keys(jobApplications)
      .map((date) => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime());

    let streak = 0;
    let maxStreak = 0;

    for (let i = 0; i < applicationDates.length; i++) {
      if (
        i > 0 &&
        (applicationDates[i].getTime() - applicationDates[i - 1].getTime()) ===
          24 * 60 * 60 * 1000 // Difference of 1 day
      ) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 1; // Reset streak if not consecutive
      }
    }

    setLongestStreak(maxStreak);
  }, []);

  const OnClickDay = (value: any) => {
    setSelectedDate(value)
    console.log(selectedDate)
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateKey = formatDateKey(date);
      if (jobApplications[dateKey]) {
        return styles.jobAppliedDate; 
      }
    }
    return null;
  };

  return (
    <div>
      <div className={styles.calendarContainer}>
        <Calendar
          onChange={setValue}
          value={value}
          prevLabel={<span style={{ fontSize: '20px' }}><IoIosArrowBack /></span>}
          nextLabel={<span style={{ fontSize: '20px' }}><IoIosArrowForward /></span>}
          onClickDay={(value) => {
            OnClickDay(value);
          }}
        />
      </div>
      <div className={styles.detailsContainer}>
        {selectedDate ? (
          <div>
            <h3>Selected Date: {selectedDate.toDateString()}</h3>
            <p>
              Number of Jobs Applied: {jobApplications[formatDateKey(selectedDate)] || 0}
            </p>
          </div>
        ) : (
          <p>Please select a date to see details.</p>
        )}
        <div>
          <h3>Longest Application Streak: {longestStreak} days</h3>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
