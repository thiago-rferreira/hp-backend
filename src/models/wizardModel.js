const pool = require("../config/database");

const getWizards = async () => {
    const result = await pool.query(
        `SELECT wizards.*, houses.name AS house_name 
         FROM wizards 
         LEFT JOIN houses ON wizards.house_id = houses.id`
    );
    return result.rows;
};

const getWizardById = async (id) => {
    const result = await pool.query(
        `SELECT wizards.*, houses.name AS house_name 
         FROM wizards 
         LEFT JOIN houses ON wizards.house_id = houses.id 
         WHERE wizards.id = $1`, [id]
    );
    return result.rows[0];
};

const createWizard = async (name, house_id) => {
    const result = await pool.query(
        "INSERT INTO wizards (name, house_id) VALUES ($1, $2) RETURNING *",
        [name, house_id]
    );
    return result.rows[0];
};

module.exports = { getWizards, getWizardById, createWizard };
