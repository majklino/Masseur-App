const express = require('express');

const logger = require('../../helpers/logger');

const router = express.Router();


router.post('/check-availability', async function(req, res) {
    const requestData = req.body;
    let username = requestData.username;
    logger.debug(username);

    res.json({response: 'yo!'});
    
});

module.exports = router;
