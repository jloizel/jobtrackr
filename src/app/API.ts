import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://natalies-next-stop-server.vercel.app/'; 

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface IContentBlock {
  type: 'text' | 'image' | 'subheader' | 'list';
  content: string;
  subContent?: string[];
  images?: string[];
  imageCaption: string;
  nestedBlocks?: IContentBlock[]; 
  [key: string]: any;
}

export interface ISubsection {
  header: string; 
  text: string; 
  images: string[]; 
  imageCaption: string;
  contentBlocks: IContentBlock[];
  [key: string]: any;
}

export interface Post {
  _id: string;
  countryImage: string;
  title: string;
  desc: string;
  introText: string; 
  introImage: string; 
  introImageLink: string;
  introImageCaption: string;
  previewImage: string;
  subsections: ISubsection[]; 
  continent: string;
  country: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export type PostInput = Omit<Post, '_id' | 'username' | 'createdAt' | 'updatedAt'>;

export interface Comment {
  _id: string;
  postId: string;
  name: string;       
  content: string;    
  createdAt: string;  
}

// Create a new post
export const createPost = async (postData: PostInput): Promise<Post> => {
  try {
    const response: AxiosResponse<Post> = await api.post('/post/create', postData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

// Get a single post by ID
export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    // console.log(`Fetching post with ID: ${postId}`);
    const response: AxiosResponse<Post> = await api.get(`/post/get/${postId}`);
    return response.data; 
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error fetching post:', axiosError);

    // Check for 404 error
    if (axiosError.response && axiosError.response.status === 404) {
      return null; 
    }
    throw error; 
  }
};


// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response: AxiosResponse<{ post: Post[] }> = await api.get('/post/get');
    return response.data.post || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get posts by continent
export const getPostsByContinent = async (continent: string): Promise<Post[]> => {
  // console.log(`Fetching posts for continent: ${continent}`);
  try {
    const response: AxiosResponse<Post[]> = await api.get(`/post/continent/${continent}`);
    // console.log('Response from API:', response.data); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching posts by continent:', error);
    return [];
  }
};

// Get posts by continent and country
export const getPostsByContinentAndCountry = async (continent: string, country: string): Promise<Post[]> => {
  try {
    const response: AxiosResponse<Post[]> = await api.get(`/post/continent/${continent}/country/${country}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching posts by continent and country:', error);
    return [];
  }
};

// Update a post by ID
export const updatePost = async (postId: string, postData: Partial<PostInput>): Promise<Post> => {
  try {
    const response: AxiosResponse<Post> = await api.patch(`/post/update/${postId}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a post by ID
export const deletePost = async (postId: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ post: Post; message: string }> = await api.delete(`/post/delete/${postId}`);
    return { message: response.data.message };
  } catch (error) {
    throw error;
  }
};

export const sendEmail = async (formData: FormData): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await api.post('/api/sendEmail', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const getInstagramPosts = async (): Promise<any[]> => {
  try {
    const response: AxiosResponse<{ posts: any[] }> = await api.get('/instagram/posts');
    return response.data.posts;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error fetching Instagram posts:', axiosError);

    // Check if the error is due to an expired token (401 Unauthorized)
    if (axiosError.response && axiosError.response.status === 401) {
      console.warn('Token expired, attempting to refresh...');
      await refreshInstagramToken(); 
      return await getInstagramPosts(); 
    }
    throw error; 
  }
};

export const refreshInstagramToken = async (): Promise<void> => {
  try {
    await api.post('/instagram/refresh-token');
    // console.log('Instagram token refreshed successfully');
  } catch (error) {
    console.error('Error refreshing Instagram token:', error);
    throw error; 
  }
};

export const addComment = async (commentId: string, name: string, content: string): Promise<Comment> => {
  try {
    const response: AxiosResponse<Comment> = await api.post('/comments', { commentId, name, content });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all comments for a specific post
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const response: AxiosResponse<Comment[]> = await api.get(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export const deleteComment = async (commentId: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await api.delete(`/comments/delete/${commentId}`);
    return response.data;
  } catch (error) {
    throw error; 
  }
};