const express = require('express');
const config = require('config');

const sqlService = require('../../model/master/sql-service')
const logger = require('../../helpers/logger');

const router = express.Router();


router.post('/add-new-type', async function(req, res) {
    const requestData = req.body;
    let name = requestData.name;
    let description = requestData.description;
    let duration = requestData.duration;
    let duration_overall = requestData.duration_overall;

    logger.info('Request: Add new massage type');

    await sqlService.connect();
    await sqlService.addNewMassageType(name, description, duration, duration_overall);
    await sqlService.disconnect();

    logger.info('New massage type successfuly added');

    res.json({success: {status: 'MASSAGE_TYPE_ADDED'}});
    
});

module.exports = router;
