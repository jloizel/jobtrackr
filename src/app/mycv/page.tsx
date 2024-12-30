"use client"

import CVUploadForm from '@/components/cvUploadForm/cvUploadForm'
import React, { useEffect, useState } from 'react'
import { FileData, getFiles } from '../API';

const MyCVPage = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileData = await getFiles();
        setFiles(fileData);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <div>
      <h3>Uploaded Files</h3>
      <ul>
        {files.map((file:any, index:any) => (
          <li key={index}>
            <a
              href={`data:application/pdf;base64,${file.fileData}`}
              download={file.fileName}
            >
              {file.fileName}
            </a> - Uploaded on {new Date(file.uploadDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
      <CVUploadForm/>
    </div>
  )
}

export default MyCVPage
