import axios from "axios"; 
import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase/config";

export default function useDateData() {
  const [dates, setDates] = useState([]);


  const addDate = (e, user, otherUser, date) => {
    e.preventDefault();
    axios.post("/dates", {
      participants: [user, otherUser],
      creator: user,
      date: date
    })
  }

  const getDatesByUserID = async (uid)  =>{ 
   await axios.get("/dates")
  }

  useEffect(() => {
    if (user) {
      get
    }

  })

  return { addDate };
}