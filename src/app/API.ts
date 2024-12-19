import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://jobtrackr-server.vercel.app/'; 

// Create an Axios instance with custom configurations
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the user email from localStorage
const getUserEmail = (): string | null => {
  return localStorage.getItem('userEmail'); 
};

// Axios request interceptor to add Authorization header with the email
api.interceptors.request.use((config) => {
  const email = getUserEmail(); 
  if (email) {
    config.headers['Authorization'] = `email ${email}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Define types for request data and response data
export interface Job {
  _id: string;
  userEmail: string;
  status: string;  
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
  createdAt: string;
  updatedAt: string
}

// Create a new job
export const createJob = async (jobData: {
  status: string;  
  title: string;
  company: string;
  domain: string;
  logoUrl?: string;
  salary: string;
  location: string;
}): Promise<Job> => {
  try {
    const response: AxiosResponse<Job> = await api.post('/jobs/create', jobData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

// Get a job by ID
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

// Get all jobs
export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const response: AxiosResponse<{ jobs: Job[] }> = await api.get('/jobs/get');
    return response.data.jobs || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return []; 
  }
};

// Update a job
export const updateJob = async (jobId: string, jobData: {
  status: string;  
  title: string;
  company: string;
  domain: string;
  logoUrl: string;
  salary: string;
  location: string;
}): Promise<Job> => {
  try {
    const response: AxiosResponse<Job> = await api.patch(`/jobs/update/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a job
export const deleteJob = async (jobId: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await api.delete(`/jobs/delete/${jobId}`);
    return { message: response.data.message };
  } catch (error) {
    throw error;
  }
};