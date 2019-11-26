const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const BoardUserController = require('../controllers/BoardUserController');

router.post('/', verifyToken, BoardUserController.create);
router.delete('/:boardId&:userId', verifyToken, BoardUserController.destroy);

module.exports = router;
