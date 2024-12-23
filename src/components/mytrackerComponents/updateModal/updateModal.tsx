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
  }, [open]);

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

  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onClose} disableScrollLock key={job?._id || "default"}>
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
