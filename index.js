require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const cloudinary = require('cloudinary').v2;
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
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//Middleware
app.use(cors({
    origin : true,
    credentials : true
}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
/* app.use("/images", express.static(path.join(__dirname, "/Images"))); */
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.status(200).json({ image_url : uploadResponse.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:dev_setups')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});

app.get('/', (req,res) => {
    res.send('MERN Blogs Server is up and running')
})


/* const storage = multer.diskStorage({
    //cb - callback - will take care of any errors
    destination : (req,file,cb) => {
        cb(null,'Images')
    },filename : (req,file,cb) => {
        cb(null,req.body.name)
    }
})
const upload = multer({storage})

app.post('/api/upload',upload.single('file'),(req,res) => {
    return res.status(200).json({
        success : true,
        message : 'File has been updated'
    })
}) */