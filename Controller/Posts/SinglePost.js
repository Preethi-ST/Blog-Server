const Post = require('../../models/Post')

module.exports = SinglePost = async (req,res,next) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success : false,
                error : 'No post exists'
            })
        }
        return res.status(200).json({
            success : true,
            post
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error
        })
    }
}