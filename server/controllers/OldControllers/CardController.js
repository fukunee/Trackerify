const Card = require('../../models/OldModels/Card');
const List = require('../../models/OldModels/List');

// module.exports = {
//   async create(req, res) {
//     const listId = req.body.listId;

//     const parentList = await List.findById(listId);
//     if (!parentList) {
//       return res.status(400).send('A list needs a parent list');
//     }
//     const card = new Card({
//       title: req.body.title,
//       description: req.body.description,
//       list: listId
//     });

//     try {
//       const savedCard = await card.save();
//       const cardId = savedCard._id;
//       parentList.cards.addToSet(cardId);
//       await parentList.save();
//       res.send(savedCard.toJSON());
//     } catch (error) {
//       res.status(403).send({ error });
//     }
//   },
//   async show(req, res) {},
//   async destroy(req, res) {
//     const cardId = req.params.id;
//     const card = await Card.findById(cardId);
//     const listId = card.list;
//     if (!card) {
//       return res.status(403).send({ error: "Card doesn't exist" });
//     }
//     try {
//       const result = await Card.findByIdAndDelete(cardId);
//       const list = await List.findById(listId);
//       list.cards.pull(cardId);
//       await list.save();
//       if (result) {
//         return res.send(result);
//       } else {
//         return res.status(403).send({ error: 'Something went wrong' });
//       }
//     } catch (error) {
//       res.send({ error: error });
//     }
//   },
//   async put(req, res) {
//     const { description, cardId } = req.body;
//     try {
//       const response = await Card.findByIdAndUpdate(
//         { _id: cardId },
//         {
//           description
//         },
//         { new: true }
//       );
//       console.log(response);
//       res.send(response);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };
