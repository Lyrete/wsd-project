import { executeQuery } from "../../database/database.js";
import { registerUser} from "../../services/userService.js"

const showForm = async({render}) => {
  render('register.ejs', await getData());
}

const getData = async(request) => {
  const data = {
    pw: "",
    pw2: "",
    email: "",
    errors: [],
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.pw = params.get("pw");    
    data.pw2 = params.get("pw2");
    data.email = params.get("email");
  }

  return data;
}

const validate = async(data) => {
  const errors = [];
  if (!data.pw || data.pw.length < 4) {
    errors.push("The password should be at least 4 characters");
  }else if(data.pw !== data.pw2){
    errors.push("The passwords did not match.")
  }
  
  if (!data.email || !data.email.includes('@') || data.email.length < 6) {
    errors.push("Email should include @ and have at least 6 characters.");
  }else{
    const stored = await executeQuery("SELECT * FROM users WHERE email LIKE $1", data.email);
    if(stored.length > 0){
      errors.push('The email is already registered.');
    }
  }
  
  return errors;
};

const processForm = async({request, response, render}) => {
  const data = await getData(request);
  data.errors = await validate(data);

  if(data.errors.length === 0){
    registerUser(data.email, data.pw);
    response.redirect('/auth/login');
  }else{
    render('register.ejs', data)
  }
}
  
export { showForm, processForm };