const User = require('../../models/User')
exports.Register = async (req,res,next) => {
    const {username,email,password} = req.body;
    try{
        if(!email || !password || !username){
            return res.status(400).json({
                success : false,
                error : "Please provide all the fields"
            })
        }
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success : false,
                error: 'This email was already taken. Try another'
            });
        }
        user = new User({username,email,password})
        user = await user.save();
        return res.status(200).json({
            success : true,
            message : "Registered Successfully",
            user /************************************* Remove atlast ********************************/
        })
    }catch(error){
        return res.status(500).send({
            success : false,
            error: error.message
        })
    }
}