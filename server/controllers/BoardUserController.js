const Board = require('../models/Board');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
  async create(req, res) {
    const { boardId, userId } = req.body;
    if (
      mongoose.Types.ObjectId.isValid(userId) &&
      mongoose.Types.ObjectId.isValid(boardId)
    ) {
      try {
        const user = await User.findById(userId);

        if (!user) {
          return res.status(400).send({ error: 'No user with that id.' });
        }
        const board = await Board.findByIdAndUpdate(
          boardId,
          { $addToSet: { users: userId } },
          { new: true, useFindAndModify: false }
        );
        if (!board) {
          return res.status(400).send({ error: 'No board with that id.' });
        }
        user.boards.addToSet(board._id);
        await user.save();
        res.send(board);
      } catch (error) {
        res.status(500).send({ error });
      }
    } else {
      res.status(400).send({ error: "User id OR board id isn't valid" });
    }
  },
  async destroy(req, res) {
    const { boardId, userId } = req.params;
    if (
      mongoose.Types.ObjectId.isValid(userId) &&
      mongoose.Types.ObjectId.isValid(boardId)
    ) {
      try {
        const user = await User.findById(userId);

        if (!user) {
          return res.status(400).send({ error: 'No user with that id.' });
        }
        const board = await Board.findByIdAndUpdate(
          boardId,
          { $pull: { users: userId } },
          { new: true, useFindAndModify: false }
        );
        if (!board) {
          return res.status(400).send({ error: 'No board with that id.' });
        }
        user.boards.pull(board._id);
        await user.save();
        res.send(board);
      } catch (error) {
        res.status(500).send({ error });
      }
    } else {
      res.status(400).send({ error: "User id OR board id isn't valid" });
    }
  }
};
