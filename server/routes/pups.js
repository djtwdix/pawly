
const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post("/", createPup)

  return router
}