import "../config/config.js";
import { Pool } from "../deps.js";

const pool = new Pool({}, 5);

const executeQuery = async(query, ...params) => {
    const client = await pool.connect();
    try {
        const res = await client.query(query, ...params);
        return res.rowsOfObjects();
    } catch (e) {
        console.log(e);  
    } finally {
        client.release();
    }
    
    return null;
  };

export { executeQuery };