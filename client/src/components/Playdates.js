import React from "react";
import { Link } from "react-router-dom";
import ListItemContainer from "./ListItemContainer";
import { Add } from "@material-ui/icons";
import useDateData from "../hooks/useDateData";
import PlayDateListItem from "./PlayDateListItem";

export default function Playdates() {
  const { dates } = useDateData();

  const parsedDates = dates.map((date) => {
    return (
      <section className="playDateListItem__container">
          <PlayDateListItem 
          date={date.date}
          otherUser={date.otherUser}>
          </PlayDateListItem>
      </section>
    );
  });


  return (
    <section className="pupListItem__container">
      {parsedDates}
      <Link to="/playdates">
        <ListItemContainer>
          <Add />
        </ListItemContainer>
      </Link>
    </section>
  );
}
