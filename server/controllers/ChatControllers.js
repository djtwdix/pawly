import Chats from "../models/ChatModel.js";
import checkIfMatchExists from "../helpers/checkIfMatchExists.js";

export const createChat = async (req, res) => {
  const participants = req.body.participants;

  const alreadyExists = await checkIfMatchExists(participants);
  console.log('alreadyExists: ', alreadyExists);
  if (!alreadyExists) {
    Chats.create(participants, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  }
};

export const getChatsByUserId = (req, res) => {
  const user_id = req.body.user_id;
  console.log('user_id: ', user_id);

  Chats.find({ participants: user_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
