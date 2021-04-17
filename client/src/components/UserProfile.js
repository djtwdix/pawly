import React from 'react'
import useUserData from "../hooks/useUserData";
import * as mui from "@material-ui/core";
import getInitials from "../helpers/getInitials";
import { Avatar } from "@material-ui/core";



export default function UserProfile() {
  const { handleChange, addBio, charRemaining, bio, name, email, photo } = useUserData();

  return (
    <span className="userBio">
      <div className="userBio__display">
        <Avatar
          className="userBio__avatar"
          src={photo}
          style={{
            margin: "0",
            height: "110px",
            width: "110px",
          }}
        >
          {/* {getInitials(name)} */}
        </Avatar>
        <div className="userBio__info">
          <h1>{name}</h1>
          <h1>{email}</h1>
        </div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        addBio()
      }}>
        <div className="userBio__form" >
          <mui.FormControl>
            <mui.TextField
              error={charRemaining < 0}
              multiline
              label="Bio"
              name="bio"
              value={bio}
              aria-describedby="bio"
              onChange={handleChange}
              required={true}
            />
            <mui.FormHelperText>
              <span className={charRemaining < 0 ? "pupForm__red" : undefined}>
                {charRemaining} characters remaining
          </span>
            </mui.FormHelperText>
          </mui.FormControl>
          <mui.Button
            style={{ backgroundColor: "rgb(176, 176, 176)", color: "white" }}
            type="submit"
          >
            Submit
          </mui.Button>
        </div>
      </form>
    </span>
  )
}
