const db = require('../db/db');

const registerFormVerify = (form)=>{
    const username = form.username.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if(username.length < 3 || username.length > 20){
        return false;
    }
    if(password != confirmPassword){
        return false;
    }
    if(password.length < 3 || password.length > 20){
        return false;
    }

    return true;    
}

const submitRegister = (form)=>{
    const result = db.query('INSERT INTO users (username, password) VALUES ($1,$2)',[form.username,form.password]);
    return true;
}

const getUserById = (id)=>{
    const result = db.query('select * from users where id = $1',[id]);
    return result;
}

const getUserByUsername = (username)=>{
    const result = db.query('select * from users where username = $1',[username]);
    return result;
}

const loginVerify = async (form) =>{
    const {username, password} = form;
    const result = await db.query('select * from users where username = $1 and password = $2',[username,password]);
    return result;
}

module.exports = {
    registerFormVerify, submitRegister,getUserById,getUserByUsername,loginVerify
}

