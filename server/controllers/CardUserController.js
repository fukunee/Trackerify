const mongoose = require('mongoose');
module.exports = {
  async create(req, res) {
    const { listId, cardId, userId } = req.body;
    try {
      req.board.lists
        .id(listId)
        .cards.id(cardId)
        .assignedUsers.addToSet(userId);
      updatedBoard = await req.board.save();
      res.send(updatedBoard);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async destroy(req, res) {
    const { listId, cardId, userId } = req.params;
    const board = req.board;

    try {
      board.lists
        .id(listId)
        .cards.id(cardId)
        .assignedUsers.pull({ _id: userId });
      const response = await board.save();
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
};
