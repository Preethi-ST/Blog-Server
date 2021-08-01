const User = require('../../models/User')

module.exports = SingleUser = async (req,res,next) => {
    try{
        const user = await User.findById(req.params.id,'username email createdAt updatedAt')
        if(!user){
            return res.status(404).json({
                success : false,
                error : 'No such user exists'
            })
        }
        return res.status(200).json({
            success : true,
            user
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error : error
        })
    }
}