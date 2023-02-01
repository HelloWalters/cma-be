const mongoose = require('mongoose');

const gameTypeSchema = new mongoose.Schema({
    gameTypeName: {
        required: true,
        type: String
    },
    gameTypeDescription: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('gameTypes', gameTypeSchema);