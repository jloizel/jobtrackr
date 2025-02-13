"use client";

import React, { useEffect, useState } from "react";

const RelativeTime: React.FC<{ date: string | number | Date }> = ({ date }) => {
  const relativeTime = useRelativeTime(date);

  function useRelativeTime(date: string | number | Date): string {
    const [relativeTime, setRelativeTime] = useState<string>("");
  
    useEffect(() => {
      const getRelativeTime = (): string => {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now.getTime() - past.getTime();
  
        if (diffMs < 0) {
          // handle future dates
          return "Just now";
        }
  
        const diffMinutes = Math.floor(diffMs / 60000);
        if (diffMinutes < 60) {
          return `${diffMinutes}m`;
        }
  
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) {
          return `${diffHours}h`;
        }
  
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d`;
      };
  
      setRelativeTime(getRelativeTime());
  
      const interval = setInterval(() => {
        setRelativeTime(getRelativeTime());
      }, 60000);
  
      return () => clearInterval(interval);
    }, [date]);
  
    return typeof window === "undefined" ? "" : relativeTime;
  }
  
  return <span>{relativeTime}</span>;
};

export default RelativeTime;
