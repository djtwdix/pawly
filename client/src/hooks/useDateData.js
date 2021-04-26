import axios from "axios"; 
import { useState, useEffect, useRef } from "react";

export default function useDateData() {

  const addDate = (e, user, otherUser, date) => {
    e.preventDefault();
    axios.post("/dates", {
      participants: [user, otherUser],
      creator: user,
      date: date
    })
  }

  return { addDate };
}