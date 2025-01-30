import React, { FormEvent, useEffect } from "react";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { Autocomplete } from "@/components/mytrackerComponents/autocomplete/autocomplete";
import styles from "./jobModal.module.css";
import { MdEvent } from "react-icons/md";
import { FaPaperPlane, FaHandshake, FaTimes } from "react-icons/fa";
import { jobStatuses } from "@/constants/jobStatuses";


type JobModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  salary: string;
  setSalary: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  postUrl: string;
  setPostUrl: React.Dispatch<React.SetStateAction<string>>;
  jobStatus: string;
};

const apiKey = process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY;

export const JobModal: React.FC<JobModalProps> = ({open, onClose, onSubmit, title, setTitle, setCompany, setLogoUrl, salary, setSalary, location, setLocation, postUrl, setPostUrl, jobStatus}) => {
  
  const handleCompanySelect = (data: { value: string; query?: { name: string; domain: string; icon: string } }) => {
    if (data.query) {
      setCompany(data.query.name);
      setLogoUrl(data.query.icon);
      // console.log(`https://cdn.brandfetch.io/${data.query.domain}?c=${apiKey}`)
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

  useEffect(() => {
    if (open) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
    return () => {
      document.body.classList.remove("noScroll");
    };
  }, [open]);  
  
  const getJobStatusDetails = (statusName: string | undefined) => {
    return jobStatuses.find((status) => status.name === statusName);
  };

  const jobStatusDetails = getJobStatusDetails(jobStatus);

  const resetForm = () => {
    setTitle("");
    setSalary("");
    setLocation("");
    setPostUrl("");
  }

  const handleModalClose = () => {
    onClose();
    resetForm();
  }

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={handleModalClose} disableScrollLock>
      <div className={styles.modalContent}>
        <form onSubmit={onSubmit}>
          <div className={styles.modalHeader}>
            Add Job
            <IoMdClose className={styles.closeIcon} onClick={handleModalClose} />
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
              <Autocomplete onSubmit={handleCompanySelect} placeholder="Search for a company" />
            </div>
            <div className={styles.formInput}>
              <span>Job Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                placeholder="Enter the job title"
                required
              />
            </div>
            <div className={styles.formInput}>
              <span>Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                placeholder="Enter the job location"
              />
            </div>
            <div className={styles.formInput}>
              <span>Salary</span>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className={styles.input}
                placeholder="Enter the job salary"
              />
            </div>
            <div className={styles.formInput}>
              <span>Post URL</span>
              <input
                type="text"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                className={styles.input}
                placeholder="Enter the job post URL"
              />
            </div>
          </div>
          <div className={styles.submitButtonContainer}>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
