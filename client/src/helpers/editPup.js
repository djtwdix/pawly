 import axios from "axios"
 
 //edits pup in db and sets state of current pup to updated data
 const editPup = (e, user, formData, photoURL, pupID) => {
  e.preventDefault();
  return axios.put(`/pups/${pupID}`, {
    ...formData,
    _id: pupID,
    owner_id: user.uid,
    photoURL: photoURL,
  });
 };

 export default editPup