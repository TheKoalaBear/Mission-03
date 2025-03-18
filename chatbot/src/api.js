// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4000"; // Replace with your backend URL

export const startInterview = async (email, jobTitle) => {
  const response = await axios.post(`${API_BASE_URL}/startInterview`, {
    email,
    jobTitle,
  });
  return response.data;
};

export const storeResponse = async (email, question, answer) => {
  const response = await axios.post(`${API_BASE_URL}/storeResponse`, {
    email,
    question,
    answer,
  });
  return response.data;
};

export const getAIResponse = async (email, jobTitle) => {
  const response = await axios.post(`${API_BASE_URL}/aiResponse`, {
    email,
    jobTitle,
  });
  return response.data;
};

export const completeInterview = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/completedInterview`, {
    email,
  });
  return response.data;
};
