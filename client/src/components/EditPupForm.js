import React from "react";
import usePupData from "../hooks/usePupData";
import { useHistory } from "react-router-dom";

//material ui components

import * as mui from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { muiTheme } from "../stylesheets/muiTheme";
import { ThemeProvider } from "@material-ui/styles";

//icons
import ImageIcon from "@material-ui/icons/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

//Component for adding new pup

export default function EditPupForm({ user, location }) {
  const {
    formData,
    handleChange,
    handleDateChange,
    handleEnergyChange,
    addPup,
    charRemaining,
    selectedDate,
    uploadImage,
    photoURL,
    editPup,
  } = usePupData();

  const pupID = formData._id;

  const history = useHistory();
  const male = <FontAwesomeIcon className="pupForm__icons" icon={faMars} />;
  const female = <FontAwesomeIcon className="pupForm__icons" icon={faVenus} />;

  return (
    <div className="pupForm">
      <ThemeProvider theme={muiTheme}>
        <form
          className="pupForm__card"
          onSubmit={
            !pupID
              ? (e) => {
                  addPup(e, user, location).then(() => {
                    history.goBack();
                  });
                }
              : (e) => {
                  editPup(e, user, location).then(() => {
                    history.goBack();
                  });
                }
          }
        >
          {photoURL ? (
            <mui.Button>
              <label className="pupForm__imageUpload">
                <mui.Input
                  type="file"
                  onChange={(e) => uploadImage(e.target.files[0])}
                  required={!pupID ? true : false}
                />
                <mui.Avatar
                  style={{
                    height: "75px",
                    width: "75px",
                    alignSelf: "center",
                  }}
                  src={photoURL}
                  alt="your - pup"
                />
              </label>
            </mui.Button>
          ) : (
            <mui.Button>
              <label className="pupForm__imageUpload">
                <mui.Input
                  type="file"
                  onChange={(e) => uploadImage(e.target.files[0])}
                  required={true}
                />
                <AddCircleIcon className="pupForm__icons__upload" />
                <ImageIcon fontSize="large" className="pupForm__icons__image" />
              </label>
            </mui.Button>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <mui.FormControl>
              <mui.InputLabel htmlFor="name">Name</mui.InputLabel>
              <mui.Input
                name="name"
                id="name"
                value={formData.name}
                aria-describedby="name"
                onChange={handleChange}
                style={{ width: "9rem" }}
                required={true}
              />
            </mui.FormControl>
            <mui.FormControl>
              <mui.InputLabel htmlFor="breed">Breed</mui.InputLabel>
              <mui.Input
                type="text"
                name="breed"
                id="breed"
                value={formData.breed}
                aria-describedby="breed"
                onChange={handleChange}
                style={{ width: "9rem" }}
                required={true}
              />
            </mui.FormControl>
          </div>
          <mui.FormControl>
            <mui.TextField
              error={charRemaining < 0}
              multiline
              label="Bio"
              name="bio"
              value={formData.bio}
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
          <mui.FormControl component="fieldset">
            <mui.FormLabel className="pupForm__addPadding" component="legend">
              Gender
            </mui.FormLabel>
            <mui.RadioGroup
              name="gender"
              onChange={handleChange}
              aria-label="gender"
              row
            >
              <div className="pupForm__genderGroup">
                <mui.FormControlLabel
                  value="female"
                  control={
                    <mui.Radio
                      required={true}
                      checked={formData.gender === "female" ? true : false}
                    />
                  }
                  label={female}
                  labelPlacement="start"
                  style={{
                    color: "black",
                  }}
                />
                <mui.FormControlLabel
                  value="male"
                  control={
                    <mui.Radio
                      required={true}
                      checked={formData.gender === "male" ? true : false}
                    />
                  }
                  label={male}
                  labelPlacement="start"
                  style={{
                    color: "black",
                  }}
                />
              </div>
            </mui.RadioGroup>
          </mui.FormControl>
          <mui.InputLabel
            className="pupForm__addPadding"
            htmlFor="energy"
            mt="3"
          >
            Energy
          </mui.InputLabel>

          <mui.Slider
            
            value={formData.energy}
            id="energy"
            name="energy"
            onChange={handleEnergyChange}
            aria-labelledby="discrete-sldier-custom"
            step={1}
            valueLabelDisplay="auto"
            min={1}
            max={4}
          />

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              value={selectedDate}
              name="date"
              format="MM/DD/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Birthday"
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <mui.Button
            style={{ backgroundColor: "rgb(176, 176, 176)", color: "white" }}
            type="submit"
          >
            Submit
          </mui.Button>
        </form>
      </ThemeProvider>
    </div>
  );
}
