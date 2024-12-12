"use client"

import React, { useEffect, useState } from 'react';
import { createJob, getAllJobs, Job } from '../API';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TrackrPage = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCreateJob = async (e: React.FormEvent) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    e.preventDefault();
    setLoading(true); 

    if (status === 'unauthenticated') {
      router.push('/'); // redirect to homepage if unauthenticated
      return <p>Access Denied</p>;
    }

    const jobData = {
      title,
      company,
      salary,
      location,
      status,
    };

    try {
      const job = await createJob(jobData);

      setMessage('Job created successfully!');
      setLoading(false); 

      // Reset form after submission
      setTitle('');
      setCompany('');
      setSalary('');
      setLocation('');
      setStatus('');
    } catch (error) {
      setMessage('Error creating job.');
      setLoading(false); 
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userJobs = await getAllJobs(); 
        setJobs(userJobs); 
      } catch (err) {
        setError('Failed to fetch jobs.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div>
      <h1>Create a Job</h1>

      <form onSubmit={handleCreateJob}>
        <div>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Job...' : 'Create Job'}
        </button>
      </form>

      {message && <p>{message}</p>}

      <div>
      <h1>Your Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.salary}</p>
              <p>Status: {job.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default TrackrPage;
