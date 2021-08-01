const express = require('express');
const router = express.Router();

const AllPost = require('../Controller/Posts/AllPosts')
const CreatePost = require('../Controller/Posts/CreatePost')
const SinglePost = require('../Controller/Posts/SinglePost')
const UpdatePost = require('../Controller/Posts/UpdatePost')
const DeletePost = require('../Controller/Posts/DeletePost')

router.post('/create',CreatePost)

router.put('/update/:id',UpdatePost)

router.delete('/remove/:id',DeletePost)

router.get('/single/:id',SinglePost)

router.get('/allpost',AllPost)

module.exports = router