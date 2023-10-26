class SqlService{
    constructor() {
        let Handler = require('../db/sql-handler');
        this.handler = new Handler();
    }

    async connect(){
        await this.handler.connect();
    }

    async disconnect(){
        await this.handler.disconnect();
    }

    async addNewMasseur(firstname, lastname, username, hash){
        let query = `
        INSERT INTO masseurs (firstname, lastname, username, hash, created_at)
        VALUES (?, ?, ?, ?, NOW())`;
        let params = [firstname, lastname, username, hash];
        await this.handler.executeQuery(query, params);
    }

    async addNewCustomer(firstname, lastname, email, phone_number, hash){
        let query = `
        INSERT INTO customers (firstname, lastname, email, phone_number, hash, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())`;
        let params = [firstname, lastname, email, phone_number, hash];
        await this.handler.executeQuery(query, params);
    }

    async addNewMassageType(name, description, duration, duration_overall){
        let query = `
        INSERT INTO massage_types (name, description, duration, duration_overall)
        VALUES (?, ?, ?, ?)`;
        let params = [name, description, duration, duration_overall];
        await this.handler.executeQuery(query, params);
    }

    async loginMasseur(username, hash, uuid){
        let query = `
        UPDATE masseurs SET online_uuid = ? WHERE username = ? AND hash = ?`;
        let params = [uuid, username, hash];
        let results = await this.handler.executeQuery(query, params);
        return results.affectedRows >= 1
    }

    async test(){
        let query = `
        SHOW CREATE TABLE masseurs`;
        let results = await this.handler.executeQuery(query, [])
        return results;
    }

    //let query = ``;
}

module.exports = new SqlService();