import React, { useState } from 'react'
import DateTimePicker from "react-datetime-picker";
import useDateData from "../hooks/useDateData";
import * as mui from "@material-ui/core";

export default function DatePicker({ user, otherUser }) {
  const [value, onChange] = useState(new Date());
  const { addDate } = useDateData();

  return (
    <div>
      <form onSubmit={(e) => addDate(e, user.uid, otherUser._id, value)}>
        <DateTimePicker
          onChange={onChange}
          value={value}
        />
        <mui.Button
          style={{ backgroundColor: "rgb(176, 176, 176)", color: "white" }}
          type="submit"
        >
          Submit
          </mui.Button>
      </form>
    </div>
  );
}
