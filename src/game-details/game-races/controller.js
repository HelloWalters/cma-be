const gameRaceModel = require('./model');
const { options } = require('./router');

module.exports = {
    async insertGameRace(req, res, next) {
        let gameRaceName = req.body.gameRaceName;
        let gameTypeId = req.body.gameTypeId;
        let recordExists = await gameRaceModel.findOne(
            {
                gameTypeId: gameTypeId,
                gameRaceName: gameRaceName
            }
        );
        if(recordExists != undefined) {
            res.status(409).send();
            console.log('duplicate');
            console.log(recordExists);
            return;
        }
        else{
            let data = new gameRaceModel({
                gameTypeId: req.body.gameTypeId,
                gameRaceName: req.body.gameRaceName,
                gameRaceDescription: req.body.gameRaceDescription,
            });
            let dataToSave = data.save();
            res.status(200).json(dataToSave).send();
            return;
        }
    },
    async updateGameRace(req, res, next) {
        console.log(req.body);
        try {
            let recordExists = await gameRaceModel.findOne(
                {
                    gameTypeId: req.body.gameTypeId,
                    gameRaceName: req.body.gameRaceName
                }
            );
            if(recordExists != undefined) {
                res.status(409).send();
                console.log('duplicate');
                console.log(recordExists);
                return;
            }
            const updatedRecord = await gameRaceModel.findOneAndUpdate(
                { _id: req.body._id },
                {   
                    gameRaceName: req.body.gameRaceName,
                    gameRaceDescription: req.body.gameRaceDescription
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
    async getGameRaces(req, res, next) {
        const items = await gameRaceModel.find();
        res.status(200).send(items);
    }
}