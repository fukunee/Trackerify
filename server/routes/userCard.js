const router = require('express').Router();
const verifyToken = require('../policies/verifyToken');
const UserCardController = require('../controllers/UserCardController');

router.post('/', verifyToken, UserCardController.create);
router.delete('/:userId&:cardId', verifyToken, UserCardController.destroy);

module.exports = router;
