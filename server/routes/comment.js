const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const userAssignedToBoard = require('../policies/userAssignedToBoard');
const CommentController = require('../controllers/CommentController');

router.post('/', verifyToken, userAssignedToBoard, CommentController.create);
router.delete(
  '/:boardId&:listId&:cardId&:commentId',
  verifyToken,
  userAssignedToBoard,
  CommentController.destroy
);

module.exports = router;
