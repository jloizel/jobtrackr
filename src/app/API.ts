import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://jobtrackr-server.vercel.app/'; 

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getUserEmail = (): string | null => {
  return localStorage.getItem('userEmail'); 
};

api.interceptors.request.use((config) => {
  const email = getUserEmail(); 
  if (email) {
    config.headers['Authorization'] = `email ${email}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;


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

    const email = getUserEmail();
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
    const email = getUserEmail();
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

export const deleteCV = async (email: string, fileId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete('/cv/delete', {
      data: { email, id: fileId },
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

    const email = getUserEmail();
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
    const email = getUserEmail();
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

export const deleteCL = async (email: string, fileId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete('/cl/delete', {
      data: { email, id: fileId }, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// user registration
export const registerUser = async (userData: {
  email: string;
  password: string;
}): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw error;
  }
};

// login registered user
export const loginUser = async (userData: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  try {
    const response: AxiosResponse<{ token: string }> = await api.post('/auth/login', userData);
    const { token } = response.data;

    // Check if we're on the client side before using localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', userData.email);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw error;
  }
};


// logout the user
export const logoutUser = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
};




