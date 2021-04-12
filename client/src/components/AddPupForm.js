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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import usePupData from "../hooks/usePupData";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/AddPupForm.scss";

import { muiTheme } from "../stylesheets/muiTheme";
import { ThemeProvider } from "@material-ui/styles";

//Component for for adding new pup
export default function AddPupForm({ user }) {
  const {
    formData,
    handleChange,
    handleDateChange,
    handleEnergyChange,
    addPup,
    charRemaining,
    selectedDate,
  } = usePupData();

  const male = <FontAwesomeIcon className="genderIcons" icon={faMars} />;
  const female = <FontAwesomeIcon className="genderIcons" icon={faVenus} />;

  return (
    <div className="pupForm">
      <ThemeProvider theme={muiTheme}>
        <form
          className="pupForm__card"
          onSubmit={(e) => {
            addPup(e, user);
          }}
        >
          <label class="pupForm__button">
            <input type="file" />
            Upload Image
          </label>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="name"
              id="name"
              value={formData.name}
              aria-describedby="name"
              onChange={handleChange}
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
            />
          </FormControl>
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
          <Button type="submit">Submit</Button>
        </form>
      </ThemeProvider>
    </div>
  );
}
