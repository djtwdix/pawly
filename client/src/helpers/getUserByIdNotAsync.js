import axios from "axios";

export const getUserByIdNotAsync = (id) => {
  return axios.get(`/users/${id}`);
};

export default getUserByIdNotAsync;
