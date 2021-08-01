const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports = isAuthorized = async (req,res,next) => {
    try{
        const token = req.cookies.token;
        console.log('in authorization')
        console.log(token);
        if(!token){
            return res.status(401).json({
                success : false,
                error : "Not authorized for this route"
            })
        }

        const verified = jwt.verify(token, process.env.Private_Route_SECRET);
        req.user = verified.user;
        console.log(verified)
        next();
    }
    catch(error){
        return res.status(401).json({
            success : false,
            error : "Not authorized for this route"
        })
    }


}