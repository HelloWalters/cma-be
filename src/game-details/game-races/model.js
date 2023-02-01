const mongoose = require('mongoose');

const gameRaceSchema = new mongoose.Schema({
    gameTypeId: {
        required: true,
        type: String
    },
    gameRaceName: {
        required: true,
        type: String
    },
    gameRaceDescription: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('gameRaces', gameRaceSchema);