const express = require('express');
const config = require('config');

const sqlService = require('../../model/master/sql-service')
const logger = require('../../helpers/logger');
const hash = require('../../helpers/hash-generator');
const generateUUID = require('../../helpers/uuid-generator');

const router = express.Router();

router.post('/register-new', async function(req, res) {
    const requestData = req.body;
    let firstname = requestData.firstname;
    let lastname = requestData.lastname;
    let username = requestData.username;
    let password = requestData.password;
    // let requestAuthorId = requestData.requestAuthorId;
    // let requestUuid = requestData.requestUuid;


    logger.info('Request: Register new masseur');

    //TODO check uuid credentials

    password = config.get('salt') + password;
    let hashPassword = hash(password);

    await sqlService.connect();
    await sqlService.addNewMasseur(firstname, lastname, username, hashPassword);
    await sqlService.disconnect();

    logger.info('Masseur successfuly registered');

    res.json({success: {status: 'MASSEUR_REGISTERED'}});
    
});

router.post('/login', async function(req, res) {
    const requestData = req.body;
    let username = requestData.username;
    let password = requestData.password;

    logger.info('Request: Log in masseur');

    password = config.get('salt') + password;
    let hashPassword = hash(password);

    let uuid = generateUUID();

    await sqlService.connect();
    let result = await sqlService.loginMasseur(username, hashPassword, uuid);
    await sqlService.disconnect();

    if(result){
        logger.info('Masseur successfuly logged in');
        res.json({success: {status: 'MASSEUR_LOGGED_IN'}});
    }
    else{
        logger.info('Masseur was NOT logged in - incorrect username and/or password');
        res.json({error: {status: 'INVALID_CREDENTIALS'}});
    }
    
});

module.exports = router;
