import { getDay } from "../../services/summaryService.js";

const showIndex = async({render, session}) => {
    const data = {
        email: await session.get('userEmail')
    };

    //get the data for today and yesterday
    const date = new Date();
    data.today = await getDay(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    date.setDate(date.getDate() - 1);
    data.yesterday = await getDay(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    
    render('index.ejs', data);
}

export { showIndex };