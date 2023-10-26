function defineRoutes(app) {
    app.get('/', (req, res) => {
        res.send('hi :)');
    });

    app.use('/res', require('./reservations/reservation-routes'));
    app.use('/masseur', require('./masseurs/masseurs-routes'));
}

module.exports = defineRoutes;