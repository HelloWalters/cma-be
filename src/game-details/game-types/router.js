const router = require('express').Router();
const {
    insertGameType,
    updateGameType,
    getGameTypes
} = require('./controller');

router.route('/createGameType').post(insertGameType);
router.route('/updateGameType').put(updateGameType);
router.route('/getGameTypes').get(getGameTypes);

module.exports = router;