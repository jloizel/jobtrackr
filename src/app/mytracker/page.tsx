"use client"

import { useEffect, useState, FormEvent } from 'react';
import styles from "./tracker.module.css"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createJob, getAllJobs } from '../API';
import { ClipLoader } from 'react-spinners';
import { PiBriefcaseBold } from "react-icons/pi";
import { IoIosStats } from "react-icons/io";
import { FaPaperPlane, FaSyncAlt } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { Modal } from '@mui/material';
import { Autocomplete } from '@/components/autocomplete/autocomplete';
import { GoQuestion } from "react-icons/go";
import { MdEdit } from "react-icons/md";


type Job = {
  _id: string;
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface JobStatus {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const jobStatuses: JobStatus[] = [
  {
    id: 1,
    name: "Applied",
    icon: "FaPaperPlane",
    color: "#a963ff"
  },
  {
    id: 2,
    name: "Interviewed",
    icon: "MdEvent",
    color: "#FFC107"
  },
  {
    id: 3,
    name: "Offered",
    icon: "FaHandshake",
    color: "#34eb67"
  },
  {
    id: 4,
    name: "Rejected",
    icon: "FaTimes",
    color: "#fa5252"
  },
]

const MyTrackerPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobStatus, setJobStatus] = useState<string>('Applied');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false)

  const apiKey = process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // redirect to homepage if not authenticated
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

  const handlePlusButtonClick = (statusName: string) => {
    setModalOpen(true)
    setJobStatus(statusName)
  }

  const handleCompanySelect = (data: { value: string; query?: { name: string; domain: string; icon:string } }) => {
    if (data.query) {
      setCompany(data.query.name);
      setDomain(data.query.domain);
      setLogoUrl(data.query.icon)
      console.log(logoUrl)
    }
  };
  
  const handleCreateJob = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {  
      const jobData = {
        title,
        company,
        domain,
        logoUrl,
        salary,
        location,
        status: jobStatus,
      };
  
      const job = await createJob(jobData);
      setMessage('Job created successfully!');
  
      setJobs((prevJobs) => [...prevJobs, job]);
      setTitle('');
      setCompany('');
      setSalary('');
      setLocation('');
      setJobStatus('');
      setDomain('');
      setLogoUrl('');
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

  function getRelativeTime(date: string | number | Date): string {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime(); // difference in milliseconds
    const diffMinutes = Math.floor(diffMs / 60000); // difference in minutes
  
    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    }
  
    const diffHours = Math.floor(diffMinutes / 60); // difference in hours
    if (diffHours < 24) {
      return `${diffHours}h`;
    }
  
    const diffDays = Math.floor(diffHours / 24); // difference in days
    return `${diffDays}d`;
  }
  

  function isRecentlyUpdated(createdAt: string | number | Date, updatedAt: string | number | Date): boolean {
    const createdTime = new Date(createdAt).getTime();
    const updatedTime = new Date(updatedAt).getTime();
  
    return updatedTime > createdTime; // if `updatedAt` is more recent than `createdAt`, it has been updated
  }

  if (status === 'authenticated') {
    return (
      <div className={styles.tracker}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>My Job Tracker</div>
          <div className={styles.filter}>
            <IoIosSearch/>
            Filter
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
        
        <Modal open={modalOpen} className={styles.modalWrapper} onClose={() => setModalOpen(false)}>
          <div className={styles.modalContent}>
            <form onSubmit={handleCreateJob}>
              <div>
                <div>Job Title</div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <div>Company</div>
                <Autocomplete
                  onSubmit={handleCompanySelect}
                  placeholder="Search for a company"
                />
              </div>
              <div>
                <div>Salary</div>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div>
                <div>Location</div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </Modal>

        {/* {message && <p>{message}</p>} */}

        <div className={styles.jobsContainer}>
          {jobStatuses.map((status) => {
            const jobStatusNumber = jobs.filter((job) => job.status === status.name).length;
            return (
              <div key={status.id} className={styles.jobColumn}>
                <div className={styles.jobColumnHeader}>
                  <span style={{color: status.color}}>{renderIcon(status.icon)} </span>
                  <span>{status.name}</span>
                  <span>{jobStatusNumber} JOBS</span>
                </div>
                <div className={styles.button} onClick={() => handlePlusButtonClick(status.name)}>
                  <FaPlus/>
                </div>
                <div className={styles.jobs}>
                  {jobs
                    .filter((job) => job.status === status.name)
                    .map((job) => (
                      <div key={job._id} className={styles.jobCard}>
                        <div className={styles.line} style={{border: `solid 1px ${status.color}`}}></div>
                        <div className={styles.jobCardContent}>
                          <span className={styles.jobTitle}>{job.title}</span>
                          <div className={styles.companyContainer}>
                            {job.logoUrl ? (
                              <img
                              src={job.logoUrl}
                              alt={`${job.company} logo`}
                              className={styles.companyLogo}
                            />
                            ):(
                              <GoQuestion/>
                            )}
                            <span className={styles.jobCompany}>{job.company}</span>
                          </div>
                          <div className={styles.jobCardInfo}>
                            <div className={styles.date}>
                              {getRelativeTime(job.createdAt || job.updatedAt)}
                            </div>
                            {isRecentlyUpdated(job.createdAt, job.updatedAt) ? (
                              <RxUpdate className={styles.icon}/>
                            ):(
                              <IoIosAddCircleOutline className={styles.icon}/>
                            )}
                          </div>
                          <MdEdit className={styles.editButton}/>
                        </div>
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

export default MyTrackerPage;
