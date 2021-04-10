import Messages from "./MessageControllers"

export const createMessage = (req, res) => {
  const messageInfo = req.body
  Messages.create(messageInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
}

export const getMessagesByChatID = (req, res) => {
  const chat_id = req.body
  Messages.aggregate(
    [
      {
        $match: {
          chat_id: chat_id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender_id",
          foreignField: "_id",
          as: "sender",
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
}