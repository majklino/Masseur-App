function defineRoutes(app) {
    app.get('/', (req, res) => {
        res.send('hi :)');
    });

    app.use('/res', require('./reservations/reservation-routes'));
    app.use('/masseur', require('./masseurs/masseurs-routes'));
    app.use('/customer', require('./customers/customers-routes'));
    app.use('/massage', require('./massages/massages-routes'));
}

module.exports = defineRoutes;