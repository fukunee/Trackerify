const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const userAssignedToBoard = require('../policies/userAssignedToBoard');
const ListController = require('../controllers/ListController');

router.post('/', verifyToken, userAssignedToBoard, ListController.create);
router.put('/', verifyToken, userAssignedToBoard, ListController.update);
router.delete(
  '/:boardId&:listId',
  verifyToken,
  userAssignedToBoard,
  ListController.destroy
);

module.exports = router;
