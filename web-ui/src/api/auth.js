import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1/auth";

export const register = async (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

export const login = async (userData) => {
  return axios.post(`${API_BASE_URL}/login`, userData);
};
