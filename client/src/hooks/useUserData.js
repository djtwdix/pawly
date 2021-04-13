import axios from "axios";

export default function useUserData() {
  const getUserById = async (id) => {
    const userInfo = await axios.get(`/users/${id}`);
    return userInfo;
  };

  return { getUserById };
}
