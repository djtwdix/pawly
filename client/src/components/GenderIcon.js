import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

export default function GenderIcon({ gender }) {
  return (
    <div>
      {gender === "male" && (
        <FontAwesomeIcon className="infoCard__genderIconMale" icon={faMars} />
      )}
      {gender === "female" && (
        <FontAwesomeIcon className="infoCard__genderIconFemale" icon={faVenus} />
      )}
    </div>
  );
}
