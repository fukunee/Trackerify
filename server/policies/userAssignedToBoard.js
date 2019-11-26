const Board = require('../models/Board');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  const boardId = req.body.boardId || req.params.boardId;
  console.log('BoardID (middleware) ' + boardId);

  if (mongoose.Types.ObjectId.isValid(boardId)) {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(403).send({ error: 'A list needs a board' });
    }
    const assignedToBoard = board.users.includes(req.user._id);
    if (!assignedToBoard) {
      res.status(401).send({ error: 'User is not assigned to the board' });
    } else {
      req.board = board;
      next();
    }
  } else {
    res.status(400).send({ error: 'Board id is not valid.' });
  }
};
