import { addMorningReport, addEveningReport } from "../../services/reportService.js"

const showForms = async({render, session}) => {
    render('report.ejs', {email: await session.get('userEmail')});
}

const validate = async(data) => {
    const errors = [];    
    //placeholder validatefunction, not sure it's going to be used
    return errors;
};

const getData = async(request) => {
    const data = {
      date: null,
      duration: null,
      quality: null,
      mood: null,
      sportDuration: null,
      studyDuration: null,
    };
  
    if (request) {
      const body = request.body();
      const params = await body.value;
      data.date = params.get("date");    
      data.quality = params.get("quality");
      data.duration = params.get("duration");
      data.sportDuration = params.get("sportDuration");
      data.studyDuration = params.get("studyDuration");
      data.mood = params.get("mood");
      data.errors = await validate(data);
    }
  
    return data;
}

//not validating data as the form should filter invalid information
const processReport = async({request, session ,response}) => {
    const data = await getData(request);

    //use the missing field compared to evening report to know which report got submitted
    if(!data.sportDuration){
        data.user_id = await session.get('loggedUser');
        await addMorningReport(data);
        response.redirect('/behavior/reporting#morning');
    }

    //likewise use the missing field
    if(!data.duration){
        data.user_id = await session.get('loggedUser');
        await addEveningReport(data);
        response.redirect('/behavior/reporting#evening');
    }

    
}

export { showForms, processReport };