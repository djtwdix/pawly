import Users from "../models/UserModel.js"

const getUserById = (userId) => {
  return Users.findById(userId, (err, data) => {
    if (err) {
      return null;
    } else {
      return data;
    }
  });
}

export const createUser = async (req, res) => {
  const userInfo = req.body
  const userExists = await getUserById(req.body._id)
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
}

export const updateUser = (req, res) => {
  const userInfo = req.body
  Users.updateOne(userInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}








