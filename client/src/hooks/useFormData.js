import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


export default function useFormData() {
  const data = useLocation();
  const [selectedDate, setSelectedDate] = useState();
  const [charRemaining, setCharRemaining] = useState(140);
  const [photoURL, setPhotoURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    bio: "",
    gender: "",
    energy: 1,
    birthday: "",
  });


  const [userPups, setUserPups] = useState([]);
  let pupID = null;
  if (data.state) {
    pupID = data.state._id;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(' e.target.value: ',  e.target.value);

    console.log(formData)
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
        console.log('res.data.url: ', res.data.url);
      });
  };
   console.log(photoURL)
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
    handleChange,
    handleDateChange,
    handleEnergyChange,
    uploadImage,
    userPups,
    formData,
    charRemaining,
    photoURL,
    selectedDate,
    setFormData,
    data
  }

}