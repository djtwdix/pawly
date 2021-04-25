import axios from "axios"

//posts new pup info to DB on pupform submit
const createPup = (e, user, location, formData, photoURL) => {
  e.preventDefault();
  return axios.post("/pups", {
    ...formData,
    owner_id: user.uid,
    photoURL: photoURL,
    location: location,
  });
};

export default createPup