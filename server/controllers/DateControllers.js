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