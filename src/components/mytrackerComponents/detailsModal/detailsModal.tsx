import React, { FormEvent, useEffect } from "react";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { Autocomplete } from "@/components/mytrackerComponents/autocomplete/autocomplete";
import styles from "./detailsModal.module.css";
import { Job } from "@/app/API";

type DetailsModalProps = {
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

export const DetailsModal: React.FC<DetailsModalProps> = ({
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
  }, [job, open, setTitle, setCompany, setDomain, setLogoUrl, setSalary, setLocation, setPostUrl]);


  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onClose} disableScrollLock>
      <div className={styles.modalContent}>
        
          <div className={styles.modalHeader}>
            <span className={styles.title}>{title}</span>
            <div className={styles.company}>
              <img src={logoUrl} alt={company} className={styles.companyLogo}/>
              <span>{company}</span>
            </div>
            
            <IoMdClose className={styles.closeIcon} onClick={onClose} />
          </div>
          <div className={styles.detailsContainer}>
            Details
          </div>
      </div>
    </Modal>
  );
};
