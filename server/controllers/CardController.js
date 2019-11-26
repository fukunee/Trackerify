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

    try {
      const card = board.lists.id(listId).cards.id(cardId);

      card.set({ title, description });

      response = await board.save();
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async destroy(req, res) {
    const { listId, cardId } = req.params;
    const board = req.board;

    try {
      board.lists.id(listId).cards.pull({ _id: cardId });
      response = await board.save();
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
};

// module.exports = {
//   async create(req, res) {
//     const boardId = req.body.boardId;
//     const listId = req.body.listId;
//     const title = req.body.title;
//     const description = req.body.description;
//     const parentBoard = await Board.findById(boardId);
//     if (!parentBoard) {
//       return res.status(400).send('A list needs a parent board');
//     }
//     const parentList = await parentBoard.lists.id(listId);
//     console.log(parentList);

//     if (!parentList) {
//       return res.status(400).send('A list needs a parent list');
//     }
//     const card = {
//       title,
//       description
//     };

//     try {
//       await parentList.cards.addToSet(card);
//       const response = await parentBoard.save();
//       res.send(response.toJSON());
//     } catch (error) {
//       res.status(403).send({ error });
//     }
//   }
// };
