const gameTypeModel = require('./model');
const { options } = require('./router');

module.exports = {
    async insertGameType(req, res, next) {
        let gameTypeName = req.body.gameTypeName;
        let recordExists = await gameTypeModel.findOne(
            {gameTypeName: gameTypeName}
        );
        if(recordExists != undefined) {
            res.status(409).send();
            console.log('duplicate');
            console.log(recordExists);
            return;
        }
        else{
            let data = new gameTypeModel({
                gameTypeName: req.body.gameTypeName,
                gameTypeDescription: req.body.gameTypeDescription,
            });
            let dataToSave = data.save();
            res.status(200).json(dataToSave).send();
            return;
        }
    },
    async updateGameType(req, res, next) {
        console.log(req.body);
        try {
            let gameTypeName = req.body.gameTypeName;
            let recordExists = await gameTypeModel.findOne(
                {gameTypeName: gameTypeName}
            );
            if(recordExists != undefined) {
                res.status(409).send();
                console.log('duplicate');
                console.log(recordExists);
                return;
            }
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
            return;
        } catch (error){
            console.error(error);
            res.status(400).send(error);
            return;
        }
    },
    async getGameTypes(req, res, next) {
        const items = await gameTypeModel.find();
        res.status(200).send(items);
    }
}