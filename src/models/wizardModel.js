const pool = require("../config/database");

const getWizards = async () => {
    /*
    wizards.* → Pega todas as colunas da tabela wizards.

    houses.name AS house_name → Seleciona o nome da casa e dá a ela um alias house_name.

    FROM wizards → Define a tabela principal (wizards), onde buscamos os dados dos bruxos.

    LEFT JOIN houses ON wizards.house_id = houses.id → Junta a tabela houses com wizards, 
    ligando house_id da tabela wizards ao id da tabela houses. 
    O LEFT JOIN garante que mesmo bruxos sem casa cadastrada ainda apareçam na consulta.

    */
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
