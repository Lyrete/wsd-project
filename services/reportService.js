import { executeQuery } from "../database/database.js";

const addMorningReport = async(data) => {
    if(await morningExists()){
        await executeQuery("INSERT INTO morningreports (date, duration, quality, mood, user_id) VALUES ($1,$2,$3,$4,$5);", data.date, data.duration, data.quality, data.mood, data.user_id);
    } else {
        await executeQuery("UPDATE morningreports SET duration = $1, quality = $2, mood = $3 WHERE user_id = $4 AND date = $5;", data.duration, data.quality, data.mood, data.user_id, data.date);
    }
}

const addEveningReport = async(data) => {
    //check if report for day already existed and just update it if did
    if(await eveningExists()){
        await executeQuery("INSERT INTO eveningreports (date, sportDuration, studyDuration, eatingquality, mood, user_id) VALUES ($1,$2,$3,$4,$5, $6);", data.date, data.sportDuration, data.studyDuration, data.quality, data.mood, data.user_id);
    }else{
        await executeQuery("UPDATE eveningreports SET sportDuration = $1, studyDuration = $2, eatingquality = $3, mood = $4 WHERE user_id = $5 AND date = $6;", data.sportDuration, data.studyDuration, data.quality, data.mood, data.user_id, data.date);
    }
    
}

const morningExists = async(date) => {
    const result = await executeQuery("SELECT * FROM morningreports WHERE date = $1;", date);
    
    return (result.length != 0);
}

const eveningExists = async(date) => {
    const result = await executeQuery("SELECT * FROM eveningreports WHERE date = $1;", date);
    
    return (result.length != 0);
}

export { addMorningReport, addEveningReport };