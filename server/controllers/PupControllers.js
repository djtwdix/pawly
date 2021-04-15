import Pups from "../models/PupModel.js";
import mongoose from "mongoose";

export const createPup = (req, res) => {
  const pupsInfo = req.body;
  Pups.create(pupsInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
};

export const editPup = (req, res) => {
  const pupsInfo = req.body;
  const pupID = req.params.pupId
  Pups.findOneAndUpdate({_id: pupID}, pupsInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
}

export const getPupsByOwner = (req, res) => {
  const owner_id = req.params.userId;
  Pups.find({ owner_id: owner_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
};

export const getPupById = (req, res) => {
  const pupID = mongoose.Types.ObjectId(req.params.pupId);
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
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};

export const getAllPups = (req, res) => {
  const user_id = req.body.user_id;
  Pups.aggregate(
    [
      {
        $match: {
          owner_id: { $ne: user_id },
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
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
};
