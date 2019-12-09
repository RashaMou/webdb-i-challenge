const express = require("express");
const router = express.Router();

const knex = require("../data/dbConfig");

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json("Error retrieving accounts");
    });
});

module.exports = router;
