const Board = require('../models/Board');
const mongoose = require('mongoose');

module.exports = {
  //Error handling done in middleware
  //Checks if the user is assigned to the board
  //req.board contains the board document.

  async create(req, res) {
    const { listId, title, description } = req.body;
    try {
      const card = {
        title,
        description
      };

      req.board.lists.id(listId).cards.addToSet(card);
      updatedBoard = await req.board.save();
      res.send(updatedBoard);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async update(req, res) {
    const { listId, title, description, cardId } = req.body;
    const board = req.board;
    //TODO Querying twice, not efficient
    try {
      // board.lists
      //   .id(listId)
      //   .cards.id(cardId)
      //   .set({ title, description });
      const response = await Board.findOneAndUpdate(
        {
          'lists.cards._id': cardId
        },
        {
          $set: {
            //Not sure what the [] after $ does
            'lists.$[].cards.$[element].title': title,
            'lists.$[].cards.$[element].description': description
          }
        },
        {
          arrayFilters: [{ 'element._id': cardId }],
          useFindAndModify: false,
          new: true
        }
      );
      // response = await board.save();
      res.send(response);
    } catch (error) {
      console.log(error);

      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async destroy(req, res) {
    const { listId, cardId } = req.params;
    const board = req.board;

    try {
      board.lists.id(listId).cards.pull({ _id: cardId });
      const response = await board.save();
      res.send(response);
    } catch (error) {
      console.log(error);

      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
};
