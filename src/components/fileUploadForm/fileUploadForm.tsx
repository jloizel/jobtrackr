"use client";

import React, { useState } from "react";
import styles from "./fileUploadForm.module.css";
import { FaCirclePlus } from "react-icons/fa6";
import { FileUploader } from "react-drag-drop-files";

interface UploadFormProps {
  onFileUpload: () => void;
  uploadHandler: (file: File) => Promise<{ message: string }>;
  numFiles: number;
}

const UploadForm: React.FC<UploadFormProps> = ({ onFileUpload, uploadHandler, numFiles }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await uploadHandler(selectedFile);
      onFileUpload(); // update the files list
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  }

  return (
    <div className={`${styles.form} ${numFiles === 0 ? styles.emptyForm : ""}`}>
      <div
        className={`${styles.dragDropContainer} ${hovered ? styles.dragDropHovered : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!selectedFile ? (
          <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={["PDF"]}
          maxSize={16}
          multiple={false}
          dropMessageStyle={{backgroundColor: '#00a6ff', color: '#fbfbff', fontWeight: 500, border: "none"}}>
            <div className={styles.dropArea}>
              <span className={styles.header}>
                Drag & drop your file here or click to select
              </span>
              <span className={styles.subHeader}>
                Allowed file type: pdf (max file size 16 MB)
              </span>
              <FaCirclePlus
                className={`${styles.icon} ${hovered ? styles.scale : ""}`}
              />
            </div>
          </FileUploader>
          ) : (
            <div className={styles.selectedFile}>
              <span className={styles.fileName}>{selectedFile.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleUpload();
                }}
                disabled={!selectedFile}
                className={styles.button}
              >
                Upload
              </button>
              <button 
                className={styles.clearButton} 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                Clear
              </button>
            </div>
          )}
        {/* </FileUploader> */}
      </div>
    </div>
  );
};

export default UploadForm;
