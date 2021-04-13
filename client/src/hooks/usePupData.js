import axios from "axios";
import { useState } from "react";

export default function usePupData() {
  const [selectedDate, setSelectedDate] = useState();
  const [charRemaining, setCharRemaining] = useState(140);
  const [formData, setFormData] = useState({name:"", breed:"",bio:"", gender:"",energy:"",birthday:""});
  const [photoURL, setPhotoURL] = useState("");
  const [pups, setPups] = useState([]);
  const [userPups, setUserPups] = useState([]);
  
  const getAllPups = async (user_id) => {
    console.log('user_id:', user_id)
    const result = await axios.post("/pups/all", { user_id: user_id });
    setPups(result.data);
   };

  const getPupsByOwnerId = async (owner_id) => {
    const result = await axios.get(`/users/${owner_id}/pups`)
    setUserPups(result.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "bio") {
      setCharRemaining(140 - e.target.value.length);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const birthday = date._d.toDateString();
      setSelectedDate(date);
      setFormData({ ...formData, birthday: birthday });
    }
  };

  const handleEnergyChange = (event, number) => {
    setFormData({ ...formData, energy: number });
  };

  const addPup = (e, user) => {
    e.preventDefault();
    return axios.post("/pups", {
      ...formData,
      owner_id: user.uid,
      photoURL: photoURL,
    });
  };

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "pawlypreset");
    axios
      .post("https://api.cloudinary.com/v1_1/druwzs7ds/image/upload/", formData)
      .then((res) => {
        setPhotoURL(res.data.url);
      });
  };

  return {
    formData,
    charRemaining,
    selectedDate,
    setSelectedDate,
    setCharRemaining,
    setFormData,
    handleChange,
    handleDateChange,
    handleEnergyChange,
    uploadImage,
    photoURL,
    addPup,
    getPupsByOwnerId,
    getAllPups,
    pups,
    userPups
  };
}
