import axios from "axios";

export default function useUserData() {
  const getUserInfo = async(id) => {
    try {
    const userInfo = await axios.get(`/users/${id}`);
    return userInfo
    } catch(error){
      return error;
    }
  };
  
  return { getUserInfo }
};