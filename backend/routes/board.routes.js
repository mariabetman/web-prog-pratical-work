const express = require("express");
const router = express.Router();
const Board = require("../models/board.model.js");
const {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  updateBoard,
} = require("../controllers/board.controller.js");

router.get("/", getBoards);
router.get("/:id", getBoardById);
router.post("/", createBoard);
router.patch("/:id", updateBoard);
router.delete("/:id", deleteBoard);

module.exports = router;