require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require("path")
//CUSTOM IMPORTS
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const app = express()
const PORT = process.env.PORT || 4000;

/* Connect with DB and start the server */
const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify: false /* https://mongoosejs.com/docs/deprecations.html#findandmodify */
        })
        console.log('MongoDB Connected...!')
        // start listening to port
        app.listen(PORT, () => console.log(`Server is up and running on the port ${PORT}`))
    }catch(error){
        console.log(`unable to connect with database \n ${error}`)
        startServer();
    }
}
startServer();

//Middleware
app.use(cors({
    origin : true,
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/Images")));
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)


app.get('/', (req,res) => {
    res.send('MERN Blogs Server is up and running')
})

const storage = multer.diskStorage({
    //cb - callback - will take care of any errors
    destination : (req,file,cb) => {
        cb(null,'Images')
    },filename : (req,file,cb) => {
        cb(null,'hello.jpg')
    }
})
const upload = multer({storage})

app.post('/api/upload',upload.single('file'),(req,res) => {
    return res.status(200).json({
        success : true,
        message : 'File has been updated'
    })
})