import React, { useEffect, useState } from "react";
import getUserById from "../helpers/getUserById";
import Avatar from "@material-ui/core/Avatar";


export default function PlayDateListItem({ date, user, participants }) {
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    let mounted = true;
    if (date && user) {
      const otherUserID = participants.filter((participant) => {
        return participant !== user.uid;
      });
      getUserById(otherUserID[0]).then((res) => {
        if (mounted) {
          setOtherUser(res.data);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [date, user]);

  return (
    <div>
      {date}
      <Avatar
        className="playDate__image"
        alt={otherUser.name}
        src={otherUser.photoURL}
      ></Avatar>
      {otherUser.name}
    </div>
  )
}
