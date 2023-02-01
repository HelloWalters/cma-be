const router = require('express').Router();
const {
    insertGameRace,
    updateGameRace,
    getGameRaces
} = require('./controller');

router.route('/createGameRace').post(insertGameRace);
router.route('/updateGameRace').put(updateGameRace);
router.route('/getGameRaces').get(getGameRaces);

module.exports = router;