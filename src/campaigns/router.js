const router = require('express').Router();
const {
    insertCampaign,
    getCampaigns
} = require("./controller");

router.route("/createCampaign").post(insertCampaign);
router.route("/getCampaigns").get(getCampaigns);


module.exports = router;