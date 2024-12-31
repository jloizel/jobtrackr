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

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyCVPage = () => {
  const { data: session } = useSession();
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfPageCounts, setPdfPageCounts] = useState<Record<string, number>>({});
  const [pageNumber, setPageNumber] = useState(1);
  const maxFiles = 2;

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
        <ClipLoader color={"#00a6ff"}/>
      ) : (
        <div className={styles.filesContainer}>
          <div className={styles.files}>
            {files.map((file) => (
              <div key={file.fileName} className={styles.file}>
                <a
                  href={`data:application/pdf;base64,${file.fileData}`}
                  download={file.fileName}
                >
                  Download {file.fileName}
                </a>

                {/* <p>Number of Pages: {pdfPageCounts[file.fileName] || "Loading..."}</p> */}
                <div className={styles.thumbnail}>
                  <Document
                    file={`data:application/pdf;base64,${file.fileData}`}
                    onLoadSuccess={(pdf) => onDocumentSuccess(pdf, file.fileName)}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                </div>

                {pdfPageCounts[file.fileName] > 1 && (
                  <div>
                    <button onClick={prevPage} disabled={pageNumber <= 1}>
                      Previous
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={pageNumber >= (pdfPageCounts[file.fileName] || 1)}
                    >
                      Next
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleDelete(file.fileName)}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {!canUpload && (
            <p>You can only upload up to {maxFiles} files.</p>
          )}
        </div>
      )}

      {canUpload && <CVUploadForm />}
    </div>
  );
};

export default MyCVPage;
