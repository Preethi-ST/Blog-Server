const Post = require('../../models/Post')

module.exports = AllPosts = async (req,res,next) => {
    const username = req.query.user;
    const category = req.query.category;
    console.log(username , category)
    try{
        let posts;
        if(username && category){
           posts = await Post.find({username,categories : category})
        }else if(category || username){
            posts = await Post.find({
                $or : [{username},{categories : category}]
            })
        }
        else{
            posts = await Post.find();
        }
        return res.status(200).json({
            success : true,
            posts
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}