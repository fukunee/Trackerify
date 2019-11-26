const Board = require('../models/Board');
const mongoose = require('mongoose');

module.exports = {
  //Error handling done in middleware
  //Checks if the user is assigned to the board
  //req.board contains the board document.

  async create(req, res) {
    try {
      const list = {
        title: req.body.title,
        color: req.body.color
      };

      req.board.lists.addToSet(list);
      parentBoard = await req.board.save();
      res.send(parentBoard);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async update(req, res) {
    const { listId, title } = req.body;
    const board = req.board;

    try {
      const list = board.lists.id(listId);

      list.set({ title });

      response = await board.save();
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async destroy(req, res) {
    const { listId } = req.params;
    const board = req.board;

    try {
      board.lists.pull({ _id: listId });
      response = await board.save();
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
};
