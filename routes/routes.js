let   express = require('express'),
      Model = require('../models/campaign'),
      bodyParser = require('body-parser'),
      jsonParser = bodyParser.json,
      urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = app => {
    app.post(
        '/createCampaign', express.urlencoded(), (req, res) => {
            res.send(req.user);
            let data = new Model({
                name: req.body.name,
                description: req.body.description,
                isActive: true,
                dmId: req.user.id,
            });
            try {
                const dataToSave = data.save();
                res.status(200).json(dataToSave)
                
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        }
    );
    //Get all Method
    app.get(
        '/getAllCampaigns',
        (req, res) => {
            res.status(200).json('Get All API')
        }
    );

    //Get by ID Method
    app.get(
        '/getOne/:id',
        (req, res) => {
            res.send('Get by ID API')
        }
    );

    //Update by ID Method
    app.patch(
        '/update/:id',
        (req, res) => {
            res.send('Update by ID API')
        }
    );

    //Delete by ID Method
    app.delete(
        '/delete/:id',
        (req, res) => {
            res.send('Delete by ID API')
        }
    );
}