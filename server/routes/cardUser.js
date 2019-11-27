const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const userAssignedToBoard = require('../policies/userAssignedToBoard');
const CardUserController = require('../controllers/CardUserController');

router.post('/', verifyToken, userAssignedToBoard, CardUserController.create);
router.delete(
  '/:boardId&:listId&:cardId&:userId',
  verifyToken,
  userAssignedToBoard,
  CardUserController.destroy
);

module.exports = router;
