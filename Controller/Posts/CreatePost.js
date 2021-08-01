const Post = require('../../models/Post')

module.exports = CreatePost = async (req,res,next) => {
    const newPost = new Post(req.body)
    if(!newPost.title || !newPost.description || !newPost.username || !newPost.categories){
        return res.status(401).json({
            success:false,
            error : "Please provide all required fields"
        })
    }
    try{
        const savedPost = await newPost.save();
        return res.status(200).json({
            success : true,
            message : 'Post created successfully',
            savedPost
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error
        })
    }
}