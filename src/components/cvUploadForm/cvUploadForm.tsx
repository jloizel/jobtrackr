"use client";

import React, { useState } from 'react';
import styles from "./cvUploadForm.module.css";
import { uploadCV } from '../../app/API'; 

const CVUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    try {
      const response = await uploadCV(selectedFile);
      alert(response.message);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className={styles.form}>
        <label htmlFor="fileInput" className={styles.input}>
          <span className={styles.header}>Allowed file type:</span>
          <span className={styles.subHeader}>pdf (max file size: 16 mb)</span>
          {selectedFile && (
            <span className={styles.fileName}>{selectedFile.name}</span>
          )}
        </label>
        <input
          id="fileInput"
          className={styles.fileinputButton}
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
        />
      {/* <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button> */}
    </div>
  );
};

export default CVUploadForm;
