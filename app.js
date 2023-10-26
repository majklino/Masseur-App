const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const logger = require('./helpers/logger');

const app = express();
const PORT = process.env.PORT || config.get('port');

//use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//define routes

//start the server
let server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});