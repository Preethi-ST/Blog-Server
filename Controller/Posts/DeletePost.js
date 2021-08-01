const Post = require('../../models/Post')

module.exports = DeletePost = async (req,res,next) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username) {
            try{
                await post.delete();
                return res.status(200).json({
                    success : true,
                    message : "Post has been deleted"
                })
            }catch(error){
                return res.status(401).json({
                    success : false,
                    error : 'You can delete only your post!'
                })
            }
        }
    }catch(error){
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}