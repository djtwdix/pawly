import Pups from "../models/PupModel.js"

export const createPup = (req, res) => {
  const pupsInfo = req.body;
  Pups.create(pupsInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
}

export const getPupsByOwner = (req, res) => {
  const owner_id = req.body.owner_id
  Pups.find({owner_id: owner_id}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}

export const getPupById = (req, res) => {
  const pupID = mongoose.Types.ObjectId(req.params.pupID);
  console.log(pupID);
  Pups.aggregate(
    [
      {
        $match: {
          _id: pupID,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner_id",
          foreignField: "_id",
          as: "owner",
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

export const getAllPups = (req, res) => {
  const user_id = req.body.user_id;
  Pups.aggregate(
    [
      {
        $match: {
          owner_id: {$ne: user_id}
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner_id",
          foreignField: "_id",
          as: "owner",
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