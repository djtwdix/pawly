import React from "react";
import useUserData from "../hooks/useUserData";
import * as mui from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import useProfileData from "../hooks/useProfileData";


export default function UserProfile() {
  const {
    handleChange,
    addBio,
    charRemaining,
    bio,
    name,
    email,
    photo,
  } = useUserData();

  const { profile } = useProfileData();

  return ( 
    <section className="userBio__container">
      
      {profile &&
      <div className="userBio">
        <div className="userBio__display">
          <Avatar
            className="userBio__avatar"
            src={profile.photoURL}
            style={{
              margin: "0",
              position: "relative",
              top: "40px",
              right: "20px",
              height: "110px",
              width: "110px",
            }}
          >
            {/* {getInitials(name)} */}
          </Avatar>
        </div>
        <div className="userBio__info">
          <h1>{profile.name}</h1>
        </div>
        <p className="userBio__about">{`About me:`}</p>
        <p className="userBio__aboutUser"> {profile.bio}</p>
      </div> }
      
      {!profile &&
        <div className="userBio">
        <div className="userBio__display">
          <Avatar
            className="userBio__avatar"
            src={photo}
            style={{
              margin: "0",
              position: "relative",
              top: "40px",
              right: "20px",
              height: "110px",
              width: "110px",
            }}
          >
            {/* {getInitials(name)} */}
          </Avatar>
        </div>
        <div className="userBio__info">
          <h1>{name}</h1>
          <h4>{email}</h4>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addBio();
          }}
        >
          <div className="userBio__form">
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
                <span
                  className={charRemaining < 0 ? "pupForm__red" : undefined}
                >
                  {charRemaining} characters remaining
                </span>
              </mui.FormHelperText>
            </mui.FormControl>
            <mui.Button style={{ color: " #fd93ff" }} type="submit">
              Submit
            </mui.Button>
          </div>
        </form>
      </div>
      }
    </section>
  );
}
