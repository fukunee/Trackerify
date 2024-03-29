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
      const user = await User.findById(req.user._id);
      user.boards.addToSet(savedBoard);
      await user.save();
      res.send(savedBoard.toJSON());
    } catch (error) {
      console.log(error);

      res.status(400).send({ error });
    }
  },
  async show(req, res) {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        const board = await Board.findById(id)
          .populate({
            path: 'users',
            select: ['_id', 'name', 'profileImage']
          })
          .populate({
            path: 'lists',
            // model: 'List',
            populate: {
              path: 'cards',
              // model: 'Card'
              populate: [
                {
                  path: 'comments',
                  populate: {
                    path: 'user'
                  }
                },
                {
                  path: 'assignedUsers',
                  select: ['_id', 'name', 'profileImage']
                }
              ]
            }
          });
        if (!board) {
          return res.status(400).send({ error: "Board doesn't exist" });
        }
        if (board.users.find(user => user._id === req.user._id)) {
          return res
            .status(401)
            .send({ error: 'User not member of the board' });
        }

        res.send(board);
      } catch (error) {
        res.send(error);
      }
    } else {
      return res.status(400).send({ error: "ID isn't valid" });
    }
  },
  async update(req, res) {
    const { boardId, title } = req.body;
    //TODO check if user is part of board
    try {
      const board = await Board.findByIdAndUpdate(
        boardId,
        { $set: { title } },
        { useFindAndModify: false, new: true }
      );
      res.send(board);
    } catch (error) {
      res.status(400).send({ error });
    }
  },
  async destroy(req, res) {
    //TODO Check if the person deleting the board is part of it
    const id = req.params.id;
    const board = await Board.findById(id);
    if (!board) {
      return res.status(400).send({ error: "Board doesn't exist" });
    }
    try {
      const result = await Board.findByIdAndDelete(id);

      if (result) {
        return res.send(`Board: "${result.title}" deleted`);
      } else {
        return res.status(400).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
