"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./mycv.module.css";
import { useSession } from "next-auth/react";
import { FileData, getCVs, deleteCV, uploadCV } from "../API";
import { pdfjs } from "react-pdf";
import { Page, Document } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import ClipLoader from "react-spinners/ClipLoader";
import { ImBin } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { format, formatDistanceToNow } from "date-fns";
import { IoMdDownload } from "react-icons/io";
import UploadForm from "@/components/fileUploadForm/fileUploadForm";
import { useRouter } from "next/navigation";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyCVPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfPageCounts, setPdfPageCounts] = useState<Record<string, number>>({});
  const [pageNumber, setPageNumber] = useState(1);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [canUpload, setCanUpload] = useState(false);
  const [numFiles, setNumFiles] = useState(0);
  const [hoveredDownloadButton, setHoveredDownloadButton] = useState<string | null>(null);
  const maxFiles = 2;

  useEffect(() => {
    if (status === "loading") 
      return;
    if (!session) {
      router.push("/"); 
    }
  }, [session, status, router]);

  const fetchFiles = async () => {
    if (!session?.user?.email) return;
    setIsLoading(true);
    try {
      const fileData = await getCVs();
      setFiles(fileData);
      setNumFiles(fileData.length);
      setCanUpload(fileData.length < maxFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFiles();
  }, [session?.user?.email]);

  const calculateFileSize = (base64: string) => {
    const stringLength = base64.length - 'data:application/pdf;base64,'.length;
    const sizeInBytes = (stringLength * 3) / 4; 
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInKB / 1024;
  
    return sizeInMB >= 1
      ? `${sizeInMB.toFixed(2)} MB`
      : `${sizeInKB.toFixed(2)} KB`;
  };

  const handleDelete = async (fileId: string) => {
    if (!session?.user?.email) {
      alert("User email is not available!");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await deleteCV(fileId);
  
      const updatedFiles = files.filter((file) => file._id !== fileId);
      setFiles(updatedFiles);
      setCanUpload(updatedFiles.length < maxFiles);
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // update the page count for each file when the document is loaded
  const onDocumentSuccess = (pdf: any, fileName: string) => {
    setPdfPageCounts((prev) => ({
      ...prev,
      [fileName]: pdf.numPages,
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>My CV Files</div>
      {isLoading || status === "loading"? (
        <div className={styles.loaderContainer}>
          <ClipLoader color={"#00a6ff"}/>
        </div>
      ) : (
        <div className={`${styles.filesContainer} ${files.length === 1 ? styles.singleFile : ""}`}>
          <div className={styles.files}>
            {files.map((file, index) => (
              <div key={file._id} className={styles.file}>
                <div className={styles.fileDetails}>
                  <span>{file.fileName.endsWith(".pdf") ? file.fileName.slice(0, -4) : file.fileName}</span>
                  <span>PDF - {calculateFileSize(file.fileData)}</span>
                </div>

                {/* <p>Number of Pages: {pdfPageCounts[file.fileName] || "Loading..."}</p> */}
                <div className={styles.thumbnail}>
                  <a
                    href={`data:application/pdf;base64,${file.fileData}`}
                    download={file.fileName}
                  >
                    <Document
                      file={`data:application/pdf;base64,${file.fileData}`}
                      onLoadSuccess={(pdf) => onDocumentSuccess(pdf, file.fileName)}
                    >
                      <Page
                        pageNumber={pageNumber}
                        className={`${styles.pdfPage} ${
                          hoveredFile === file._id ? styles.hovered : ""
                        }`}
                        onMouseEnter={() => setHoveredFile(file._id)}
                        onMouseLeave={() => {
                          if (hoveredDownloadButton !== file._id) setHoveredFile(null);
                        }}
                        renderTextLayer={false}
                      />
                    </Document>
                  </a>

                  {hoveredFile === file._id || hoveredDownloadButton === file._id ? (
                    <IoMdDownload
                      className={styles.downloadButton}
                      onMouseEnter={() => setHoveredDownloadButton(file._id)}
                      onMouseLeave={() => setHoveredDownloadButton(null)}
                    />
                  ) : (
                    <div className={styles.pdfButton}>PDF</div>
                  )}
                </div>




                {/* {pdfPageCounts[file.fileName] > 1 && (
                  <div className={styles.navigationButtons}>
                    <IoIosArrowBack
                      onClick={pageNumber > 1 ? prevPage : undefined}
                      className={`${styles.icon} ${pageNumber <= 1 ? styles.disabled : ""}`}
                    />

                    <IoIosArrowForward
                      onClick={pageNumber < (pdfPageCounts[file.fileName] || 1) ? nextPage : undefined}
                      className={`${styles.icon} ${pageNumber >= (pdfPageCounts[file.fileName] || 1) ? styles.disabled : ""}`}
                    />
                  </div>
                )} */}

                <span className={styles.timestamp}>
                  uploaded {formatDistanceToNow(new Date(file.uploadDate), { addSuffix: true })}
                </span>
                <div className={styles.fileBottom}>
                  <span>CV {index + 1}</span>
                  <ImBin onClick={() => handleDelete(file._id)} className={styles.binIcon}/>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`${styles.formContainer} ${numFiles === 0 ? styles.emptyFormContainer : styles.notEmptyFormContainer}`}>
          {(!files.length || canUpload) && session?.user?.email &&
            <UploadForm 
              onFileUpload={fetchFiles} 
              uploadHandler={uploadCV}
              numFiles={numFiles}
            />}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCVPage;
