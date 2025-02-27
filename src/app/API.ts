import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = 'https://jobtrackr-server.vercel.app/'; 

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getUserEmail = (): string | null => {
  return localStorage.getItem('userEmail'); 
};

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const email = session?.user?.email;

    if (email) {
      config.headers['Authorization'] = `email ${email}`; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// define types for request data and response data
export interface Job {
  _id: string;
  userEmail?: string;
  status: string;  
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
  postUrl: string;
  createdAt: string;
  updatedAt: string
}

// create a new job
export const createJob = async (jobData: {
  status: string;  
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
  postUrl: string;
}): Promise<Job> => {
  try {
    const response: AxiosResponse<Job> = await api.post('/jobs/create', jobData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};


// get a job by ID
export const getJobById = async (jobId: string): Promise<Job | null> => {
  try {
    const response: AxiosResponse<{ job: Job }> = await api.get(`/jobs/get/${jobId}`);
    return response.data.job;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 404) {
        return null; 
      }
      console.error('Error fetching job:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
    throw error; 
  }
};

// get all jobs
export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const response: AxiosResponse<{ jobs: Job[] }> = await api.get('/jobs/get');
    return response.data.jobs || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return []; 
  }
};

// update a job
export const updateJob = async (jobId: string, jobData: {
  status: string;  
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
  postUrl: string;
}): Promise<Job> => {
  try {
    const response: AxiosResponse<Job> = await api.patch(`/jobs/update/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete a job
export const deleteJob = async (jobId: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await api.delete(`/jobs/delete/${jobId}`);
    return { message: response.data.message };
  } catch (error) {
    throw error;
  }
};

export interface FileData {
  _id: string;
  fileName: string;
  fileData: string; 
  uploadDate: string;
}

// upload a file (PDF)
export const uploadCV = async (file: File): Promise<{ message: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const session = await getSession();
    const email = session?.user?.email; 
    if (email) {
      formData.append('email', email);
    } else {
      throw new Error('User email is not available');
    }

    const response: AxiosResponse<{ message: string }> = await api.post('/cv/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get files for the logged-in user
export const getCVs = async (): Promise<FileData[]> => {
  try {
    const session = await getSession();
    const email = session?.user?.email; 
    if (!email) {
      throw new Error('User email is not available');
    }

    const response: AxiosResponse<FileData[]> = await api.get('/cv/get', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCV = async (id: string): Promise<{ message: string }> => {
  try {
    const session = await getSession();
    const email = session?.user?.email; 
    if (!email) {
      throw new Error('User email is not available');
    }

    const response = await api.delete('/cv/delete', {
      data: { email, id }, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadCL = async (file: File): Promise<{ message: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const session = await getSession();
    const email = session?.user?.email; 
    if (email) {
      formData.append('email', email);
    } else {
      throw new Error('User email is not available');
    }

    const response: AxiosResponse<{ message: string }> = await api.post('/cl/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get files for the logged-in user
export const getCLs = async (): Promise<FileData[]> => {
  try {
    const session = await getSession();
    const email = session?.user?.email; 
    if (!email) {
      throw new Error('User email is not available');
    }

    const response: AxiosResponse<FileData[]> = await api.get('/cl/get', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCL = async (id: string): Promise<{ message: string }> => {
  try {
    const session = await getSession();
    const email = session?.user?.email; 
    if (!email) {
      throw new Error('User email is not available');
    }

    const response = await api.delete('/cl/delete', {
      data: { email, id }, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


