import React, { useState } from "react";
import usePupData from "../hooks/usePupData";
import "../stylesheets/AddPupForm.scss";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from "@material-ui/core";
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

import axios from "axios";
import { Avatar } from "@material-ui/core";

//Component for adding new pup
export default function AddPupForm({ user }) {
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
  } = usePupData();

  const male = <FontAwesomeIcon className="pupForm__icons" icon={faMars} />;
  const female = <FontAwesomeIcon className="pupForm__icons" icon={faVenus} />;

  return (
    <div className="pupForm">
      <ThemeProvider theme={muiTheme}>
        <form
          className="pupForm__card"
          onSubmit={(e) => {
            addPup(e, user);
          }}
        >
          {photoURL ? (
            <Avatar
              style={{
                height: "75px",
                width: "75px",
                alignSelf: "center",
              }}
              src={photoURL}
              alt="your - pup"
            />
          ) : (
            <Button>
              <label class="pupForm__imageUpload">
                <input
                  type="file"
                  onChange={(e) => uploadImage(e.target.files[0])}
                />
                <AddCircleIcon className="pupForm__icons__upload" />
                <ImageIcon fontSize="large" className="pupForm__icons__image" />
              </label>
            </Button>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                name="name"
                id="name"
                value={formData.name}
                aria-describedby="name"
                onChange={handleChange}
                style={{ width: "9rem" }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="breed">Breed</InputLabel>
              <Input
                type="text"
                name="photoURL"
                id="breed"
                value={formData.breed}
                aria-describedby="breed"
                onChange={handleChange}
                style={{ width: "9rem" }}
              />
            </FormControl>
          </div>
          <FormControl>
            <TextField
              error={charRemaining < 0}
              multiline
              label="Bio"
              name="bio"
              value={formData.bio}
              aria-describedby="bio"
              onChange={handleChange}
            />
            <FormHelperText>
              <span class={charRemaining < 0 && "pupForm__red"}>
                {charRemaining} characters remaining
              </span>
            </FormHelperText>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel className="pupForm__addPadding" component="legend">
              Gender
            </FormLabel>
            <RadioGroup
              name="gender"
              onChange={handleChange}
              aria-label="gender"
              row
            >
              <div className="pupForm__genderGroup">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={female}
                  labelPlacement="start"
                  style={{
                    color: "black",
                  }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={male}
                  labelPlacement="start"
                  style={{
                    color: "black",
                  }}
                />
              </div>
            </RadioGroup>
          </FormControl>
          <InputLabel className="pupForm__addPadding" htmlFor="energy" mt="3">
            Energy
          </InputLabel>

          <Slider
            defaultValue={1}
            id="energy"
            name="energy"
            onChange={handleEnergyChange}
            aria-labelledby="discrete-sldier-custom"
            step={1}
            valueLabelDisplay="auto"
            min={1}
            max={5}
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
          <Button
            style={{ backgroundColor: "rgb(176, 176, 176)", color: "white" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </ThemeProvider>
    </div>
  );
}
