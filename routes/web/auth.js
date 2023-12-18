var express = require('express');
var router = express.Router();
const userApi = require('../../api/user');
const checkAuthenticationMiddleware = require('../../middleware/CheckAuthenticationMiddleware');

router.get('/register', (req,res)=>{
    res.render('auth/Register');
})

router.post('/register', async (req,res)=>{
    const result = userApi.registerFormVerify(req.body);
    if(result){
        await userApi.submitRegister(req.body);
        // res.json({
        //     code: 200,
        //     msg: 'Register Successful',
        //     data: null
        // });
        res.status(200).redirect('/');
    }else{
        // res.json({
        //     code: 204,
        //     msg: 'Register Failed',
        //     data: null
        // });
        res.status(204).redirect('/');
    }
})

router.get('/login', (req,res)=>{
    res.render('auth/Login');
})

router.post('/login', async (req,res)=>{
    const result = await userApi.loginVerify(req.body);
    //登入失败
    if(!result[0]){
        res.status(204).redirect('/');
        return;
    }

    //登入成功后写入session
    const user = result[0];
    req.session.username = user.username;
    req.session.uid = user.id;

    res.status(200).redirect('/');
})

router.post('/logout' ,(req,res)=>{
    //delete session
    req.session.destroy(()=>{
        res.render('Success', {msg: 'Logout Successful', url: '/login'})
    });
})


module.exports = router;