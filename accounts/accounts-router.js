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

router.get("/:id", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json("Error retrieving account with specified id");
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;
  knex("accounts")
    .insert(accountData, "id")
    .then(ids => {
      const id = ids[0];
      knex("*")
        .from("accounts")
        .where({ id })
        .first()
        .then(account => {
          res.status(201).json(account);
        })
        .catch(error => {
          res.status(500).json("Error retrieving account with specified id");
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json("Error adding account");
    });
});

router.delete("/:id", (req, res) => {
  knex("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(error => {
      res.status(500).json({ message: "error deleting the account" });
    });
});

router.put("/:id", (req, res) => {
  const accountUpdate = req.body;

  knex("accounts")
    .where({ id: req.params.id })
    .update(accountUpdate)
    .then(count => {
      if (count > 0) {
        res.status(201).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json("Record not found");
      }
    })
    .catch(error => {
      res.status(500).json("Error updating record");
    });
});

module.exports = router;
