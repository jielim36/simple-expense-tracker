const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const userApi = require('../../api/user');
const {JWTSECRET} = require('../../config/config');
const CheckJWTAccessPermission = require('../../middleware/CheckJWTAccessPermission');

router.post('/login', async (req,res)=>{
    const result = await userApi.loginVerify(req.body);
    //登入失败
    if(!result[0]){
        res.json({
            code: '2001',
            msg: 'Login Failed',
            data: null,
        })
        return;
    }

    //登入成功后写入jwt验证
    const user = result[0];
    // req.session.username = user.username;
    // req.session.uid = user.id;
    const token = jwt.sign({ 
        uid: user.id,
        username: user.username,
     },JWTSECRET,{
        expiresIn: 60 * 60 * 4, //expired date: 4 hours

     });

    res.json({
        code: '0000',
        msg: 'Login Successful',
        data: token,
    })
})

router.post('/logout',(req,res)=>{
    //delete session
    req.session.destroy(()=>{
        res.render('Success', {msg: 'Logout Successful', url: '/login'})
    });
})


module.exports = router;
