import { executeQuery } from "../database/database.js";

const addMorningReport = async(data) => {
    await executeQuery("INSERT INTO morningreports (date, duration, quality, mood, user_id) VALUES ($1,$2,$3,$4,$5);", data.date, data.duration, data.quality, data.mood, data.user_id);
}

const addEveningReport = async(data) => {
    await executeQuery("INSERT INTO eveningreports (date, sportDuration, studyDuration, quality, mood, user_id) VALUES ($1,$2,$3,$4,$5, $6);", data.date, data.sportDuration, data.studyDuration, data.quality, data.mood, data.user_id);
}

export { addMorningReport, addEveningReport };