import axios from "axios";
import { useState } from "react";

export default function usePupData() {
  const [selectedDate, setSelectedDate] = useState();
  const [charRemaining, setCharRemaining] = useState(140);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "bio") {
      setCharRemaining(140 - e.target.value.length);
    }
    console.log(e.target.value)
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    setFormData({ ...formData, date: date });
  };

  const handleEnergyChange = (event, number) => {
    setFormData({ ...formData, energy: number });
  };

  const addPup = (e, user) => {
    e.preventDefault();
    console.log("clicked submit");
    console.log("doggie data:", formData);
    return axios.post("/pups", { ...formData, owner_id: user.uid });
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
    addPup,
  };
}
