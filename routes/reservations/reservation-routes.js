const express = require('express');

const logger = require('../../helpers/logger');

const router = express.Router();


router.get('/check-availability', async function(req, res) {
    const requestData = req.body;
    let username = requestData.username;
    logger.debug(username);

    res.json({response: 'yo!'});
    
});

router.post('/make-new-reservation', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
    
});

router.post('/make-new-reservation-unregistered', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
    
});

router.post('/cancel-reservation', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
    
});

router.post('/cancel-reservation-unregistered', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
    
});

router.get('/get-reservations-for-day', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
    
});

module.exports = router;
