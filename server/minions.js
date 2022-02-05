const minionsRouter = require("express").Router();

module.exports = minionsRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
/*
minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});*/

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.send(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.params.id);
  if (!minion) {
    res.status(404).send();
  }
  res.send(minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.params.id);
  if (!minion) {
    res.status(404).send();
  }
  const updateMinion = updateInstanceInDatabase("minions", req.body);
  res.send(updateMinion);
});

minionsRouter.delete(":minionId", (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.params.id);
  if (!minion) {
    res.status(404).send();
  }
  const deleteMinion = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
