const express = require("express");
const router = express.Router();

const Board = require("../models/board");

router.get("/", (req, res) => {
  Board.find()
    .then((boards) => res.json(boards))
    .catch((err) => res.status(404).json({ error: err }));
});

router.delete(`/:id`, (req, res) => {
  Board.findOneAndDelete(req.params.id)
    .then((board) => res.json({ success: true, data: board }))
    .catch((err) => res.status(404).json({ error: err }));
});

router.patch("/edit-task/:id", async (req, res) => {
  const id = req.params.id;
  const { taskId, editItem } = req.body;

  Board.findOneAndUpdate(
    { _id: id, "tasks._id": taskId },
    { $set: { "tasks.$": editItem } },
    { new: true }
  )
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).send("Server error"));
});

router.patch("/delete-task/:id", async (req, res) => {
  const id = req.params.id;
  const deleteItem = req.body;

  Board.findByIdAndUpdate(id, { $pull: { tasks: deleteItem } }, { new: true })
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).send("Server error"));
});

router.post("/create-board", (req, res) => {
  Board.create(req.body).then(() => res.json({ success: true }));
});

router.put("/:id", (req, res) => {
  Board.findByIdAndUpdate(req.params.id, req.body)
    .then((board) => res.json({ success: true, data: board }))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
