import React, { FormEvent, useEffect } from "react";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { Autocomplete } from "@/components/mytrackerComponents/autocomplete/autocomplete";
import styles from "./updateModal.module.css";
import { Job } from "@/app/API";
import { ImBin } from "react-icons/im";
import { MdEvent } from "react-icons/md";
import { FaPaperPlane, FaHandshake, FaTimes } from "react-icons/fa";
import { jobStatuses } from "@/constants/jobStatuses";

type UpdateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedJob: Job) => Promise<void>;
  job: Job | null;
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
  postUrl: string;
  handleDeleteJob: (jobId: string) => void
};

export const UpdateModal: React.FC<UpdateModalProps> = ({
  open,
  onClose,
  onSubmit,
  job,
  title,
  salary,
  location,
  postUrl,
  handleDeleteJob
}) => {
  const [formData, setFormData] = React.useState({
    title: "",
    company: "",
    domain: "",
    logoUrl: "",
    salary: "",
    location: "",
    postUrl: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        company: job.company,
        domain: job.domain,
        logoUrl: job.logoUrl,
        salary: job.salary,
        location: job.location,
        postUrl: job.postUrl,
      });
    }
  }, [open, job]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  
    if (job) {
      const updatedJob: Job = {
        ...job,
        ...formData,
      };
  
      onSubmit(updatedJob);
    }
  };

  const handleDeleteClick = () => {
    if (job && confirm('Are you sure you want to delete this job?')) {
      handleDeleteJob(job._id);
    }
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "FaPaperPlane":
        return <FaPaperPlane className={styles.statusIcon}/>;
      case "MdEvent":
        return <MdEvent className={styles.statusIcon}/>;
      case "FaHandshake":
        return <FaHandshake className={styles.statusIcon}/>;
      case "FaTimes":
        return <FaTimes className={styles.statusIcon}/>;
      default:
        return null;
    }
  };
  
  const getJobStatusDetails = (statusName: string | undefined) => {
    return jobStatuses.find((status) => status.name === statusName);
  };

  const jobStatusDetails = getJobStatusDetails(job?.status);

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onClose} disableScrollLock key={job?._id || "default"}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalHeader}>
            <IoMdClose className={styles.closeIcon} onClick={onClose} />
            Update Job
            <ImBin className={styles.binIcon} onClick={handleDeleteClick} />
          </div>
          <div className={styles.formContent}>
            {jobStatusDetails && (
              <div style={{ color: jobStatusDetails.color }} className={styles.jobStatus}>
                {renderIcon(jobStatusDetails.icon)}
                <span>{jobStatusDetails.name}</span>
              </div>
            )}
            <div className={styles.formInput}>
              <span>Company</span>
              <Autocomplete
                onSubmit={(data) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    company: data.query?.name || "",  
                    domain: data.query?.domain || "",  
                    logoUrl: data.query?.icon || "", 
                  }));
                }}
                placeholder="Search for a company"
                initialValue={{
                  name: formData.company,
                  icon: formData.logoUrl,
                  domain: formData.domain,
                }}
              />
            </div>
            <div className={styles.formInput}>
              <span>Job Title</span>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={styles.input}
                placeholder={title}
              />
            </div>
            <div className={styles.formInput}>
              <span>Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={styles.input}
                placeholder="Enter the job location"
              />
            </div>
            <div className={styles.formInput}>
              <span>Salary</span>
              <input
                type="text"
                value={salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                className={styles.input}
                placeholder="Enter the job salary"
              />
            </div>
            <div className={styles.formInput}>
              <span>Post URL</span>
              <input
                type="text"
                value={postUrl}
                onChange={(e) => handleInputChange("postUrl", e.target.value)}
                className={styles.input}
                placeholder="Enter the job post URL"
              />
            </div>
          </div>
          <div className={styles.submitButtonContainer}>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
