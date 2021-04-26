import React from "react";
import { Link } from "react-router-dom";
import ListItemContainer from "./ListItemContainer";
import { Add } from "@material-ui/icons";
import useDateData from "../hooks/useDateData";
import PlayDateListItem from "./PlayDateListItem";
import getUserById from "../helpers/getUserById";

export default function Playdates() {
  const { dates, user } = useDateData();

  const parsedDates = dates.map((date) => {
    return (
      <section className="playDateListItem__container">
        <PlayDateListItem
          key={date._id}
          participants={date.participants}
          date={date.date}
          user={user}
        >
        </PlayDateListItem>
      </section>
    );
  });

  return (
    <section className="pupListItem__container">
      {parsedDates}
    </section>
  );
}
