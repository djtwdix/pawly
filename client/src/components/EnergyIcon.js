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
          style={{ color: "red" }}
        />
      )}
      {energy === 2 && (
        <BatteryCharging50RoundedIcon
          style={{ color: "#ffce44" }}
        />
      )}
      {energy === 3 && (
        <BatteryCharging80RoundedIcon
          style={{ color: "yellowgreen" }}
        />
      )}
      {energy === 4 && (
        <BatteryChargingFullRoundedIcon
          style={{ color: "lightgreen" }}
        />
      )}
    </div>
  );
}
