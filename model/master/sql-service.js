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

        if(results.affectedRows < 1){
            return false;
        }

        query = `
        SELECT id, firstname, lastname, online_uuid FROM masseurs 
        WHERE username = ? AND hash = ? AND online_uuid = ?`;
        params = [username, hash, uuid];
        results = await this.handler.executeQuery(query, params);
        return results
    }

    async manageSkills(masseurId, skillIds){
        let query = `
        DELETE FROM skills WHERE masseur_id = ?`;
        let params = [masseurId];
        await this.handler.executeQuery(query, params);

        for (let i = 0; i < skillIds.length; i++) {
            let skillId = skillIds[i];
            query = `
            INSERT INTO skills (masseur_id, massage_type_id) VALUES 
            (?, ?)`;
            params = [masseurId, skillId];
            await this.handler.executeQuery(query, params);
        }
    }

    async manageWorkHours(masseurId, workHours){
        let query = `
        DELETE FROM work_hours WHERE masseur_id = ?`;
        let params = [masseurId];
        await this.handler.executeQuery(query, params);

        for (let i = 0; i < workHours.length; i++) {
            let workHour = workHours[i];
            query = `
            INSERT INTO work_hours (masseur_id, day, time_from, time_to) VALUES 
            (?, ?, ?, ?)`;
            params = [masseurId, workHour['day'], workHour['timeFrom'], workHour['timeTo']];
            await this.handler.executeQuery(query, params);
        }
    }

    async isMasseurAdminAndAuthorized(id, uuid){
        let query = `
        SELECT id FROM masseurs WHERE id = ? AND online_uuid = ? AND is_admin = 1`;
        let params = [id, uuid];
        let results = await this.handler.executeQuery(query, params);
        return results.length > 0
    }

    //let query = ``;
}

module.exports = new SqlService();