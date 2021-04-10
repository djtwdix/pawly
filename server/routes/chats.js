const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    createChat(req.body);
  });

  return router
};