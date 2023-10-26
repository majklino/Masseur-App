const express = require('express');

const logger = require('../../helpers/logger');
const hash = require('../../helpers/hash-generator');

const router = express.Router();


router.post('/add-new', async function(req, res) {
    const requestData = req.body;
    let firstname = requestData.firstname;
    let lastname = requestData.lastname;
    let username = requestData.username;
    let password = requestData.password;

    logger.info('Request: Create new masseur');
    logger.info('username: ' + username);
    logger.info('firstname: ' + firstname);
    logger.info('lastname: ' + lastname);

    let hashPswd = hash(password);

    res.json({response: 'yo!'});
    
});

module.exports = router;
