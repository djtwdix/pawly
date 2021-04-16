import axios from "axios";

const getUserByIdNotAsync = (id) => {
  return axios.get(`/users/${id}`);
};

export default getUserByIdNotAsync;
