import Dates from "../models/DateModel.js";
import mongoose from "mongoose";

export const createDate = (req, res) => {
  const playDateInfo = req.body
  console.log('playDateInfo:', req.body);

  Dates.create(playDateInfo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};

export const getDatesForUser = (req, res) => {
  const user_id = req.session.user_id;

  Dates.find({ participants: user_id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}