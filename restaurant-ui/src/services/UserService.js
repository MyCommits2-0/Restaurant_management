// services/UserService.js
import axios from "axios";

const BASE_URL = 'http://localhost:8080/users';

const registerUser = (user) => {
  return axios.post(`${BASE_URL}/signup`, user);
};

const loginUser = (credentials) => axios.post(`${BASE_URL}/signin`, credentials);

export default {
  registerUser,
  loginUser,
};
