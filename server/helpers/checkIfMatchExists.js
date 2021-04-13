import Chats from "../models/ChatModel.js";

export default  function checkIfMatchExists (participants) {
  console.log('participants:', participants); 
  return  Chats.findOne({
    participants: participants,
  });
}
