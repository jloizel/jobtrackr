"use client"

import { useEffect, useState, FormEvent } from 'react';
import styles from "./tracker.module.css"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createJob, getAllJobs } from '../API';
import { ClipLoader } from 'react-spinners';
import { PiBriefcaseBold } from "react-icons/pi";
import { IoIosStats } from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";


type Job = {
  _id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  status: string;
};

interface JobStatus {
  id: number;
  name: string;
  icon: string;
}

const jobStatuses: JobStatus[] = [
  {
    id: 1,
    name: "Applied",
    icon: "FaPaperPlane"
  },
  {
    id: 2,
    name: "Interviewed",
    icon: "MdEvent"
  },
  {
    id: 3,
    name: "Offered",
    icon: "FaHandshake"
  },
  {
    id: 4,
    name: "Rejected",
    icon: "FaTimes"
  },
]

const TrackerPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobStatus, setJobStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // Redirect to homepage if not authenticated
    } else if (status === 'authenticated') {
      const fetchJobs = async () => {
        setLoading(true);
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
    }
  }, [status, router]);

  const handleCreateJob = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      // Add the new job to the list
      setJobs((prevJobs) => [...prevJobs, job]);

      // Reset form
      setTitle('');
      setCompany('');
      setSalary('');
      setLocation('');
      setJobStatus('');
    } catch (error) {
      setMessage('Error creating job.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}><ClipLoader color={"#00a6ff"}/></div>;
  }

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "FaPaperPlane":
        return <FaPaperPlane />;
      case "MdEvent":
        return <MdEvent />;
      case "FaHandshake":
        return <FaHandshake />;
      case "FaTimes":
        return <FaTimes/>;
      default:
        return null;
    }
  };


  if (status === 'authenticated') {
    return (
      <div className={styles.tracker}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>My Job Tracker</div>
          <div className={styles.filter}>

          </div>
          <div className={styles.submenuContainer}>
            {/* <div className={styles.submenu}>
              <PiBriefcaseBold/>
              Tracker
            </div> */}
            <div className={styles.submenu}>
              <IoIosStats/>
              Statistics
            </div>
          </div>
        </div>
        

        {/* <form onSubmit={handleCreateJob}>
          <div>
            <div>Job Title</div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <div>Company</div>
            <input
              type="text"
              id="title"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        </form> */}

        {/* {message && <p>{message}</p>} */}

        {/* <div>
          {loading && <p>Loading jobs...</p>}
          {error && <p>{error}</p>}
          {!loading && jobs.length === 0 && <p>No jobs available.</p>}
          {!loading && jobs.length > 0 && (
            <div>
              {jobs.map((job) => (
                <li key={job._id}>
                  <h3>{job.title}</h3>
                  <p>Company: {job.company}</p>
                  <p>Location: {job.location}</p>
                  <p>Salary: {job.salary}</p>
                  <p>Status: {job.status}</p>
                </li>
              ))}
            </div>
          )}
        </div> */}
        <div className={styles.jobsContainer}>
          {jobStatuses.map((status) => {
            const jobStatusNumber = jobs.filter((job) => job.status === status.name).length;
            return (
              <div key={status.id} className={styles.jobColumn}>
                <div className={styles.jobColumnHeader}>
                  <span>{renderIcon(status.icon)} </span>
                  <span>{status.name}</span>
                  <span>{jobStatusNumber} JOBS</span>
                </div>
                <div className={styles.button}>
                  <FaPlus/>
                </div>
                <div>
                  {jobs
                    .filter((job) => job.status === status.name)
                    .map((job) => (
                      <div key={job._id} className={styles.jobCard}>
                        <h4>{job.title}</h4>
                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Salary: {job.salary}</p>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  return null;
};

export default TrackerPage;
