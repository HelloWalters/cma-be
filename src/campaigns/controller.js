const campaignModel = require('../../models/campaign.model');

module.exports = {

    async insertCampaign(req, res, next) {
        let data = new campaignModel({
            campaignName: req.body.name,
            campaignDescription: req.body.description,
            isActive: true,
            campaignTheme: req.body.theme,
            campaignTags: req.body.tags,
        });
        try {
            const dataToSave = data.save();
            res.status(200).json(dataToSave);
            return;
        }
        catch (error) {
            res.status(400).json({message: error.message})
            return;
        }
    },

    async getCampaigns(req, res, next) {
        const items = await campaignModel.find();
        res.status(200).send(items);
    }
    //Get all Method
    // app.get(
    //     '/getAllCampaigns',
    //     (req, res) => {
    //         await campaignModel.find();
    //         res.send();
    //     }
    // ),
}