import { authUser } from "../../services/userService.js"

const showLogin = ({render}) => {
    render('login.ejs', {errors: [], email: null});
}

const logout = async({session, response}) => {
    await session.set('loggedUser', false);
    await session.set('userEmail', null);
    response.redirect('/');
}

const getData = async(request) => {
    const data = {
      pw: "",
      email: "",
      errors: [],
    };
  
    if (request) {
      const body = request.body();
      const params = await body.value;
      data.pw = params.get("pw");
      data.email = params.get("email");
    }
  
    return data;
}

const processLogin = async({request, response, render, session}) => {
    const data = await getData(request);
    const login = await authUser(data.email, data.pw, {session});

    if(!login){
        data.errors.push("Invalid email or password");
        render('login.ejs', {errors: data.errors, email: null});
    }else{
        console.log(await session.get("loggedUser"))
        response.redirect('/behavior/reporting')
    }
}

export { showLogin, processLogin, logout }