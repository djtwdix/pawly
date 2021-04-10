import Chats from "../models/ChatModel.js";

export const createChat = (req, res) => {
  const chatInfo = req.body;
  Chats.create(chatInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};

export const getChatsByUserId = (req, res) => {
  const user_id = req.body.user_id;
  Chats.find({ participants: user_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};
