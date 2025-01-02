"use client";

import React, { useState } from "react";
import styles from "./cvUploadForm.module.css";
import { uploadCV } from "../../app/API";
import { FaCirclePlus } from "react-icons/fa6";
import { FileUploader } from "react-drag-drop-files";

interface CVUploadFormProps {
  onFileUpload: () => void;
}

const CVUploadForm: React.FC<CVUploadFormProps> = ({ onFileUpload }) => {
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
      const response = await uploadCV(selectedFile);
      alert(response.message);
      onFileUpload(); // Update the files list
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className={styles.form}>
      <div
        className={`${styles.dragDropContainer} ${
          hovered ? styles.dragDropHovered : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={["PDF"]}
          maxSize={16}
          multiple={false}
        >
          {!selectedFile ? (
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
          ) : (
            <div className={styles.selectedFile}>
              <span className={styles.fileName}>{selectedFile.name}</span>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={styles.button}
              >
                Upload
              </button>
            </div>
          )}
        </FileUploader>
      </div>
    </div>
  );
};

export default CVUploadForm;
