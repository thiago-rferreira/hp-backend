const pool = require("../config/database");

const getHouses = async () => {
    const result = await pool.query("SELECT * FROM houses");
    return result.rows;
};

const getHouseById = async (id) => {
    const result = await pool.query("SELECT * FROM houses WHERE id = $1", [id]);
    return result.rows[0];
};

module.exports = { getHouses, getHouseById };
