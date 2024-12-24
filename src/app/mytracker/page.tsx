"use client"

import { useEffect, useState, FormEvent, useRef } from 'react';
import styles from "./mytracker.module.css"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createJob, getAllJobs, updateJob } from '../API';
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
import { Autocomplete } from '@/components/mytrackerComponents/autocomplete/autocomplete';
import { GoQuestion } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { JobModal } from '@/components/mytrackerComponents/jobModal/jobModal';
import { UpdateModal } from '@/components/mytrackerComponents/updateModal/updateModal';
import RelativeTime from '@/components/mytrackerComponents/relativeTime/relativeTime';
import { DetailsModal } from '@/components/mytrackerComponents/detailsModal/detailsModal';
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';


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
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [domain, setDomain] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [jobStatus, setJobStatus] = useState('Applied');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [recentlyUpdated, setRecentlyUpdated] = useState(false);
  const [rejectedVisible, setRejectedVisible] = useState(false);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

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
    setJobModalOpen(true)
    setJobStatus(statusName)
  }
  
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
        postUrl,
        status: jobStatus,
      };
  
      const job = await createJob(jobData);
      const updatedJobs = await getAllJobs();
      setJobs(updatedJobs);

      setTitle('');
      setCompany('');
      setSalary('');
      setLocation('');
      setJobStatus('');
      setDomain('');
      setLogoUrl('');
      setPostUrl('');

      setJobModalOpen(false);
    } catch (error) {
      setMessage('Error creating job.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRejectedVisibility = () => {
    setRejectedVisible((prev) => !prev);
  };

  const handleEditClick = (job: Job) => {
    setSelectedJob(job);
    setUpdateModalOpen(true);
  };


  const handleUpdateJob = async (updatedJob: Job) => {
    setLoading(true);
    try {
      const { _id, ...jobData } = updatedJob; 
      await updateJob(_id, jobData);
      const updatedJobs = await getAllJobs(); 
      setJobs(updatedJobs);
    } catch (error) {
      setMessage('Error updating job.');
      console.error(error);
    } finally {
      setLoading(false);
      setUpdateModalOpen(false);
      setSelectedJob(null);
    }
  };

  const handleCardClick = (job: Job) => {
    setSelectedJob(job);
    setDetailsModalOpen(true)
  };

  const handleOptionsClick = (jobId: string) => {
    setShowOptions((prev) => (prev === jobId ? null : jobId));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(null); // close optionsContainer if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUpdateJobStatus = async (jobId: string, newStatus: string) => {
    setLoading(true);
  
    const updatedJobs = jobs.map((job) =>
      job._id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
  
    try {
      const jobToUpdate = jobs.find((job) => job._id === jobId);
      if (!jobToUpdate) throw new Error("Job not found");
      await updateJob(jobId, { ...jobToUpdate, status: newStatus });
  
      setMessage(`Job status updated to ${newStatus}.`);
    } catch (error) {
      setError("Failed to update job status.");
  
      // revert the UI change if API call fails
      const originalJobs = await getAllJobs();
      setJobs(originalJobs);
    } finally {
      setLoading(false);
      setShowOptions(null);
    }
  };
  
  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;
  
    // if dropped outside a droppable zone, do nothing
    if (!destination) return;
  
    // if dropped in the same column, do nothing
    if (source.droppableId === destination.droppableId) return;
  
    // get the job being dragged
    const jobId = draggableId;
    const newStatus = destination.droppableId;
  
    // update the job status
    await handleUpdateJobStatus(jobId, newStatus);
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

  function isRecentlyUpdated(createdAt: string | number | Date, updatedAt: string | number | Date): boolean {
    const createdTime = new Date(createdAt).getTime();
    const updatedTime = new Date(updatedAt).getTime();
  
    return updatedTime > createdTime; // if `updatedAt` is more recent than `createdAt`, it has been updated
  }

  if (status === 'authenticated') {
    return (
      <div className={styles.tracker}>
        <DragDropContext onDragEnd={onDragEnd}>
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
        
          <JobModal
            open={jobModalOpen}
            onClose={() => setJobModalOpen(false)}
            onSubmit={handleCreateJob}
            title={title}
            setTitle={setTitle}
            company={company}
            setCompany={setCompany}
            domain={domain}
            setDomain={setDomain}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            salary={salary}
            setSalary={setSalary}
            location={location}
            setLocation={setLocation}
            postUrl={postUrl}
            setPostUrl={setPostUrl}
          />

          <UpdateModal
            open={updateModalOpen}
            onClose={() => {
              setUpdateModalOpen(false);
              setSelectedJob(null);
            }}
            onSubmit={handleUpdateJob}
            title={title}
            setTitle={setTitle}
            company={company}
            setCompany={setCompany}
            domain={domain}
            setDomain={setDomain}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            salary={salary}
            setSalary={setSalary}
            location={location}
            setLocation={setLocation}
            postUrl={postUrl}
            setPostUrl={setPostUrl}
            job={selectedJob}
          />

          <DetailsModal
            open={detailsModalOpen}
            onClose={() => {
              setDetailsModalOpen(false);
              setSelectedJob(null);
            }}
            onSubmit={handleUpdateJob}
            createdAt={selectedJob?.createdAt}
            updatedAt={selectedJob?.updatedAt}
            title={title}
            setTitle={setTitle}
            company={company}
            setCompany={setCompany}
            domain={domain}
            setDomain={setDomain}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            salary={salary}
            setSalary={setSalary}
            location={location}
            setLocation={setLocation}
            postUrl={postUrl}
            setPostUrl={setPostUrl}
            job={selectedJob}
          />

          {/* {message && <p>{message}</p>} */}

          <div className={`${styles.jobsContainer} ${rejectedVisible ? styles.rejectedHidden : ""}`}>
            <button
              onClick={toggleRejectedVisibility}
              className={styles.toggleRejectedButton}
            >
              {rejectedVisible ? <BiSolidHide/> : <BiSolidShow/>}
            </button>
            {loading ? (
              <div className={styles.loading}>
                <ClipLoader color={"#00a6ff"} />
              </div>
            ) : (
              jobStatuses.map((status) => {
                const jobStatusNumber = jobs.filter((job) => job.status === status.name).length;

                if (status.name === "Rejected" && !rejectedVisible) {
                  return null; 
                }

                return (
                  <Droppable droppableId={status.name} key={status.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.jobColumn} ${
                          status.name === "Rejected" && !rejectedVisible ? styles.hidden : ""
                        }`}
                      >
                        <div className={styles.jobColumnHeader}>
                          <span style={{color: status.color}}>{renderIcon(status.icon)}</span>
                          <span>{status.name}</span>
                          <span>{jobStatusNumber} JOBS</span>
                        </div>
                        <div className={styles.button} onClick={() => handlePlusButtonClick(status.name)}>
                          <FaPlus/>
                        </div>
                        <div className={styles.jobs}>
                          {jobs
                            .filter((job) => job.status === status.name)
                            .map((job, index) => (
                              <Draggable key={job._id} draggableId={job._id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={styles.jobCard}
                                    onClick={() => handleCardClick(job)}
                                  >
                                    <div className={styles.line} style={{ border: `solid 1px ${status.color}` }}/>
                                    <div className={styles.jobCardContent}>
                                      <span className={styles.jobTitle}>{job.title}</span>
                                      <div className={styles.companyContainer}>
                                        {job.logoUrl ? (
                                          <img
                                            src={job.logoUrl}
                                            alt={`${job.company} logo`}
                                            className={styles.companyLogo}
                                          />
                                        ) : (
                                          <GoQuestion />
                                        )}
                                        <span className={styles.jobCompany}>{job.company}</span>
                                      </div>
                                      <div className={styles.jobCardInfo}>
                                        <div className={styles.date}>
                                          <RelativeTime date={job.updatedAt}/>
                                        </div>
                                        {isRecentlyUpdated(job.createdAt, job.updatedAt) ? (
                                          <RxUpdate className={styles.icon} />
                                        ) : (
                                          <IoIosAddCircleOutline className={styles.icon} />
                                        )}
                                      </div>
                                      <div className={styles.buttonsContainer}>
                                        <MdEdit 
                                          className={styles.editButton} 
                                          onClick={(event) => {
                                            event.stopPropagation(); // prevent triggering parent click
                                            handleEditClick(job);
                                          }}
                                        />
                                        <SlOptions
                                          className={styles.optionsButton} 
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            handleOptionsClick(job._id);
                                          }}
                                        />
                                        {showOptions === job._id && (
                                          <div className={styles.optionsContainer} ref={optionsRef}>
                                            {jobStatuses
                                            .filter((status) => status.name !== job.status)
                                            .map((status) => (
                                              <button 
                                                key={status.id} 
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  handleUpdateJobStatus(job._id, status.name);
                                                }}
                                                className={styles.optionButton}
                                              >
                                                <div className={styles.optionButtonContent}>
                                                  <span style={{color: status.color}}>{renderIcon(status.icon)}</span>
                                                  <span>{status.name}</span>
                                                </div>
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                );
              })
            )}
          </div>
        </DragDropContext>
      </div>
    );
  }

  return null;
};

export default MyTrackerPage;
