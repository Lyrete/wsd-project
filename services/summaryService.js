import { executeQuery } from "../database/database.js";

//function to combine the two queries we make and make them into an object
const combineSummary = (morning, evening) => {    
    
    //converting to numbers gets rid of weird string parses and makes values 0 if they don't exist
    return {
        sleep: Number(morning[0].sleep),
        quality: Number(morning[0].quality),
        study: Number(evening[0].study),
        sport: Number(evening[0].sport),
        morningMood: Number(morning[0].mood),
        eveningMood: Number(evening[0].mood)
    };

}

const getWeeklySummary = async(weekInput, user_id) => {
    const week = weekInput.substr(6);

    //two queries as longer try never worked even though it worked by directly doing in DB
    const morning = await executeQuery("SELECT AVG(duration) as sleep, AVG(quality) as quality, AVG(mood) as mood from morningreports WHERE user_id = $2 AND EXTRACT(WEEK FROM date) = $1;", week, user_id)
    const evening = await executeQuery("SELECT AVG(studyduration) as study, AVG(sportduration) as sport, AVG(mood) as mood from eveningreports WHERE user_id = $2 AND EXTRACT(WEEK FROM date) = $1;", week, user_id)

    const result = combineSummary(morning, evening);
    return result;
}

const getMonthlySummary = async(monthInput, user_id) => {
    const month = monthInput.substr(5);
    const morning = await executeQuery("SELECT AVG(duration) as sleep, AVG(quality) as quality, AVG(mood) as mood from morningreports WHERE user_id = $2 AND EXTRACT(MONTH FROM date) = $1;", month, user_id)
    const evening = await executeQuery("SELECT AVG(studyduration) as study, AVG(sportduration) as sport, AVG(mood) as mood from eveningreports WHERE user_id = $2 AND EXTRACT(MONTH FROM date) = $1;", month, user_id)
    
    const result = combineSummary(morning, evening);
    return result;
}

export { getWeeklySummary, getMonthlySummary };