const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : [true, "UserName is mandatory"],
            unique : true,
            minlength : [5, "UserName must have atleast 5 characters"]
        },
        email : {
            type : String,
            required : [true,"Email is mandatory"],
            unique : [true,"This email was already taken. Try another"],
            match : [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide valid Email"
            ]
        },
        password : {
            type : String,
            required : [true,"Password is mandatory"],
            minlength : 6
        },
        profilePic: {
            type: String,
            default: "",
        },
        resetPasswordToken : String,
        resetPasswordExpire : Date,
        
    },
    { timestamps: true }
)

userSchema.pre('save', async function(next){

    if(!this.isModified('password')) next();

    /* Hash password */
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.pre('findOneAndUpdate', async function(next){
    if(!this._update.password) next();
    /* Hash password */
    const salt = await bcrypt.genSalt(10);
    this._update.password = await bcrypt.hash(this._update.password,salt);
    next();
})

/* 
    password - refers to the password in req.body
    this.password - refers to the password of the User in the database 
        - that we get it using findone in controller-auth.js
    matchPasswords - runs aganist the current User schema - so we can access using this.password
*/
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.getToken = async function(){
    return jwt.sign(
        {email : this.email},
        process.env.Private_Route_SECRET,
        {expiresIn : '1d'}
    )
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(50).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * (60*1000);
    return resetToken;
}

const User = mongoose.model('User',userSchema)
module.exports = User