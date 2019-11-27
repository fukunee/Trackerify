module.exports = {
  async create(req, res) {
    const { listId, cardId } = req.body;
    const comment = {
      content: req.body.content,
      user: req.user._id
    };

    req.board.lists
      .id(listId)
      .cards.id(cardId)
      .comments.addToSet(comment);

    try {
      response = await req.board.save();
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  },
  async destroy(req, res) {
    const { listId, cardId, commentId } = req.params;
    console.log(commentId);

    req.board.lists
      .id(listId)
      .cards.id(cardId)
      .comments.pull({ _id: commentId });

    try {
      response = await req.board.save();
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong.' });
    }
  }
};
