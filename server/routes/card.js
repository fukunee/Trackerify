const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const userAssignedToBoard = require('../policies/userAssignedToBoard');
const CardController = require('../controllers/CardController');

router.post('/', verifyToken, userAssignedToBoard, CardController.create);
router.put('/', verifyToken, userAssignedToBoard, CardController.update);
router.delete(
  '/:boardId&:listId&:cardId',
  verifyToken,
  userAssignedToBoard,
  CardController.destroy
);

module.exports = router;
