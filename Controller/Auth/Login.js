const User = require('../../models/User')
const jwt = require('jsonwebtoken')

exports.Login = async (req,res,next) => {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({
            success : false,
            error : 'Please provide both Email and Password'
        })
    }

    /* check if the email exists in DB */

    const user = await User.findOne({email})

    if(!user){
        return res.status(401).json({
            success : false,
            error : 'Inavlid Credentials'
        })
    }else{
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            res.status(401).json({
                success : false,
                error : 'Inavlid Credentials'
            })
        }else{
            /* Generate Token */

            const token = await user.getToken();
            const {password, ...others} = user._doc
            res
            .cookie("token",token,{ 
                expires: new Date(new Date().getTime() + 24 * 3600 * 1000),  
                httpOnly : true,
                secure : true,
                sameSite : "none"  /********** Uncomment once backed completed *********/
            })
            .status(200)
            .json({
                success : true,
                message : "Login Success",
                userdetails : others,
                /*token  ************************************ Remove atlast ********************************/
            })
        }
    }
}

exports.isLoggedIn = async (req,res,next) => {
    try{
        const token = req.cookies.token;

        if(!token){
            console.log('No token')
            return res.json({success : false})
        }
        const verified = jwt.verify(token, process.env.Private_Route_SECRET);
        const user = await User.find({email : verified.email}, 'username email profilePic')
        return res.json({
            success :true,
            user
        })
    }
    catch(error){
        console.log(error)
        return res.json({success : false})
    }
}