import { getLastWeek, getDay } from "../../services/summaryService.js";

const getSummary = async({response}) => {
    const result = await getLastWeek();
    response.body = result;
}

const getSummaryOfDay = async({params, response}) => {
    const date = `${params.year}-${params.month}-${params.day}`;
    const result = await getDay(date);
    response.body = result;
}

export { getSummary, getSummaryOfDay }