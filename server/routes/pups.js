const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    createPup(req.body);
  });

  return router
}