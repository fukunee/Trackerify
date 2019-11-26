const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const BoardController = require('../controllers/BoardController');

router.post('/', verifyToken, BoardController.create);
router.get('/', verifyToken, BoardController.index);
router.get('/:id', verifyToken, BoardController.show);
router.delete('/:id', verifyToken, BoardController.destroy);
router.put('/:id', verifyToken, BoardController.update);

module.exports = router;
