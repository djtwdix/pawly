import axios from "axios"; 
import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase/config";

export default function useDateData() {
  const [dates, setDates] = useState([]);
  const user = auth.currentUser;


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
    let mounted = true;
    if (user) {
       getDatesByUserID(user.uid).then((res) => {
         setDates(res.data);
      })
    }

    return () => {
      mounted = false;
    }
  }, [user])

  return { addDate, dates};
}