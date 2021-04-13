import Users from "../models/UserModel.js";

const checkIfUserExists = (userId) => {
  return Users.findById(userId, (err, data) => {
    if (err) {
      return null;
    } else {
      return data;
    }
  });
};

export const getUserById = (req, res) => {
  const user_id = req.params.userId;
  Users.find({ _id: user_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const createUser = async (req, res) => {
  const userInfo = req.body;
  const userExists = await checkIfUserExists(req.body._id);
  if (!userExists) {
    Users.create(userInfo, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } else {
    Users.updateOne(userInfo, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
};

export const updateUser = (req, res) => {
  const userInfo = req.body;
  Users.updateOne(userInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const addLike = (req, res) => {
  const userId = req.params.userId;
  console.log("userId: ", userId);

  const likeId = req.body.likeId;
  console.log("likeId: ", likeId);
  Users.updateOne(
    { _id: userId },
    { $push: { likes: likeId } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};
