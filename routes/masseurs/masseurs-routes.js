const express = require('express');
const config = require('config');

const sqlService = require('../../model/master/sql-service')
const logger = require('../../helpers/logger');
const hash = require('../../helpers/hash-generator');
const generateUUID = require('../../helpers/uuid-generator');

const router = express.Router();

router.post('/register-new', async function (req, res) {
    const requestData = req.body;
    let firstname = requestData.firstname;
    let lastname = requestData.lastname;
    let username = requestData.username;
    let password = requestData.password;
    let adminId = requestData.adminId;
    let adminUuid = requestData.adminUuid;

    logger.info('Request: Register new masseur');

    await sqlService.connect();
    let authorized = await sqlService.isMasseurAdminAndAuthorized(adminId, adminUuid);

    if (authorized) {
        password = config.get('salt') + password;
        let hashPassword = hash(password);

        await sqlService.addNewMasseur(firstname, lastname, username, hashPassword);

        logger.info('Masseur successfuly registered');

        res.json({ success: { status: 'MASSEUR_REGISTERED' } });
    }
    else{
        logger.info('Masseur NOT registered - admin not authorized');
        res.json({ error: { status: 'NOT_AUTHORIZED' } });
    }

    await sqlService.disconnect();

});

router.post('/login', async function (req, res) {
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

    if (result == false) {
        logger.info('Masseur was NOT logged in - incorrect username and/or password');
        res.json({ error: { status: 'INVALID_CREDENTIALS' } });
    }
    else {
        logger.info('Masseur successfuly logged in');
        res.json({ success: { status: 'MASSEUR_LOGGED_IN', data: result } });
    }

});

router.post('/logout', async function (req, res) {
    const requestData = req.body;
    let id = requestData.id;
    let uuid = requestData.uuid;

    logger.info('Request: Log out masseur');

    await sqlService.connect();
    let result = await sqlService.logoutMasseur(id, uuid);
    await sqlService.disconnect();

    if (result == false) {
        logger.info('Masseur was NOT logged out - incorrect username and/or password');
        res.json({ error: { status: 'INVALID_CREDENTIALS' } });
    }
    else {
        logger.info('Masseur successfuly logged out');
        res.json({ success: { status: 'MASSEUR_LOGGED_OUT' } });
    }

});

router.post('/manage-skills', async function (req, res) {
    const requestData = req.body;
    let masseurId = requestData.masseurId;
    let skillIds = requestData.skillIds;
    let adminId = requestData.adminId;
    let adminUuid = requestData.adminUuid;

    logger.info('Request: Managing skills of masseur');

    await sqlService.connect();
    let authorized = await sqlService.isMasseurAdminAndAuthorized(adminId, adminUuid);

    if (authorized) {

        await sqlService.manageSkills(masseurId, skillIds);

        logger.info('Masseur skills successfuly managed');

        res.json({ success: { status: 'MASSEUR_SKILLS_MANAGED' } });
    }
    else{
        logger.info('Masseur skills NOT managed - admin not authorized');
        res.json({ error: { status: 'NOT_AUTHORIZED' } });
    }

    await sqlService.disconnect();
});

router.post('/manage-work-hours', async function (req, res) {
    const requestData = req.body;
    let masseurId = requestData.masseurId;
    let workHours = requestData.workHours;
    let adminId = requestData.adminId;
    let adminUuid = requestData.adminUuid;

    logger.info('Request: Managing work hours of masseur');

    await sqlService.connect();
    let authorized = await sqlService.isMasseurAdminAndAuthorized(adminId, adminUuid);

    if (authorized) {

        await sqlService.manageWorkHours(masseurId, workHours);

        logger.info('Masseur work hours successfuly managed');

        res.json({ success: { status: 'MASSEUR_WORK_HOURS_MANAGED' } });
    }
    else{
        logger.info('Masseur work hours NOT managed - admin not authorized');
        res.json({ error: { status: 'NOT_AUTHORIZED' } });
    }

    await sqlService.disconnect();
});

router.get('/get-user-data', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});

router.post('/delete-masseur', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});

router.post('/update-user-data', async function(req, res) {
    res.json({response: 'TODO not yet implemented!'});
});

module.exports = router;
