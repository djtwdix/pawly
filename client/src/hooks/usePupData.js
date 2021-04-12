import axios from 'axios';
import {useState} from "react";


export default function usePupData() {
  const [selectedDate, setSelectedDate] = useState();
  const [charRemaining, setCharReamaining] = useState(140);
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
    setFormData({ ...formData, date: date });
    console.log(formData);
  };

  const handleEnergyChange = (event, number) => {
    setFormData({ ...formData, energy: number });
    console.log(formData);
  }

  const addPup = (e, user) => {
    e.preventDefault();
    console.log("clicked submit");
    console.log("doggie data:", formData);
    return axios.post("/pups", { ...formData, owner_id: user.uid });
  };
  

  return {formData, charRemaining, selectedDate, setSelectedDate, setCharReamaining, setFormData, handleChange, handleDateChange, handleEnergyChange, addPup};

}