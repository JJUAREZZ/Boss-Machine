const meetingsRouter = require("express").Router();

module.exports = meetingsRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  const deleteMeeting = deleteAllFromDatabase("meetings", req.params.id);
  if (deleteMeeting) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
