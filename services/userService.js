import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js"

//validation has been done elsewhere, this just enters user into db
const registerUser = async(email, pw) => {
    const hash = await bcrypt.hash(pw);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2)", email, hash);
    return;
}

const authUser = async(email, pw, {session}) => {
    const res = await executeQuery("SELECT * FROM users WHERE email LIKE $1", email);
    if(res.length === 0){
        return false;
    }

    const user = res[0];

    const hash = user.password;

    const validPw = await bcrypt.compare(pw, hash);
    if(!validPw){
        return false;
    }

    //set user details into session so other functions can check for auth
    await session.set('loggedUser', user.id);
    await session.set('userEmail', user.email);
    return true;
}

//Function to return whole user object if we happen to need it
const getLoggedInUser = async({session}) => {
    const user = await session.get('loggedUser');
    if(!user){
        return null;
    }else{
        const res = await executeQuery("SELECT * FROM users WHERE id LIKE $1", user);
        return res[0];
    }
}

export { registerUser, authUser, getLoggedInUser };