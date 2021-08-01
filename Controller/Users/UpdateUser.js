const User = require('../../models/User')

module.exports = UpdateUser = async (req,res,next) => {
    if(req.body.userId === req.params.id){
        try {
            const updatedUser = await User.findOneAndUpdate(
              {_id : req.params.id},
              {
                $set: req.body,
              },
              { new: true }
            );
            console.log("updated")
            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }else {
        return res.status(401).json("You can update only your account!");
    }
}