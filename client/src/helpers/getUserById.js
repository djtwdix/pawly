import axios from "axios";


const getUserById = async (id) => {
    const userInfo = await axios.get(`/users/${id}`);
    return userInfo;
};

export default getUserById

