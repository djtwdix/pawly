import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useLocation } from "react-router-dom";
import useLocationData from "./useLocationData";


export default function usePupData() {
  const user = auth.currentUser;
  const data = useLocation();
  const { location } = useLocationData();
  const [selectedDate, setSelectedDate] = useState();
  const [charRemaining, setCharRemaining] = useState(140);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    bio: "",
    gender: "",
    energy: "",
    birthday: "",
  });
  const [photoURL, setPhotoURL] = useState("");
  const [pups, setPups] = useState([]);
  
  const [userPups, setUserPups] = useState([]);
  let pupID = null;
  if (data.state) {
    pupID = data.state._id;
  }

  useEffect(() => {
    if (user) {
      const getAllPups = async (user_id) => {

        const result = await axios.post("/pups/all", {
          user_id: user_id,
        });
        setPups(result.data);
      };
      getAllPups(user.uid);
      const getPupsByOwnerId = async (owner_id) => {
        const result = await axios.get(`/users/${owner_id}/pups`);
        setUserPups(result.data);
      };
      getPupsByOwnerId(user.uid);
    }
  }, [user, location]);

  const addPup = (e, user, location) => {
    e.preventDefault();
    return axios.post("/pups", {
      ...formData,
      owner_id: user.uid,
      photoURL: photoURL,
      location: location,
    });
  };

  const editPup = (e, user ) => {
    e.preventDefault();
    return axios.put(`/pups/${pupID}`, {
      ...formData,
      _id: pupID,
      owner_id: user.uid,
      photoURL: photoURL,
    });
  };

  const destoryPup = (e, user ) => {
    e.preventDefault();
    return axios.delete(`/pups/${pupID}`, {
      _id: pupID
    });
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

  useEffect(() => {
    if (pupID) {
      const getPupById = async (pupID) => {
        const result = await axios.get(`/pups/${pupID}`);
        const pupInfo = result.data[0];
        setFormData({ ...pupInfo });
        setCharRemaining(140 - pupInfo.bio.length);
        setPhotoURL(pupInfo.photoURL);
        setSelectedDate(pupInfo.birthday);
      };
      getPupById(pupID);
    }
  }, [pupID]);

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
    setPhotoURL,
    addPup,
    pups,
    userPups,
    editPup,
    setPups,
    destoryPup
  };
}
