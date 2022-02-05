const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const updateIdea = updateInstanceInDatabase("ideas", req.body);
  res.send(updateIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleteIdea = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deleteIdea) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
