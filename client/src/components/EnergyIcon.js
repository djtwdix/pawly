import React from "react";
import BatteryCharging20RoundedIcon from "@material-ui/icons/BatteryCharging20Rounded";
import BatteryCharging50RoundedIcon from "@material-ui/icons/BatteryCharging50Rounded";
import BatteryCharging80RoundedIcon from "@material-ui/icons/BatteryCharging80Rounded";
import BatteryChargingFullRoundedIcon from "@material-ui/icons/BatteryChargingFullRounded";

export default function EnergyIcon({ energy }) {
  return (
    <div>
      {energy === 1 && (
        <BatteryCharging20RoundedIcon
          fontSize="large"
          style={{ color: "red" }}
        />
      )}
      {energy === 2 && (
        <BatteryCharging50RoundedIcon
          fontSize="large"
          style={{ color: "yellow" }}
        />
      )}
      {energy === 3 && (
        <BatteryCharging80RoundedIcon
          fontSize="large"
          style={{ color: "yellowgreen" }}
        />
      )}
      {energy === 4 && (
        <BatteryChargingFullRoundedIcon
          fontSize="large"
          style={{ color: "lightgreen" }}
        />
      )}
    </div>
  );
}
