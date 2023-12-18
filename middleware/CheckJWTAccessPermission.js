const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/config');

module.exports = (req,res,next)=>{
    const token = req.get('token');
    if(!token){
        res.json({
            code: '2004',
            msg: 'Request have no token',
            data: null
        })
    }
    jwt.verify(token, JWTSECRET, (err,data)=>{
        if(err){
            return res.json({
                code: '2004',
                msg: 'JWT Verify Failed',
                data: null,
            })
        }
        //if login successful
        req.user = data;
        next();
    })
}