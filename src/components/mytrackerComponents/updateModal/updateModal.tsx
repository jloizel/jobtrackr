import React, { FormEvent, useEffect } from "react";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { Autocomplete } from "@/components/mytrackerComponents/autocomplete/autocomplete";
import styles from "./updateModal.module.css";
import { Job } from "@/app/API";

type UpdateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedJob: Job) => Promise<void>;
  job: Job | null;
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

export const UpdateModal: React.FC<UpdateModalProps> = ({
  open,
  onClose,
  onSubmit,
  job,
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

  useEffect(() => {
    if (job && open) {
      setTitle(job.title);
      setCompany(job.company);
      setDomain(job.domain);
      setLogoUrl(job.logoUrl);
      setSalary(job.salary);
      setLocation(job.location);
      setPostUrl(job.postUrl);
    } else if (!open) {
      setTitle("");
      setCompany("");
      setDomain("");
      setLogoUrl("");
      setSalary("");
      setLocation("");
      setPostUrl("");
    }
  }, [open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (job) {
      const updatedJob: Job = {
        ...job,
        title,
        company,
        domain,
        logoUrl,
        salary,
        location,
        postUrl,
      };

      onSubmit(updatedJob);
    }
  };


  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onClose} disableScrollLock>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalHeader}>
            Update Job
            <IoMdClose className={styles.closeIcon} onClick={onClose} />
          </div>
          <div className={styles.formContent}>
            <div className={styles.formInput}>
              <span>Company</span>
              <Autocomplete
                onSubmit={(data) => {
                  if (data.query) {
                    setCompany(data.query.name);
                    setDomain(data.query.domain);
                    setLogoUrl(data.query.icon);
                  }
                }}
                placeholder="Search for a company"
                initialValue={{
                  name: job?.company || "", 
                  icon: job?.logoUrl || "",  
                  domain: job?.domain || ""   
                }}
              />
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
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
