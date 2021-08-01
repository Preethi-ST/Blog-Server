const Post = require('../../models/Post')

module.exports = UpdatePost = async (req,res,next) => {
    try{
        const post = await Post.findById(req.params.id)
        console.log(post)
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set : req.body,
                    },
                    {new : true}
                )
                return res.status(500).json({
                    success : true,
                    message : "Post updated Successfully",
                    updatedPost
                })
            }catch(error){
                return res.status(500).json({
                    success : false,
                    error : error.message
                })
            }
        }else{
            return res.status(500).json({
                success : false,
                error : error.message,
                error1 : 'You can update only your post'
            })
        }
    }catch(error){
        return res.status(500).json({
            success : false,
            error : error.message,
            error1 : error
        })
    }
}
