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

//Component for for adding new pup
export default function AddPupForm({ user }) {
  const {
    formData,
    handleChange,
    handleDateChange,
    handleEnergyChange,
    addPup,
    charRemaining,
    setCharRemaining,
    selectedDate,
  } = usePupData();

  return (
    <form className="pupForm" onSubmit={addPup}>
      <FormControl>
        <InputLabel htmlFor="image"></InputLabel>
        <Input
          type="text"
          name="photoURL"
          id="image"
          value={formData.photoURL}
          aria-describedby="image"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="Name"></InputLabel>
        <Input
          name="name"
          id="name"
          value={formData.name}
          aria-describedby="name"
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
        <FormHelperText>{charRemaining} characters remaining</FormHelperText>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel className="pupForm_energy" component="legend">
          Gender
        </FormLabel>
        <RadioGroup
          value={formData.gender}
          name="gender"
          onChange={handleChange}
          aria-label="gender"
          row
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="female"
            labelPlacement="start"
            style={{
              color: "black",
            }}
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="male"
            labelPlacement="start"
            style={{
              color: "black",
            }}
          />
        </RadioGroup>
      </FormControl>
      <InputLabel className="pupForm_energy" htmlFor="energy" mt="3">
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
      <Button type="submit"></Button>
    </form>
  );
}
