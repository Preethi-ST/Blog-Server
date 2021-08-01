const express = require('express');
const router = express.Router();
const isAuthorized = require('../middleware/isAuthorized')
const AllPost = require('../Controller/Posts/AllPosts')
const CreatePost = require('../Controller/Posts/CreatePost')
const SinglePost = require('../Controller/Posts/SinglePost')
const UpdatePost = require('../Controller/Posts/UpdatePost')
const DeletePost = require('../Controller/Posts/DeletePost')

router.delete('/remove/:id',isAuthorized,DeletePost)

router.post('/create',isAuthorized,CreatePost)

router.put('/update/:id',isAuthorized,UpdatePost)

router.get('/single/:id',SinglePost)

router.get('/allpost',AllPost)

module.exports = router