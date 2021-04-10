import Users from "../models/UserModel.js"

export const createUser = async (req, res) => {
  const userInfo = req.body
  await Users.create(userInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
}


