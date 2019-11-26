const Board = require('../models/Board');
const User = require('../models/User');
const mongoose = require('mongoose');
module.exports = {
  async create(req, res) {
    const board = new Board({
      title: req.body.title,
      users: req.user._id
    });
    try {
      const savedBoard = await board.save();
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { boards: savedBoard._id }
      });
      res.send(savedBoard);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async index(req, res) {
    const userId = req.user._id;
    try {
      const boards = await Board.find({ users: userId });
      res.send(boards);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async show(req, res) {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        const board = await Board.findById(id);
        if (!board) {
          return res.status(400).send({ error: "Board doesn't exist" });
        }
        res.send(board);
      } catch (error) {
        res.status(500).send({ error: 'Something went wrong.' });
      }
    } else {
      return res.status(400).send({ error: "Board ID isn't valid" });
    }
  },
  async destroy(req, res) {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        const board = await Board.findByIdAndDelete(id);
        if (!board) {
          return res.status(400).send({ error: "Board doesn't exist" });
        }
        res.send(board);
      } catch (error) {
        res.status(500).send({ error: 'Something went wrong.' });
      }
    } else {
      return res.status(400).send({ error: "Board ID isn't valid" });
    }
  },
  async update(req, res) {
    const title = req.body.title;
    const boardId = req.params.id;
    try {
      //Checks if the user is assigned to the board
      const oldBoard = await Board.findById(boardId);

      const assignedToBoard = oldBoard.users.includes(req.user._id);

      if (!assignedToBoard) {
        return res
          .status(400)
          .send({ error: 'User is not assigned to this board' });
      }

      oldBoard.title = title;

      const updatedBoard = await oldBoard.save();
      if (!updatedBoard) {
        return res.status(400).send({ error: 'No board with that id.' });
      }
      res.send(updatedBoard);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
};
