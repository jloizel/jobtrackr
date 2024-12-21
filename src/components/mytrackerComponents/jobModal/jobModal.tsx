import React, { FormEvent } from "react";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { Autocomplete } from "@/components/mytrackerComponents/autocomplete/autocomplete";
import styles from "./jobModal.module.css";

type JobModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  domain: string;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  salary: string;
  setSalary: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  postUrl: string;
  setPostUrl: React.Dispatch<React.SetStateAction<string>>;
};

export const JobModal: React.FC<JobModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  setTitle,
  company,
  setCompany,
  domain,
  setDomain,
  logoUrl,
  setLogoUrl,
  salary,
  setSalary,
  location,
  setLocation,
  postUrl,
  setPostUrl,
}) => {
  const handleCompanySelect = (data: { value: string; query?: { name: string; domain: string; icon: string } }) => {
    if (data.query) {
      setCompany(data.query.name);
      setDomain(data.query.domain);
      setLogoUrl(data.query.icon);
    }
  };

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onClose} disableScrollLock>
      <div className={styles.modalContent}>
        <form onSubmit={onSubmit}>
          <div className={styles.modalHeader}>
            Add Job
            <IoMdClose className={styles.closeIcon} onClick={onClose} />
          </div>
          <div className={styles.formContent}>
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
