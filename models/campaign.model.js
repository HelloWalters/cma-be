const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    campaignName: {
        required: true,
        type: String
    },
    campaignDescription: {
        required: false,
        type: String
    },
    isActive: {
        required: true,
        type: Boolean
    },
    dmId: {
        required: false,
        type: String
    },
    campaignTheme: {
        required: false,
        type: Number
    },
    campaignTags: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('campaigns', campaignSchema);