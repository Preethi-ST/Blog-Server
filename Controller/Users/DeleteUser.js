const User = require('../../models/User')
const Post = require('../../models/Post')

module.exports = async (req,res,next) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            try{
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json({
                    success : true,
                    message : 'User deleted Successfully'
                });
            } catch (err) {
                return res.status(500).json({
                    success : false,
                    err
                });
            }
        }catch(error){
            return res.status(404).json({
                success : false,
                error : 'User not found'
            })
        }
    }else {
        return res.status(401).json({
            success : false,
            error : "You can delete only your account!"
        });
    }
}