import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import * as mui from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import useProfileData from "../hooks/useProfileData";
import { muiTheme } from "../stylesheets/muiTheme";
import { ThemeProvider } from "@material-ui/styles";

export default function UserProfile({ user }) {
  const { handleChange, addBio, charRemaining, bio } = useUserData();

  const [edit, setEdit] = useState(false);

  const { profile } = useProfileData();

  const showEditButton = profile._id === user.uid;

  return (
    <ThemeProvider theme={muiTheme}>
      <section className="userBio__container">
        {profile && (
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
            <p className="userBio__about">About me</p>
            {!edit ? (
              <p className="userBio__aboutUser">
                {showEditButton ? bio : profile.bio}
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addBio();
                  setEdit(false);
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
                        className={
                          charRemaining < 0 ? "pupForm__red" : undefined
                        }
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
            )}
            {showEditButton && !edit && (
              <div className="userBio__editButton">
                <mui.Button
                  onClick={() => {
                    setEdit(true);
                  }}
                  style={{
                    color: " #fd93ff",
                  }}
                >
                  Edit
                </mui.Button>
              </div>
            )}
          </div>
        )}
      </section>
    </ThemeProvider>
  );
}
