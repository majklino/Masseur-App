const express = require('express');
const config = require('config');

const sqlService = require('../../model/master/sql-service')
const logger = require('../../helpers/logger');
const hash = require('../../helpers/hash-generator');

const router = express.Router();


router.post('/register-new', async function(req, res) {
    const requestData = req.body;
    let firstname = requestData.firstname;
    let lastname = requestData.lastname;
    let email = requestData.email;
    let phone_number = requestData.phone_number;
    let password = requestData.password;

    logger.info('Request: Register new customer');

    password = config.get('salt') + password;

    let hashPassword = hash(password);

    await sqlService.connect();
    await sqlService.addNewCustomer(firstname, lastname, email, phone_number, hashPassword);
    await sqlService.disconnect();

    logger.info('Customer successfuly registered');

    res.json({success: {status: 'CUSTOMER_REGISTERED'}});
    
});

router.post('/login', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});

router.post('/update-user-data', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});

router.post('/delete-user', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});

router.get('/get-user-data', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});

router.get('/get-history', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});
module.exports = router;
