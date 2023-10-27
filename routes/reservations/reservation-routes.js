const express = require('express');

const logger = require('../../helpers/logger');

const router = express.Router();


router.post('/check-availability', async function(req, res) {
    const requestData = req.body;
    let username = requestData.username;
    logger.debug(username);

    res.json({response: 'yo!'});
    
});

router.post('/make-new-reservation', async function(req, res) {
    res.json({response: 'yo!'});
    
});

router.post('/make-new-reservation-unregistered', async function(req, res) {
    res.json({response: 'yo!'});
    
});

router.post('/cancel-reservation', async function(req, res) {
    res.json({response: 'yo!'});
    
});

router.post('/cancel-reservation-unregistered', async function(req, res) {
    res.json({response: 'yo!'});
    
});

router.post('/get-reservations-for-day', async function(req, res) {
    res.json({response: 'yo!'});
    
});

module.exports = router;
