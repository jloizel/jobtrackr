"use client";

import React, { useEffect, useState } from "react";
import styles from "./mycv.module.css";
import { useSession } from "next-auth/react";
import { FileData, getCVs, deleteCV } from "../API";
import CVUploadForm from "@/components/cvUploadForm/cvUploadForm";
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


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyCVPage = () => {
  const { data: session } = useSession();
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfPageCounts, setPdfPageCounts] = useState<Record<string, number>>({});
  const [pageNumber, setPageNumber] = useState(1);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!session?.user?.email) return;
      setIsLoading(true);
      try {
        const fileData = await getCVs();
        setFiles(fileData);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };

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

  const handleDelete = async (fileName: string) => {
    if (!session?.user?.email) {
      alert("User email is not available!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await deleteCV(session.user.email, fileName);
      alert(response.message);

      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.fileName !== fileName)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    } finally {
      setIsLoading(false);
    }
  };

  const maxFiles = 2;
  const canUpload = files.length < maxFiles;

  // update the page count for each file when the document is loaded
  const onDocumentSuccess = (pdf: any, fileName: string) => {
    setPdfPageCounts((prev) => ({
      ...prev,
      [fileName]: pdf.numPages,
    }));
  };

  const prevPage = () => {
    setPageNumber(pageNumber <= 1 ? 1 : pageNumber - 1);
  };

  const nextPage = () => {
    setPageNumber(pageNumber >= Math.max(...Object.values(pdfPageCounts)) ? pageNumber : pageNumber + 1);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>My CV Files</div>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <ClipLoader color={"#00a6ff"}/>
        </div>
      ) : (
        <div className={`${styles.filesContainer} ${files.length === 1 ? styles.singleFile : ""}`}>
          <div className={styles.files}>
            {files.map((file, index) => (
              <div key={file.fileName} className={styles.file}>
                <div className={styles.fileDetails}>
                  <span>{file.fileName.endsWith(".pdf") ? file.fileName.slice(0, -4) : file.fileName}</span>
                  <span>PDF - {calculateFileSize(file.fileData)}</span>
                </div>

                {/* <p>Number of Pages: {pdfPageCounts[file.fileName] || "Loading..."}</p> */}
                <div
                  className={styles.thumbnail}
                  onMouseEnter={() => setHoveredFile(file.fileName)}
                  onMouseLeave={() => setHoveredFile(null)}
                >
                  <a 
                    href={`data:application/pdf;base64,${file.fileData}`}
                    download={file.fileName}
                  >
                    <Document
                      file={`data:application/pdf;base64,${file.fileData}`}
                      onLoadSuccess={(pdf) => onDocumentSuccess(pdf, file.fileName)}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                  </a>

                  <div className={`${styles.pdfButton} ${hoveredFile === file.fileName ? styles.hidden : ""}`}>
                    PDF
                  </div>

                  <IoMdDownload className={`${styles.downloadButton} ${hoveredFile === file.fileName ? styles.visible : ""}`}/> 
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
                  <ImBin onClick={() => handleDelete(file.fileName)} className={styles.binIcon}/>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.formContainer}>
            {canUpload && <CVUploadForm />}
          </div>
        </div>
      )}

    </div>
  );
};

export default MyCVPage;
