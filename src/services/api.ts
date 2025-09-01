import axios from 'axios';

const API_URL = '/api'; // Replace with your actual backend API URL

export const signIn = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
