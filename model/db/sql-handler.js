const config = require('config');
const mysql = require('mysql');

class CoreSqlHandler {
    constructor() {
        this.host = config.get('sql.host');
        this.user = config.get('sql.user');
        this.password = config.get('sql.password');
        this.database = config.get('sql.database');
        this.connection = null;
        this.isConnected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection = mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database
            });

            this.connection.connect((err) => {
                if (err) {
                    reject('Unable to connect to database!');
                }
                else {
                    this.isConnected = true;
                    resolve(true);
                }
            });
        });
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.connection.end();
            this.isConnected = false;
            resolve(true);
        });
    }

    executeQuery(query, params) {
        if (params == null) {
            params = [];
        }
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                reject('No connection initialized!');
            }
            this.connection.query(query, params, function (error, results) {
                if (error) { reject(error) };
                resolve(results);
            });
        });
    }
}

module.exports = CoreSqlHandler;