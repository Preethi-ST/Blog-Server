const Post = require('../../models/Post')

exports.AllCategory = async (req,res,next) => {
    try{
        const result = await Post.find({},'categories')
        let category = []
        const categories = result.map(res => {
            category = [...category,...res.categories]
        })
        category = Array.from(new Set(category))
        res.status(200).json({
            success : true,
            category
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error : 'Something went wrong'
        })
    }
}