import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePupData() {
  const data = useLocation();
  const [selectedDate, setSelectedDate] = useState();
  const [charRemaining, setCharRemaining] = useState(140);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    bio: "",
    gender: "",
    energy: 1,
    birthday: "",
  });
  const [photoURL, setPhotoURL] = useState("");

  //gets pupID from state data passed from link
  let pupID = null;
  if (data.state) {
    pupID = data.state._id;
  }

  //sets form information to input data of bio form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "bio") {
      setCharRemaining(140 - e.target.value.length);
    }
  };

  //sets date change from date selector of pup form
  const handleDateChange = (date) => {
    if (date) {
      const birthday = date._d.toDateString();
      setSelectedDate(date);
      setFormData({ ...formData, birthday: birthday });
    }
  };

  //sets energy change from slider in pup form
  const handleEnergyChange = (event, number) => {
    setFormData({ ...formData, energy: number });
  };

  //uploads image to hosting site for storage
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

  //loads pup information and sets state to pup info
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
  };
}
