import React, { FormEvent, useEffect } from "react";
import { Modal } from "@mui/material";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { Autocomplete } from "@/components/mytrackerComponents/autocomplete/autocomplete";
import styles from "./detailsModal.module.css";
import { Job } from "@/app/API";
import { MdOpenInNew } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { FaClipboard } from "react-icons/fa";
import RelativeTime from "../relativeTime/relativeTime";
import { RxUpdate } from "react-icons/rx";


type DetailsModalProps = {
  open: boolean;
  onClose: () => void;
  job: Job | null;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  salary: string;
  setSalary: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  postUrl: string;
  setPostUrl: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteJob: (jobId: string) => void
};

export const DetailsModal: React.FC<DetailsModalProps> = ({open, onClose, job, createdAt, updatedAt, title, setTitle, company, setCompany, logoUrl, setLogoUrl, salary, setSalary, location, setLocation, postUrl, setPostUrl}) => {

  useEffect(() => {
    if (job && open) {
      setTitle(job.title);
      setCompany(job.company);
      setLogoUrl(job.logoUrl);
      setSalary(job.salary);
      setLocation(job.location);
      setPostUrl(job.postUrl);
    } else if (!open) {
      setTitle("");
      setCompany("");
      setLogoUrl("");
      setSalary("");
      setLocation("");
      setPostUrl("");
    }
  }, [job, open]);

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

  function isRecentlyUpdated(createdAt: string | number | Date | undefined, updatedAt: string | number | Date | undefined): boolean {
    if (!createdAt || !updatedAt) return false; 

    const createdTime = new Date(createdAt).getTime();
    const updatedTime = new Date(updatedAt).getTime();
  
    return updatedTime > createdTime;
  }

  const calculateDaysAgo = (updatedAt: string | undefined) => {
    if (!updatedAt) return null;

    const updatedDate = new Date(updatedAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - updatedDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  };  

  const daysAgo = calculateDaysAgo(updatedAt);


  return (
    <Modal open={open} className={styles.modalWrapper} onClose={onClose} disableScrollLock>
      <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <span className={styles.title}>{title}</span>
            <div className={styles.bottomContainer}>
              <div className={styles.company}>
                <img src={logoUrl} alt={company} className={styles.companyLogo}/>
                <span>{company}</span>
              </div>
              {updatedAt && createdAt ? (
                <div className={styles.dateContainer}>
                  {isRecentlyUpdated(createdAt, updatedAt) ? (
                    <div>
                      <RxUpdate className={styles.dateIcon} />
                      Updated
                    </div>
                  ) : (
                    <div>
                      <IoIosAddCircleOutline className={styles.dateIcon} />
                      Added
                    </div>
                  )}
                  <div className={styles.date}>
                    {daysAgo} days ago
                  </div>
                </div>
              ):(
                ""
              )}
            </div>
            <IoMdClose className={styles.closeIcon} onClick={onClose} />
          </div>
          <div className={styles.detailsWrapper}>
            {salary && (
              <div className={styles.detailContainer}>
                <span className={styles.detailHeader}>
                  <GiMoneyStack className={styles.icon}/>
                  Salary
                </span>
                <span className={styles.detail}>£{salary}</span>
              </div>
            )}
            {location && (
              <div className={styles.detailContainer}>
                <span className={styles.detailHeader}>
                  <FaLocationDot className={styles.icon}/>
                  Location
                </span>
                <span className={styles.detail}>{location}</span>
              </div>
            )}
            <div className={styles.detailContainer}>
              <span className={styles.detailHeader}>
                <FaClipboard className={styles.icon}/>
                Job Post
              </span>
              <a href={postUrl} target="_blank" className={styles.linkIcon}>
                <MdOpenInNew/>
              </a>
            </div>
          </div>
      </div>
    </Modal>
  );
};
