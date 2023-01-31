const gameTypeModel = require('../../../models/gameType.model');
const { options } = require('./router');

module.exports = {
    async insertGameType(req, res, next) {
        let gameTypeName = req.body.gameTypeName;
        let recordExists = await gameTypeModel.findOne(
            {gameTypeName: gameTypeName}
        );
        if(recordExists != undefined) {res.status(409).send();}
        else{
            let data = new gameTypeModel({
                gameTypeName: req.body.gameTypeName,
                gameTypeDescription: req.body.gameTypeDescription,
            });
            let dataToSave = data.save();
            res.status(200).json(dataToSave).send();
        }
    },
    async updateGameType(req, res, next) {
        console.log(req.body);
        try {
            const updatedRecord = await gameTypeModel.findOneAndUpdate(
                { _id: req.body._id },
                {   
                    gameTypeName: req.body.gameTypeName,
                    gameTypeDescription: req.body.gameTypeDescription
                },
                {
                    new: true
                }
            );
            console.log(updatedRecord);
            res.status(200).send(updatedRecord);
        } catch (error){
            console.error(error);
            res.status(400).send(error);
        }
    },
    async getGameTypes(req, res, next) {
        const items = await gameTypeModel.find();
        res.status(200).send(items);
    }
}