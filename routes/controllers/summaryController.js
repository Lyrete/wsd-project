import { getWeeklySummary, getMonthlySummary } from "../../services/summaryService.js";
import { helpers } from "../../deps.js";

// Source: https://weeknumber.net/how-to/javascript
// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
}

//bringing in whole context here as to use helpers
const showSummaryPage = async(context) => {
    const params = helpers.getQuery(context);
    //init data
    const data = {
        week: params.week,
        month: params.month,
        email: await(context.session.get('userEmail'))
    };

    //get logged id
    const user_id = await context.session.get('loggedUser');
    
    //check if week was defined or not and default it to current week
    if(!data.week){       
        const date = new Date();
        data.week = `${date.getFullYear()}-W${date.getWeek()}`;
    }

    //check if month was defined or default it to current month if not
    if(!data.month){    
        const date = new Date();    
        data.month = `${date.getFullYear()}-${date.getMonth() + 1}`;
    }

    data.weekResults = await getWeeklySummary(data.week, user_id);
    data.monthResults = await getMonthlySummary(data.month, user_id);
    

    context.render('summary.ejs', data);
}

export {showSummaryPage};